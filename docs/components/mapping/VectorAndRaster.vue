<!-- Inspired by https://leafletjs.com/examples/choropleth/ -->
<template>
  <div id="app">
    <div class="map-container">
      <div class="map-section">
        <div class="map-header">
          <div class="h2-like">1. Vector</div>
          <div class="map-controls">
            <calcite-select
              :value="vectorStyleType"
              @calciteSelectChange="updateVectorStyle"
            >
              <calcite-option value="population">Population</calcite-option>
              <calcite-option value="area">Area</calcite-option>
              <calcite-option value="density">Density</calcite-option>
            </calcite-select>
          </div>
        </div>
        <div id="vector-map" class="map-element"></div>
      </div>
      <div class="map-section">
        <div class="map-header">
          <div class="h2-like">2. Raster</div>
        </div>
        <div id="raster-map" class="map-element"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, toRaw } from "vue";
import statesJSON from "../../data/us-states.json";
let L;

// Style functions for vector features
const getColorByPopulation = (population) => {
  return population > 10000000
    ? "#800026"
    : population > 5000000
    ? "#BD0026"
    : population > 2000000
    ? "#E31A1C"
    : population > 1000000
    ? "#FC4E2A"
    : population > 500000
    ? "#FD8D3C"
    : population > 200000
    ? "#FEB24C"
    : population > 100000
    ? "#FED976"
    : "#FFEDA0";
};

const getColorByArea = (area) => {
  return area > 500000
    ? "#0A3161"
    : area > 250000
    ? "#0A549F"
    : area > 150000
    ? "#0A75DC"
    : area > 75000
    ? "#0A84FF"
    : area > 50000
    ? "#45A0FF"
    : area > 25000
    ? "#7FBCFF"
    : area > 10000
    ? "#B9D8FF"
    : "#E5F1FF";
};

const getColorByDensity = (density) => {
  return density > 1000
    ? "#006837"
    : density > 500
    ? "#1A9850"
    : density > 200
    ? "#66BD63"
    : density > 100
    ? "#A6D96A"
    : density > 50
    ? "#D9EF8B"
    : density > 20
    ? "#FFFFBF"
    : density > 10
    ? "#FEE08B"
    : "#FDAE61";
};

const styleVectorFeature = (feature, styleType = "population") => {
  const population = feature.properties.population;
  const area = feature.properties.area_sqkm;
  const density = feature.properties.density;

  let fillColor;
  switch (styleType) {
    case "area":
      fillColor = getColorByArea(area);
      break;
    case "density":
      fillColor = getColorByDensity(density);
      break;
    case "population":
    default:
      fillColor = getColorByPopulation(population);
      break;
  }

  return {
    weight: 1,
    opacity: 0.8,
    color: "#666",
    dashArray: "3",
    fillOpacity: 0.65,
    fillColor: fillColor,
  };
};

// Raster layer providers
const baseMaps = {
  streets: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    name: "Streets",
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    name: "Terrain",
  },
};

const defaultMapConfig = {
  center: [37.7749, -122.4194],
  zoom: 4,
  minZoom: 2,
  maxZoom: 18,
  zoomControl: false,
};

const vectorMap = ref(null);
const rasterMap = ref(null);
const vectorGeoJsonLayer = ref(null);
const vectorStyleType = ref("population");
const rasterLayers = ref({});
const currentRasterLayer = ref(null);
const vectorLegend = ref(null);

const updateVectorStyle = (event) => {
  vectorStyleType.value = event.target.value;
};

const createLegend = (_, styleType = "population") => {
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "leaflet-legend");
    let grades, colors, labels;

    switch (styleType) {
      case "area":
        grades = [0, 10000, 25000, 50000, 75000, 150000, 250000, 500000];
        labels = [
          "< 10,000",
          "10,000-25,000",
          "25,000-50,000",
          "50,000-75,000",
          "75,000-150,000",
          "150,000-250,000",
          "250,000-500,000",
          "> 500,000",
        ];
        colors = grades.map((g) => getColorByArea(g + 1));
        div.innerHTML = '<div class="h4-like">Area (sq km)</div>';
        break;

      case "density":
        grades = [0, 10, 20, 50, 100, 200, 500, 1000];
        labels = [
          "< 10",
          "10-20",
          "20-50",
          "50-100",
          "100-200",
          "200-500",
          "500-1000",
          "> 1000",
        ];
        colors = grades.map((g) => getColorByDensity(g + 1));
        div.innerHTML = '<div class="h4-like">Population density</div>';
        break;

      case "population":
      default:
        grades = [
          0, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000,
        ];
        labels = [
          "< 100k",
          "100k-200k",
          "200k-500k",
          "500k-1M",
          "1M-2M",
          "2M-5M",
          "5M-10M",
          "> 10M",
        ];
        colors = grades.map((g) => getColorByPopulation(g + 1));
        div.innerHTML = '<div class="h4-like">Population</div>';
        break;
    }

    // Add toggle button and legend content
    div.innerHTML = `
      <div class="legend-header">
        <button class="toggle-legend">Legend</button>
      </div>
      <div class="legend-content">
        ${div.innerHTML}
        ${grades
          .map(
            (grade, i) => `
          <div>
            <i style="background: ${colors[i]}"></i>
            <span>${labels[i]}</span>
          </div>`
          )
          .join("")}
      </div>
    `;

    // Add event listener for toggling the legend
    div.querySelector(".toggle-legend").addEventListener("click", () => {
      const content = div.querySelector(".legend-content");
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    return div;
  };

  return legend;
};

