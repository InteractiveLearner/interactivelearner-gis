<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  url: { type: String, required: true },
});

// Basic in-memory cache to avoid refetching the same page.
const cache = (globalThis.__WIKI_SUMMARY_CACHE__ ||= new Map());

const loading = ref(true);
const error = ref(null);
const extract = ref("");

// Unique id for calcite-tooltip reference element.
const referenceId = `wiki-ref-${Math.random().toString(36).slice(2, 9)}`;

function getTitleFromUrl(u) {
  try {
    const parsed = new URL(u);
    if (parsed.hostname !== "en.wikipedia.org") return null;
    const parts = parsed.pathname.split("/");
    const last = parts.pop() || parts.pop();
    return decodeURIComponent(last);
  } catch (_) {
    return u.trim().replace(/\s+/g, "_");
  }
}

const title = getTitleFromUrl(props.url);

const firstSentence = computed(() => {
  if (!extract.value) return "";
  const match = extract.value.match(/^[^.!?]*[.!?]/);
  return (match ? match[0] : extract.value).trim();
});

async function fetchSummary() {
  loading.value = true;
  if (!title) {
    error.value = "Invalid Wikipedia URL";
    loading.value = false;
    return;
  }

  if (cache.has(title)) {
    extract.value = cache.get(title).extract;
    loading.value = false;
    return;
  }

  try {
    const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    extract.value = data.extract || "";
    cache.set(title, { extract: extract.value });
  } catch (_) {
    error.value = "Failed to load summary";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await Promise.all([
    import("@esri/calcite-components/dist/components/calcite-tooltip"),
  ]);
  fetchSummary();
});

function openExternal() {
  if (!title) return;
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const tooltipContent = computed(() => {
  if (loading.value) return "Loading…";
  if (error.value) return error.value;
  return firstSentence.value || "No summary available";
});
</script>

<template>
  <a
    :id="referenceId"
    class="wiki-tooltip"
    role="link"
    tabindex="0"
    href="javascript:void(0)"
    @click.prevent="openExternal"
    @keydown.enter.prevent="openExternal"
  >
    <slot />
  </a>
  <calcite-tooltip :reference-element="referenceId" placement="top">
    <span>{{ tooltipContent }}</span>
  </calcite-tooltip>
</template>

<style scoped>
.wiki-tooltip {
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  cursor: pointer;
}

.wiki-tooltip:hover,
.wiki-tooltip:focus,
.wiki-tooltip:active {
  text-decoration-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
