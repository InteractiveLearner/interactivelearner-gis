<template>
    <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';

import pin from '/assets/icons/pin.png';
import icon from '/assets/icons/icon.png';
import pie from '/assets/icons/pie.png';
import hospital from '/assets/icons/hospital.png';

// Import GeoJSON files
import hospitalsData from '../../data/Hospitals.json';
import wardsData from '../../data/Wards.json';
import roadsData from '../../data/Highways.json';

const options = [pin, icon, pie, hospital];
let pointsCollection = [];
let current = 1;

let Leaflet;

const onEachHospital = (hospital, layer) => {
    let name = hospital.properties.NAME;
    let addr = hospital.properties.ADDRESS;
    let popupContent = `<p><b>Hospital: ${name}</b><br />Address: ${addr}<br /></p>`;

    pointsCollection.push(layer);

    layer.setIcon(
        Leaflet.icon({
            iconSize: [38, 38], // size of the icon
            iconUrl: pin,
            color: "green",
        })
    );

    layer.bindTooltip(popupContent).openTooltip();
};

const onEachWard = (ward, layer) => {
    let name = ward.properties["WARD_NAME_"];
    let num = ward.properties["WARD_NUM"];
    let area = ward.properties["Shape_Area"];
    let popupContent = `<p><b>Ward: ${name}</b><br />Ward Number: ${num}<br />Land Area: ${area}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
};

const onEachRoad = (road, layer) => {
    let name = road.properties.TO_RD_NAME;
    let type = road.properties.SUBCLASS;
    let ownership = road.properties.OWNERSHIP;
    let shapeLength = road.properties.Shape_Leng;

    let popupContent = `<p><b>Name: ${name}</b><br />
                            Road Class: ${type}<br />
                            Ownership: ${ownership}<br />
                            Road Length: ${shapeLength}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
};

const createControl = (title, data) => {
    const MapInfo = Leaflet.Control.extend({
        onAdd: () => {
            const panelDiv = Leaflet.DomUtil.create('button', '');

            panelDiv.style.borderRadius = '6px';
            panelDiv.style.background = '#0a0908';
            panelDiv.style.color = 'white';
            panelDiv.style.padding = '12px';
            panelDiv.style.cursor = 'pointer';
            panelDiv.innerHTML = title;

            panelDiv.addEventListener('click', () => {
                if (current === 4) current = 0;

                data.forEach((layer) => {
                    layer.setIcon(
                        Leaflet.icon({
                            iconSize: [38, 38],
                            iconUrl: options[current],
                            color: 'green',
                        })
                    );
                });

                current += 1;
            });

            return panelDiv;
        },
    });
    return new MapInfo({ position: 'bottomright' });
};

onMounted(async () => {
    Leaflet = await import('leaflet'); // window not defined error if not imported here
    const map = Leaflet.map('map').setView([45.279716962875604, -75.78658103340784], 9);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Set up hospital layer
    Leaflet.geoJSON(hospitalsData, {
        onEachFeature: onEachHospital,
    }).addTo(map);

    // Set up ward layer
    Leaflet.geoJSON(wardsData, {
        style: () => {
            return {
                fillColor: "#f1faee",
                weight: 1,
                opacity: 1,
                color: "black",
                fillOpacity: 0.6,
            };
        },
        onEachFeature: onEachWard,
    }).addTo(map);

    // Set up road layer
    Leaflet.geoJSON(roadsData, {
        style: () => {
            return {
                weight: 4,
                opacity: 1,
                color: "#bb3e03",
                fillOpacity: 0.6,
            }
        },
        onEachFeature: onEachRoad,
    }).addTo(map);

    const scaleButton = createControl('Change Shape Style', pointsCollection);
    scaleButton.addTo(map);

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