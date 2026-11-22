<template>
  <div id="map"></div>
</template>

<script setup>
import { useLeafletVisualization } from "../../.vitepress/ai/leaflet";
import { onBeforeUnmount } from "vue";
import { onMounted } from 'vue';

let Leaflet;

let agentMap = null;
onMounted(async () => {
  Leaflet = await import('leaflet'); // window not defined error if not imported here
  const map = Leaflet.map('map', { zoomControl: false }).setView([48.44, -123.36], 12);

  agentMap = map;
  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});

useLeafletVisualization('reference-map', 'Explore a reference map.', () => agentMap);
onBeforeUnmount(() => { agentMap?.remove(); });
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

.leaflet-container {
  height: 40vh;
  width: 100%;
  z-index: 1;
}
</style>