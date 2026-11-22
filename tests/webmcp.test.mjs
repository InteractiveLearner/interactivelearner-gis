import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningTools } from '../docs/.vitepress/ai/tools.ts';

function fixture(overrides = {}) {
  const scope = new AbortController();
  const state = { zoom: 3 };
  const current = { path: '/lessons/scale', url: 'https://example.test/lessons/scale', markdownUrl: 'https://example.test/lessons/scale.md' };
  const visualizations = new Map([
    ['scale-map', { id: 'scale-map', page: current.path, description: 'Map scale', controls: { zoom: { type: 'integer', minimum: 2, maximum: 18 } }, ready: () => true, read: () => ({ ...state }), update: changes => Object.assign(state, changes) }],
    ['other-map', { id: 'other-map', page: '/another-page', ready: () => true, read: () => ({}), update: () => assert.fail('Off-page visualization must not be changed') }],
  ]);
  const quizzes = new Map([
    ['quiz', { page: current.path, read: () => ({ answered: 0, questions: [{ status: 'unanswered' }] }) }],
    ['old-quiz', { page: '/another-page', read: () => assert.fail('Off-page quiz must not be read') }],
  ]);
  const host = {
    getPage: () => ({ ...current }), visualizations, quizzes,
    executionSignal: signal => AbortSignal.any([signal, scope.signal]),
    afterUpdate: async () => {},
    fetchMarkdown: async () => new Response('# Scale', { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } }),
    ...overrides,
  };
  const tools = createLearningTools(host);
  const call = (name, input = {}, signal = new AbortController().signal) => tools.find(t => t.name === name).execute(input, { signal });
  return { host, tools, call, scope, state, current };
}

test('browser tools expose only the four intended learning actions', () => {
  const { tools } = fixture();
  assert.deepEqual(tools.map(t => t.name), ['get_page_markdown', 'list_visualizations', 'update_visualization', 'read_quiz_results']);
  for (const tool of tools) assert.equal(tool.annotations.readOnlyHint, tool.name !== 'update_visualization');
  const update = tools.find(t => t.name === 'update_visualization');
  for (const value of Object.values(update.inputSchema.properties)) assert.ok(value.description);
});

test('Markdown tool returns lesson text with its original page identity', async () => {
  const { call } = fixture();
  assert.deepEqual(await call('get_page_markdown'), { url: 'https://example.test/lessons/scale', markdownUrl: 'https://example.test/lessons/scale.md', markdown: '# Scale' });
});

test('Markdown failures return recoverable diagnostics instead of opaque execution failures', async () => {
  const badStatus = fixture({ fetchMarkdown: async () => new Response('Unavailable', { status: 503 }) });
  assert.equal((await badStatus.call('get_page_markdown')).status, 503);
  const wrongType = fixture({ fetchMarkdown: async () => new Response('<h1>HTML</h1>', { headers: { 'Content-Type': 'text/html' } }) });
  assert.match((await wrongType.call('get_page_markdown')).error, /did not return Markdown/);
  const offline = fixture({ fetchMarkdown: async () => { throw new Error('Network offline'); } });
  assert.equal((await offline.call('get_page_markdown')).error, 'Network offline');
});

test('agent cancellation aborts an in-flight Markdown fetch', async () => {
  let observedSignal;
  const { call } = fixture({ fetchMarkdown: (_, { signal }) => new Promise((_, reject) => {
    observedSignal = signal;
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  }) });
  const execution = new AbortController();
  const result = call('get_page_markdown', {}, execution.signal);
  execution.abort(new DOMException('Cancelled by learner', 'AbortError'));
  await assert.rejects(result, { name: 'AbortError' });
  assert.equal(observedSignal.aborted, true);
});

test('navigation cancels stale Markdown results even when a transport ignores cancellation', async () => {
  let resolveFetch;
  const { call, current, scope } = fixture({ fetchMarkdown: () => new Promise(resolve => { resolveFetch = resolve; }) });
  const result = call('get_page_markdown');
  current.path = '/another-page';
  scope.abort(new DOMException('Opened another page', 'AbortError'));
  resolveFetch(new Response('# Old lesson', { headers: { 'Content-Type': 'text/markdown' } }));
  await assert.rejects(result, { name: 'AbortError' });
});

test('visualization tools read current-page state and use the visible component adapter', async () => {
  const { call, state } = fixture();
  assert.deepEqual(call('list_visualizations').visualizations.map(v => v.id), ['scale-map']);
  assert.deepEqual(await call('update_visualization', { id: 'scale-map', changes: { zoom: 15 } }), { id: 'scale-map', state: { zoom: 15 } });
  assert.equal(state.zoom, 15);
  const other = await call('update_visualization', { id: 'other-map', changes: { zoom: 5 } });
  assert.deepEqual(other.availableIds, ['scale-map']);
});

test('tool callbacks enforce their schema before changing state', async () => {
  const { call, state } = fixture();
  for (const input of [null, [], {}, { id: 'scale-map' }, { id: 'scale-map', changes: {} },
    { id: 'scale-map', changes: { zoom: 99 } }, { id: 'scale-map', changes: { zoom: 2.5 } },
    { id: 'scale-map', changes: { zoom: '5' } }, { id: 'scale-map', changes: { answer: 1 } },
    { id: 'scale-map', changes: { zoom: 5 }, extra: true },
    { id: 'scale-map', changes: JSON.parse('{"__proto__":{}}') },
  ]) {
    assert.ok((await call('update_visualization', input)).error, JSON.stringify(input));
    assert.equal(state.zoom, 3);
  }
  assert.ok((await call('get_page_markdown', { url: 'https://example.com' })).error);
  assert.ok(call('read_quiz_results', { submitAnswer: true }).error);
});

test('unready visuals are rejected and quiz reads stay scoped to the current page', async () => {
  const { host, call, state } = fixture();
  host.visualizations.get('scale-map').ready = () => false;
  assert.match((await call('update_visualization', { id: 'scale-map', changes: { zoom: 5 } })).error, /still loading/);
  assert.equal(state.zoom, 3);
  assert.deepEqual(call('read_quiz_results'), { page: '/lessons/scale', quizzes: [{ answered: 0, questions: [{ status: 'unanswered' }] }] });
});