const initVectorMap = () => {
  vectorMap.value = L.map("vector-map", {
    ...defaultMapConfig,
  });

  L.tileLayer(baseMaps.streets.url, {
    attribution: baseMaps.streets.attribution,
  }).addTo(toRaw(vectorMap.value));

  addGeoJSONLayer();
  updateVectorLegend();
};

const updateVectorLegend = () => {
  if (vectorLegend.value) {
    vectorMap.value.removeControl(vectorLegend.value);
  }

  vectorLegend.value = createLegend(vectorMap.value, vectorStyleType.value);
  vectorLegend.value.addTo(toRaw(vectorMap.value));
};

const addGeoJSONLayer = () => {
  if (vectorGeoJsonLayer.value) {
    vectorMap.value.removeLayer(vectorGeoJsonLayer.value);
  }

  vectorGeoJsonLayer.value = L.geoJSON(statesJSON, {
    style: (feature) => styleVectorFeature(feature, vectorStyleType.value),
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "center",
        className: "custom-tooltip",
      });
    },
  }).addTo(toRaw(vectorMap.value));

  vectorMap.value.fitBounds(vectorGeoJsonLayer.value.getBounds());
};

const initRasterMap = () => {
  rasterMap.value = L.map("raster-map", {
    ...defaultMapConfig,
  });

  rasterLayers.value["terrain"] = L.tileLayer(baseMaps.terrain.url, {
    attribution: baseMaps.terrain.attribution,
    maxZoom: defaultMapConfig.maxZoom,
    minZoom: defaultMapConfig.minZoom,
  });

  rasterLayers.value["terrain"].addTo(toRaw(rasterMap.value));
  currentRasterLayer.value = rasterLayers.value["terrain"];

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("viewBox", "0 0 200 200");
  svgElement.innerHTML =
    '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
  
  const latLngBounds = L.latLngBounds([
    [32, -130],
    [13, -100],
  ]);
  rasterMap.value.fitBounds(latLngBounds);

  L.svgOverlay(svgElement, latLngBounds, {
    opacity: 0.7,
    interactive: true,
  }).addTo(toRaw(rasterMap.value));
};

watch(vectorStyleType, () => {
  if (vectorGeoJsonLayer.value) {
    vectorGeoJsonLayer.value.setStyle((feature) => {
      return styleVectorFeature(feature, vectorStyleType.value);
    });
    updateVectorLegend();
  }
});

onMounted(async () => {
  // Dynamically import Leaflet to avoid SSR issues
  L = await import("leaflet"); 

  initVectorMap();
  initRasterMap();

  // Always synchronize maps
  vectorMap.value.on("move", () => {
    rasterMap.value.setView(
      vectorMap.value.getCenter(),
      vectorMap.value.getZoom(),
      { animate: false }
    );
  });

  rasterMap.value.on("move", () => {
    vectorMap.value.setView(
      rasterMap.value.getCenter(),
      rasterMap.value.getZoom(),
      { animate: false }
    );
  });
});
</script>

<style scoped>
.h2-like {
  font-size: 1.4em;
  font-weight: bold;
  margin: 0.67em 0;
  color: #000000;
}

.h4-like {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

#app {
  max-width: 1440px;
  margin: 0 auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
}

.map-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .map-container {
    grid-template-columns: 1fr 1fr;
  }
}

.map-section {
  display: flex;
  flex-direction: column;
  background-color: #1dae50;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e5ea;
}

.map-controls {
  display: flex;
  gap: 8px;
}

.map-element {
  height: 400px;
  width: 100%;
  z-index: 1;
}

.control-select {
  padding: 8px 16px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.control-select:hover {
  border-color: #0a84ff;
}

.map-options {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
</style>
