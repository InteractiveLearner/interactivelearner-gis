<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';

let Leaflet;

onMounted(async () => {
  Leaflet = await import('leaflet'); // window not defined error if not imported here
  const map = Leaflet.map('map').setView([48.46, -123.36], 12);

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  Leaflet.control.scale({ position: 'bottomleft' }).addTo(map);
});
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

.leaflet-container {
  height: 40vh;
  width: 100%;
  z-index: 1;
}

/* Leaflet buttons use anchor tags for some reason and vitepress underlines them */
:deep(.leaflet-control-zoom-in),
:deep(.leaflet-control-zoom-out) {
  text-decoration: none;
  color: black;
}
</style>