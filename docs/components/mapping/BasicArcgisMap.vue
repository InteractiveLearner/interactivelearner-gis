<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  await import("@arcgis/map-components/dist/components/arcgis-map");
  await import("@arcgis/map-components/dist/components/arcgis-search");
  await import("@arcgis/map-components/dist/components/arcgis-legend");
});
</script>

<template>
  <arcgis-map
    item-id="11e173a4e2f040ae80d39e44ee29467a"
    style="height: 500px; width: 100%;"
  >
    <arcgis-search position="top-right" />
    <arcgis-legend position="bottom-left" />
  </arcgis-map>
</template>