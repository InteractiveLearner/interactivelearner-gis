<script setup>
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';

const { title, isDark } = useData();
const commentContainer = ref(null);

const loadGiscus = () => {
  console.log(isDark)
  if (commentContainer.value && !commentContainer.value.querySelector('script[src*="giscus.app"]')) {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'InteractiveLearner/interactivelearner-gis');
    script.setAttribute('data-repo-id', 'R_kgDOG2FdWA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOG2FdWM4COsQy');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    commentContainer.value.appendChild(script);
  }
};

onMounted(() => {
  loadGiscus();
});

// Watch for route changes to reload Giscus
watch(
  [() => title.value, () => isDark.value],
  () => {
    // Remove existing Giscus iframe to avoid duplicates
    const iframe = commentContainer.value?.querySelector('iframe.giscus-frame');
    if (iframe) {
      commentContainer.value.removeChild(iframe);
    }
    // Re-load Giscus after a short delay to ensure the DOM is updated
    setTimeout(loadGiscus, 50);
  },
  { immediate: false }
);
</script>

<template>
  <div ref="commentContainer" class="giscus"></div>
</template>

<style>
.giscus {
  margin-top: 2rem;
}
</style>