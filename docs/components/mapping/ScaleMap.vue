<template>
    <div id="map"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";

const map = ref(null);
const center = [48.42829687325907, -123.3656709938676];

onMounted(() => {
    map.value = L.map("map", {
        center: center,
        zoom: 12,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    L.control.scale({ position: "bottomleft" }).addTo(map.value);

    addButtonToMap(15, center, "Large scale");
    addButtonToMap(12, center, "Small scale");
});

function addButtonToMap(zoom, center, title) {
    const button = L.DomUtil.create("button", "");
    button.innerText = title;
    button.style.cursor = "pointer";
    button.style.padding = "8px";
    button.style.background = "#0a0908";
    button.style.borderRadius = "6px";

    L.DomEvent.on(button, "click", () => {
        map.value.setView(center, zoom);
    });

    const customControl = L.Control.extend({
        onAdd: function () {
            return button;
        },
    });

    map.value.addControl(new customControl({ position: "bottomright" }));
}
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
