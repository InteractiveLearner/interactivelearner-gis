<template>
  <span
    class="wiki-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="wiki-link"
      :aria-describedby="tooltipId"
      >{{ label }}</a
    >
    <transition name="fade">
      <div v-if="visible" class="wiki-tooltip-content" role="tooltip" :id="tooltipId">
        <p v-if="error" class="error">{{ error }}</p>
        <p v-else-if="loading" class="loading">Loading…</p>
        <p v-else>{{ sentence }}</p>
      </div>
    </transition>
  </span>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/**
 * Props:
 *  - url: Full Wikipedia article URL OR page title (e.g. "Open_source").
 *  - label: Text to display for link (defaults to derived title).
 */
const props = defineProps({
  url: { type: String, required: true },
  label: { type: String, default: "" },
});

const visible = ref(false);
const loading = ref(false);
const error = ref("");
const sentence = ref("");
const tooltipId = `wiki-tt-${Math.random().toString(36).slice(2)}`;

// Normalize: if user passed a full URL extract title segment
const pageTitle = computed(() => {
  try {
    if (/^https?:\/\//.test(props.url)) {
      const u = new URL(props.url);
      const parts = u.pathname.split("/");
      return decodeURIComponent(parts.pop() || "");
    }
    return props.url; // assume already title
  } catch {
    return props.url;
  }
});

const label = computed(() => props.label || pageTitle.value.replace(/_/g, " "));

let fetched = false;
let controller;

function show() {
  visible.value = true;
  if (!fetched) fetchSummary();
}
function hide() {
  visible.value = false;
}

async function fetchSummary() {
  loading.value = true;
  error.value = "";
  controller = new AbortController();
  const title = pageTitle.value;
  // Wikipedia REST summary API
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title
  )}`;
  try {
    const res = await fetch(apiUrl, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const extract = data.extract || "";
    // Extract first sentence heuristically (keep trailing period if present)
    const match = extract.match(/^[^.!?]*[.!?]/);
    sentence.value = match
      ? match[0]
      : extract.split(/\.(\s|$)/)[0] + (extract.includes(".") ? "." : "");
    fetched = true;
  } catch (e) {
    if (e.name !== "AbortError") error.value = "Failed to load summary.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  // prefetch on mount could be enabled if desired; keeping lazy for performance
});
</script>

<style scoped>
.wiki-tooltip {
  position: relative;
  display: inline-block;
}
.wiki-link {
  text-decoration: underline dotted;
  cursor: help;
}
.wiki-tooltip-content {
  position: absolute;
  z-index: 20;
  top: 100%;
  left: 0;
  min-width: 220px;
  max-width: 320px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 0.875rem;
  line-height: 1.2;
}
.loading {
  opacity: 0.7;
  font-style: italic;
}
.error {
  color: #c22;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (prefers-color-scheme: dark) {
  .wiki-tooltip-content {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
}
</style>
