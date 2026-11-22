/// <reference types="webmcp-types" />
import { validateInput, validateChanges, toolError, type Visualization } from './contracts.ts';

type Page = { path: string; url: string; markdownUrl: string };
type Host = {
  getPage: () => Page;
  executionSignal: (signal: AbortSignal) => AbortSignal;
  visualizations: Map<string, Visualization & { page: string }>;
  quizzes: Map<string, { page: string; read: () => unknown }>;
  afterUpdate: () => Promise<unknown>;
  fetchMarkdown?: typeof fetch;
};
const emptySchema = { type: 'object', properties: {}, additionalProperties: false };

export function createLearningTools(host: Host): WebMCP.ModelContextTool[] {
  const onPage = <T extends { page: string }>(entries: Iterable<T>) => [...entries].filter(entry => entry.page === host.getPage().path);
  return [
    {
      name: 'get_page_markdown', title: 'Read this lesson',
      description: 'Read the current GIS lesson, source links, practice questions and visualization descriptions as Markdown. Quiz answer keys are omitted.',
      inputSchema: emptySchema, annotations: { readOnlyHint: true },
      async execute(input, options) {
        const signal = host.executionSignal(options.signal);
        try {
          validateInput(input, []);
          signal.throwIfAborted();
          const page = host.getPage();
          const response = await (host.fetchMarkdown || fetch)(page.markdownUrl, { signal });
          signal.throwIfAborted();
          if (!response.ok) return { error: 'Markdown could not be loaded. Try again or open another lesson.', status: response.status };
          if (!response.headers.get('Content-Type')?.toLowerCase().includes('text/markdown')) return { error: 'This page did not return Markdown. Open a lesson with a Markdown version.' };
          const markdown = await response.text();
          signal.throwIfAborted();
          return { url: page.url, markdownUrl: page.markdownUrl, markdown };
        } catch (error) {
          if (signal.aborted) throw error;
          return toolError(error);
        }
      },
    },
    {
      name: 'list_visualizations', title: 'Explore lesson visuals',
      description: 'Read the teaching visualizations, their readiness, current settings and allowed controls on this page. Use before demonstrating a scenario.',
      inputSchema: emptySchema, annotations: { readOnlyHint: true },
      execute(input) {
        try {
          validateInput(input, []);
          return { page: host.getPage().path, visualizations: onPage(host.visualizations.values()).map(v => ({ id: v.id, description: v.description, ready: v.ready(), controls: v.controls, state: v.read() })) };
        } catch (error) { return toolError(error); }
      },
    },
    {
      name: 'update_visualization', title: 'Adjust a lesson visual',
      description: 'Demonstrate a teaching scenario using the controls discovered on this page. Changes appear in the learner’s visualization. Cannot answer quizzes.',
      inputSchema: {
        type: 'object', properties: {
          id: { type: 'string', minLength: 1, description: 'Visualization identifier returned by list_visualizations.' },
          changes: { type: 'object', minProperties: 1, description: 'Control names and desired values from the visualization’s controls. Omitted controls keep their current values.' },
        }, required: ['id', 'changes'], additionalProperties: false,
      },
      annotations: { readOnlyHint: false, consequentialHint: false },
      async execute(input, options) {
        const signal = host.executionSignal(options.signal);
        try {
          signal.throwIfAborted();
          validateInput(input, ['id', 'changes'], ['id', 'changes']);
          if (typeof input.id !== 'string' || !input.id) throw new Error('A visualization ID is required.');
          const viz = host.visualizations.get(input.id);
          if (!viz || viz.page !== host.getPage().path) return { error: 'Visualization is not on this page.', availableIds: onPage(host.visualizations.values()).map(v => v.id) };
          if (!viz.ready()) return { error: 'Visualization is still loading. Check readiness and try again.' };
          validateChanges(input.changes, viz.controls);
          await viz.update(input.changes);
          signal.throwIfAborted();
          await host.afterUpdate();
          signal.throwIfAborted();
          return { id: viz.id, state: viz.read() };
        } catch (error) {
          if (signal.aborted) throw error;
          return toolError(error);
        }
      },
    },
    {
      name: 'read_quiz_results', title: 'Review quiz feedback',
      description: 'Read attempted quiz answers and feedback on this page to guide teaching. Unanswered questions omit answer keys. Cannot submit, change or reset answers. Results live only in the current page session.',
      inputSchema: emptySchema, annotations: { readOnlyHint: true },
      execute(input) {
        try {
          validateInput(input, []);
          return { page: host.getPage().path, quizzes: onPage(host.quizzes.values()).map(q => q.read()) };
        } catch (error) { return toolError(error); }
      },
    },
  ];
}
