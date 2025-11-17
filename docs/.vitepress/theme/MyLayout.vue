<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress';
import { watch, onMounted } from 'vue';
import HomePageGlobe from '../../components/mapping/HomePageGlobe.vue'
import Authors from "../../components/ui/Authors.vue"
import Comments from '../../components/ui/Comments.vue'

const { isDark } = useData();

watch(isDark, (newVal) => {
  document.body.classList.toggle('calcite-mode-dark', newVal);
  document.body.classList.toggle('calcite-mode-light', !newVal);
});

onMounted(() => {
  document.body.classList.toggle('calcite-mode-dark', isDark.value);
  document.body.classList.toggle('calcite-mode-light', !isDark.value);
});
</script>

<template>
  <DefaultTheme.Layout class="custom-calcite-overrides">
    <template #home-hero-image>
      <HomePageGlobe />
    </template>
    <template #doc-footer-before>
      <Authors />
    </template>
    <template #doc-after>
      <Comments />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.image-bg {
  display: none !important;
}
</style>