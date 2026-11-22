/// <reference types="webmcp-types" />
import { nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import { quizzes, visualizations } from './registry';
import { createLearningTools } from './tools';

export function useWebMCP() {
  const route = useRoute();
  const { page } = useData();
  const lifetime = new AbortController();
  let navigation = new AbortController();
  watch(() => route.path, () => {
    navigation.abort(new DOMException('The learner opened another page.', 'AbortError'));
    navigation = new AbortController();
  }, { flush: 'sync' });

  const tools = createLearningTools({
    getPage: () => ({ path: route.path, url: location.href, markdownUrl: new URL('/' + page.value.relativePath, location.origin).href }),
    executionSignal: signal => AbortSignal.any([signal, lifetime.signal, navigation.signal]),
    visualizations, quizzes, afterUpdate: nextTick,
  });

  onMounted(async () => {
    if (!window.isSecureContext) return;
    try {
      const { installWebMCP } = await import('@w3c/webmcp-polyfill');
      if (lifetime.signal.aborted) return;
      installWebMCP();
      const context = document.modelContext;
      if (typeof context?.registerTool !== 'function') return;
      for (const tool of tools) {
        if (lifetime.signal.aborted) return;
        await context.registerTool(tool, { signal: lifetime.signal });
      }
    } catch (error) {
      const cancelled = lifetime.signal.aborted;
      lifetime.abort(); // Remove any registrations already made by this layout.
      navigation.abort();
      if (!cancelled) console.error('WebMCP registration failed', error);
    }
  });
  onBeforeUnmount(() => { lifetime.abort(); navigation.abort(); });
}
