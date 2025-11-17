<script setup>
import { ref, computed, onMounted } from "vue";
import { useFloating, offset, autoUpdate } from "@floating-ui/vue";

const props = defineProps({
  url: { type: String, required: true },
});

// Basic in-memory cache to avoid refetching the same page.
const cache = (globalThis.__WIKI_SUMMARY_CACHE__ ||= new Map());

const loading = ref(true);
const error = ref(null);
const extract = ref("");
const isTouch = ref(false);

// Floating UI setup
const reference = ref(null);
const floating = ref(null);
const isOpen = ref(false);

const { floatingStyles } = useFloating(reference, floating, {
  open: isOpen,
  placement: "top",
  whileElementsMounted: autoUpdate,
  middleware: [offset(5)],
});

// Derive the page title from the provided URL.
function getTitleFromUrl(u) {
  try {
    // Allow either a full URL or a raw title.
    if (!/^https?:\/\//i.test(u)) {
      return u.trim().replace(/\s+/g, "_");
    }
    const parsed = new URL(u);
    if (parsed.hostname !== "en.wikipedia.org") return null;
    const parts = parsed.pathname.split("/");
    const last = parts.pop() || parts.pop(); // handle possible trailing slash
    return decodeURIComponent(last);
  } catch (_) {
    return null;
  }
}

const title = getTitleFromUrl(props.url);

const firstSentence = computed(() => {
  if (!extract.value) return "";
  // Try to capture first sentence.
  const match = extract.value.match(/^[^.!?]*[.!?]/);
  return (match ? match[0] : extract.value).trim();
});

async function fetchSummary() {
  if (!title) {
    error.value = "Invalid Wikipedia URL";
    loading.value = false;
    return;
  }
  if (cache.has(title)) {
    const cached = cache.get(title);
    extract.value = cached.extract;
    loading.value = false;
    return;
  }
  try {
    const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      title
    )}`;
    const res = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    extract.value = data.extract || "";
    cache.set(title, { extract: extract.value });
  } catch (e) {
    error.value = "Failed to load summary";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  fetchSummary();
});

function openExternal() {
  if (title) {
    const url = /^https?:\/\//.test(props.url)
      ? props.url
      : `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function handleInteraction(event) {
  // For touch-enabled devices
  if (isTouch.value) {
    // If the tooltip is already open, navigate.
    if (isOpen.value) {
      openExternal();
    } else {
      // Otherwise, prevent navigation and show the tooltip.
      event.preventDefault();
      isOpen.value = true;
    }
  } else {
    // For non-touch devices, navigate on click.
    openExternal();
  }
}

// Tooltip content computed reactively.
const tooltipContent = computed(() => {
  if (loading.value) return "Loading…";
  if (error.value) return error.value;
  return firstSentence.value || "No summary available";
});
</script>

<template>
  <a
    ref="reference"
    class="wiki-tooltip"
    role="link"
    tabindex="0"
    @click="handleInteraction"
    @keydown.enter.prevent="openExternal"
    @mouseenter="!isTouch && (isOpen = true)"
    @mouseleave="!isTouch && (isOpen = false)"
    @focus="isOpen = true"
    @blur="isOpen = false"
    @touchstart="isTouch = true"
  >
    <slot />
  </a>
  <div v-if="isOpen" ref="floating" :style="floatingStyles" class="tooltip-body">
    {{ tooltipContent }}
  </div>
</template>

<style scoped>
.wiki-tooltip {
  cursor: pointer;
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  display: inline;
  vertical-align: baseline;
}

html.dark .tooltip-body {
  background: #222;
  color: white;
}

.tooltip-body {
  background: #edebebff;
  color: black;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  max-width: 320px;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  z-index: 10000;
  pointer-events: none;
}
</style>
