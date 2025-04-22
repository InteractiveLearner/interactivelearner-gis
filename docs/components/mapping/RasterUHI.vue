<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import montrealUHI from "../../data/montreal-uhi/2020.json";

let Leaflet;

function styleVectorFeature(feature) {
  const tempClass = feature.properties.Temp_Class;
  let fillColor;

  switch (tempClass) {
    case 1:
      fillColor = "#1a9641"; // Îlot de fraîcheur (Cool island)
      break;
    case 2:
      fillColor = "#a6d96a"; // Température plus froide que la moyenne (Colder than average temperature)
      break;
    case 3:
      fillColor = "#ffffbf"; // Température plus proche de la moyenne (Closer to average temperature)
      break;
    case 4:
      fillColor = "#fdae61"; // Température plus chaude que la moyenne (Hotter than average temperature)
      break;
    case 5:
      fillColor = "#d7191c"; // Îlot de chaleur (Heat island)
      break;
    default:
      fillColor = "gray"; // Default color for undefined classes
  }

  return {
    fillColor,
    weight: 0, // No border
    color: "none", // No border color
    fillOpacity: 0.7,
  };
}

function createLegend(map) {
  const legend = Leaflet.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = Leaflet.DomUtil.create("div", "leaflet-legend");
    div.innerHTML = `
      <div class="legend-header">
        <button class="toggle-legend">Legend</button>
      </div>
      <div class="legend-content">
        <div class="h4-like">Temperature classes</div>
        ${[
          { label: "Cool island", color: "#1a9641" },
          { label: "Colder than average temperature", color: "#a6d96a" },
          { label: "Closer to average temperature", color: "#ffffbf" },
          { label: "Hotter than average temperature", color: "#fdae61" },
          { label: "Heat island", color: "#d7191c" },
        ]
          .map(
            (grade) => `
          <div>
            <i style="background: ${grade.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>
            <span>${grade.label}</span>
          </div>`
          )
          .join("")}
      </div>
    `;

    // Add event listener for toggling the legend
    div.querySelector(".toggle-legend").addEventListener("click", () => {
      const content = div.querySelector(".legend-content");
      content.style.display =
        content.style.display === "none" ? "block" : "none";
    });

    return div;
  };

  legend.addTo(map);
}

onMounted(async () => {
  Leaflet = await import("leaflet"); // window not defined error if not imported here
  const map = Leaflet.map("map", { zoomControl: false }).setView(
    [45.45, -73.63],
    13
  );

  const basemap = Leaflet.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  // Create a custom pane for the image overlay
  map.createPane("imagePane");
  map.getPane("imagePane").style.zIndex = 650; // Higher zIndex ensures it is above other layers

  const imageUrl =
    "../../data/montreal-uhi/thermographie-surface-2016-montreal-ouest-nuit.png";

  const imageBounds = [
    [45.446962230074824, -73.67502123460079],
    [45.46036894381611, -73.63257647690578],
  ];

  const img = L.imageOverlay(imageUrl, imageBounds, {
    pane: "imagePane",
    interactive: true,
  })
    .addTo(map)
    .bindPopup("Surface thermography of Montreal West @night");

  const uhi = L.geoJSON(montrealUHI, {
    style: (feature) => styleVectorFeature(feature),
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<div class="popup-content">
          <p>Temperature Class: ${feature.properties.Temp_Class}</p>
        </div>`
      );
    },
  }).addTo(map);

  createLegend(map);

  const baseLayers = {
    OpenStreetMap: basemap,
  };

  const overlays = {
    ["Surface thermography of montreal west @night"]: img,
    ["Urban heat island"]: uhi,
  };

  L.control.layers(baseLayers, overlays).addTo(map);
});
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

.leaflet-container {
  height: 50vh;
  width: 100%;
  z-index: 1;
}
</style>
