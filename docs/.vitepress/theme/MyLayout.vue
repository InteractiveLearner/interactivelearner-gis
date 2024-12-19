<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress';
import { watch, onMounted } from 'vue';
import HomePageGlobe from '../../components/mapping/HomePageGlobe.vue'

const { isDark, frontmatter } = useData();

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
  <DefaultTheme.Layout>
    <template #home-hero-image>
        <HomePageGlobe />
    </template>
  </DefaultTheme.Layout>
</template>

