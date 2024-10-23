<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress';
import { watch, onMounted } from 'vue';

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
  <DefaultTheme.Layout />
</template>
