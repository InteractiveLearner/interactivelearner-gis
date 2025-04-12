<template>
    <div id="map"></div>
  </template>

  <!-- #region setup -->
  <script setup>
  import { onMounted } from 'vue';
  let Leaflet;
  
  onMounted(async () => {
    // Import dynamically to avoid window not defined error in SSR
    Leaflet = await import('leaflet'); 
  
    if (typeof window !== 'undefined') {
      const map = Leaflet.map('map').setView([48.43, -123.36], 14);
  
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      Leaflet.marker([48.43, -123.36])
        .addTo(map)
        .bindPopup('Find our cafe here!')
        .openPopup();
    }
  });
  </script>
  <!-- #endregion setup -->
  
  <style scoped>
  @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; /* Explicitly import Leaflet CSS */

  .leaflet-container {
    height: 225px;
    width: 100%;
    z-index: 1; 
  }
  
  /* Address VitePress link styling */
  :deep(.leaflet-control-zoom-in),
  :deep(.leaflet-control-zoom-out) {
    text-decoration: none;
    color: black;
  }
  </style>