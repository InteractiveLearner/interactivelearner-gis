<template>
    <div id="graffiti-map" class="map-container"></div>
</template>

<script setup>
import { useLeafletVisualization } from "../../.vitepress/ai/leaflet";
import { onBeforeUnmount } from "vue";
import { onMounted, ref } from "vue";
import graffitiData from "../../data/VancouverGraffitiCount.json";
import { jenks } from "simple-statistics";
let L;
let jenksBreaks = [];
let legend;
let reversed = false;

const colorRamp = ["#bd0026", "#f03b20", "#fd8d3c", "#fecc5c", "#ffffb2"];

// Using the jenks algorithm since the distribution of the data is kind of skewed
const calculateJenksBreaks = () => {
    const values = graffitiData.features.map((f) => f.properties.graffiti_count);
    jenksBreaks = jenks(values, colorRamp.length);
};

const getColor = (count) => {
    for (let i = 0; i < jenksBreaks.length - 1; i++) {
        if (count <= jenksBreaks[i + 1]) {
            return colorRamp[i];
        }
    }
    return colorRamp[colorRamp.length - 1];
};

const styleFeature = (feature) => {
    return {
        fillColor: getColor(feature.properties.graffiti_count),
        weight: 1,
        opacity: 1,
        color: "#666",
        fillOpacity: 0.7,
    };
};

const createLegend = (map) => {
    if (legend) {
        legend.remove();
    }
    legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        const div = L.DomUtil.create("div", "leaflet-legend");
        div.innerHTML = '<div>Graffiti count (jenks)</div>';
        for (let i = 0; i < jenksBreaks.length - 1; i++) {
            div.innerHTML += `
        <div>
          <i style="background: ${colorRamp[i]}"></i>
          ${jenksBreaks[i].toFixed(2)} - ${jenksBreaks[i + 1].toFixed(2)}
        </div>`;
        }
        return div;
    };

    legend.addTo(map);
};

let agentMap = null;
onMounted(async () => {
    L = await import("leaflet");

    calculateJenksBreaks();

    const map = L.map("graffiti-map", {
        center: [49.28, -123.12],
        zoom: 11,
        zoomControl: false,
    });

  agentMap = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.geoJSON(graffitiData, {
        style: styleFeature,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(
                `<b>${feature.properties.neighborhood}</b><br>Graffiti Count: ${feature.properties.graffiti_count}`
            );
        },
    }).addTo(map);

    createLegend(map);
    addButtonToMap(map);
});

function addButtonToMap(map) {
    const buttonControl = L.control({ position: "topright" });

    buttonControl.onAdd = function () {
        const button = L.DomUtil.create("button", "leaflet-reverse-button");
        button.innerHTML = "<button>Reverse color ramp</button>";

        L.DomEvent.on(button, "click", () => {
            reversed = !reversed;
            colorRamp.reverse();

            map.eachLayer((layer) => {
                if (layer.feature && layer.feature.properties.graffiti_count !== undefined) {
                    layer.setStyle(styleFeature(layer.feature));
                }
            });

            createLegend(map);
        });

        return button;
    };

    buttonControl.addTo(map);
}

useLeafletVisualization('misleading-theme', 'Compare how reversing a color ramp changes perception of graffiti counts.', () => agentMap, { controls: { reversed: { type: 'boolean' } }, read: () => ({ reversed }), update: c => { if (c.reversed !== undefined && c.reversed !== reversed) { reversed = c.reversed; colorRamp.reverse(); agentMap.eachLayer(layer => { if (layer.feature) layer.setStyle(styleFeature(layer.feature)); }); createLegend(agentMap); } } });
onBeforeUnmount(() => { agentMap?.remove(); });
</script>

<style scoped>
.map-container {
    height: 600px;
    width: 100%;
}
</style>