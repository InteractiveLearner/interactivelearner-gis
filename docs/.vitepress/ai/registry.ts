import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vitepress';

import type { Visualization } from './contracts';
export { validateChanges, type Control } from './contracts';

export const visualizations = new Map<string, Visualization & { page: string }>();
export const quizzes = new Map<string, { page: string; read: () => unknown }>();

export function useVisualization(adapter: Visualization) {
  const route = useRoute();
  const page = route.path;
  const entry = { ...adapter, page };
  onMounted(() => visualizations.set(adapter.id, entry));
  onBeforeUnmount(() => { if (visualizations.get(adapter.id) === entry) visualizations.delete(adapter.id); });
}

export function useQuizResults(id: string, read: () => unknown) {
  const page = useRoute().path;
  const entry = { page, read };
  onMounted(() => quizzes.set(id, entry));
  onBeforeUnmount(() => { if (quizzes.get(id) === entry) quizzes.delete(id); });
}
