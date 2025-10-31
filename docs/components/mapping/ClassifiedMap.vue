<!-- Inspired by https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3 -->
<!-- Repo https://github.com/axismaps/colorbrewer -->
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { colorSchemes } from "./utils/ColorSchemes";
import statesJSON from "../../data/us-states.json";
import * as d3 from "d3";
import { jenks } from "simple-statistics";

const selectedScheme = ref({ type: "sequential", scheme: "Blues", classes: 5 });
const selectedData = ref("population");
const selectedClassification = ref("equalInterval");
const selectedType = ref(selectedScheme.value.type);
const selectedSchemeName = ref(selectedScheme.value.scheme);
const selectedClasses = ref(selectedScheme.value.classes);
const actionBarRef = ref(null);
const filterRef = ref(null);

// Widget state
let activeWidget = null;
let Leaflet;
let map;
let geojsonLayer;
let legend;

const currentColors = computed(() => {
    const { type, scheme, classes } = selectedScheme.value;
    const schemeData = colorSchemes[type].schemes.find((s) => s.name === scheme);
    return schemeData?.colors[classes] || [];
});

const currentScheme = computed(() =>
    availableSchemes.value.find((s) => s.name === selectedSchemeName.value)
);

const availableSchemes = computed(() => colorSchemes[selectedType.value].schemes);
const availableClasses = computed(() => getAvailableClasses(currentScheme.value));

function getAvailableClasses(scheme) {
    if (!scheme) return [];
    return Object.keys(scheme.colors)
        .map(Number)
        .sort((a, b) => a - b);
}

function updateSelectedScheme() {
    selectedScheme.value = {
        type: selectedType.value,
        scheme: selectedSchemeName.value,
        classes: selectedClasses.value,
    };
}

function updateClassesBasedOnScheme(scheme) {
    const classes = getAvailableClasses(scheme);
    if (!classes.includes(selectedClasses.value)) {
        selectedClasses.value = classes[Math.floor(classes.length / 2)];
    }
}

function changeType(type) {
    selectedType.value = type;
    const scheme = colorSchemes[type].schemes[0];
    selectedSchemeName.value = scheme.name;
    updateClassesBasedOnScheme(scheme);
    updateSelectedScheme();
}

function changeScheme(schemeName) {
    selectedSchemeName.value = schemeName;
    const scheme = availableSchemes.value.find((s) => s.name === schemeName);
    updateClassesBasedOnScheme(scheme);
    updateSelectedScheme();
}

function changeClasses(count) {
    selectedClasses.value = count;
    updateSelectedScheme();
}

function changeClassification(method) {
    selectedClassification.value = method;
    updateMapColors();
}

function togglePanelVisibility(widget, isVisible) {
    if (widget === "filter") {
        filterRef.value.hidden = !isVisible;
    }
};

function handleActionBarClick(event) {
    const target = event.target;
    if (target.tagName !== "CALCITE-ACTION") return;

    const nextWidget = target.dataset.actionId;
    if (nextWidget === activeWidget) {
        target.active = false;
        togglePanelVisibility(nextWidget, false);
        activeWidget = null;
    } else {
        if (activeWidget) {
            actionBarRef.value
                .querySelector(`[data-action-id=${activeWidget}]`)
                .setAttribute("active", false);
            togglePanelVisibility(activeWidget, false);
        }
        target.active = true;
        togglePanelVisibility(nextWidget, true);
        activeWidget = nextWidget;
    }
};

function createLegend() {
    if (legend) {
        legend.remove();
    }

    legend = Leaflet.control({ position: "bottomright" });

    legend.onAdd = function () {
        const div = Leaflet.DomUtil.create("div", "leaflet-legend");
        const colors = currentColors.value;
        const numClasses = colors.length;

        let labels = [];
        if (selectedClassification.value === "equalInterval") {
            const values = statesJSON.features.map(
                (f) => f.properties[selectedData.value]
            );
            const min = Math.min(...values);
            const max = Math.max(...values);
            const step = (max - min) / numClasses;

            for (let i = 0; i < numClasses; i++) {
                const rangeStart = (min + i * step).toFixed(2);
                const rangeEnd = (min + (i + 1) * step).toFixed(2);
                labels.push(`${rangeStart} - ${rangeEnd}`);
            }
        } else if (selectedClassification.value === "quantile") {
            const values = statesJSON.features
                .map((f) => f.properties[selectedData.value])
                .sort((a, b) => a - b);
            const quantiles = d3
                .range(0, 1, 1 / numClasses)
                .map((q) => d3.quantile(values, q));

            for (let i = 0; i < numClasses; i++) {
                const rangeStart = quantiles[i].toFixed(2);
                const rangeEnd = quantiles[i + 1]?.toFixed(2) || "Max";
                labels.push(`${rangeStart} - ${rangeEnd}`);
            }
        } else if (selectedClassification.value === "naturalBreaks") {
            const values = statesJSON.features.map(
                (f) => f.properties[selectedData.value]
            );
            const breaks = jenks(values, numClasses);

            for (let i = 0; i < numClasses; i++) {
                const rangeStart = breaks[i].toFixed(2);
                const rangeEnd = breaks[i + 1]?.toFixed(2) || "Max";
                labels.push(`${rangeStart} - ${rangeEnd}`);
            }
        }

        div.innerHTML = `
      <div class="legend-header">
        <button class="toggle-legend">Legend</button>
      </div>
      <div class="legend-content">
        <div class="h4-like">${capitalize(selectedData.value)
            }</div>
        ${labels
                .map(
                    (label, i) => `
          <div>
            <i style="background: ${colors[i]}; width: 20px; height: 20px; display: inline-block; margin-right: 8px;"></i>
            ${label}
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
function getFeatureStyle(feature) {
    const value = feature.properties[selectedData.value];
    const colors = currentColors.value;
    const numClasses = colors.length;

    const values = statesJSON.features.map(
        (f) => f.properties[selectedData.value]
    );

    let scale;
    if (selectedClassification.value === "equalInterval") {
        scale = d3
            .scaleQuantize()
            .domain([Math.min(...values), Math.max(...values)])
            .range(d3.range(numClasses));
    } else if (selectedClassification.value === "quantile") {
        scale = d3.scaleQuantile().domain(values).range(d3.range(numClasses));
    } else if (selectedClassification.value === "naturalBreaks") {
        const breaks = jenks(values, numClasses);
        scale = d3
            .scaleThreshold()
            .domain(breaks.slice(1, -1)) // Exclude min and max
            .range(d3.range(numClasses));
    }

    const colorIndex = scale(value);
    const fillColor = colors[colorIndex];

    return {
        fillColor,
        weight: 1,
        opacity: 1,
        color: "#666",
        fillOpacity: 0.7,
    };
}

// function renderHistogram() {
//   const histogramContainer = d3.select("#data-histogram");
//   histogramContainer.selectAll("*").remove(); // Clear previous histogram

//   const values = statesJSON.features.map((f) => f.properties[selectedData.value]);

//   const margin = { top: 10, right: 30, bottom: 30, left: 40 };
//   const width = 600 - margin.left - margin.right;
//   const height = 150 - margin.top - margin.bottom;

//   const svg = histogramContainer
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   const x = d3.scaleLinear().domain([Math.min(...values), Math.max(...values)]).range([0, width]);
//   svg.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x));

//   const histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(10));
//   const bins = histogram(values);

//   const y = d3.scaleLinear().domain([0, d3.max(bins, (d) => d.length)]).range([height, 0]);
//   svg.append("g").call(d3.axisLeft(y));

//   svg.selectAll("rect")
//     .data(bins)
//     .join("rect")
//     .attr("x", (d) => x(d.x0))
//     .attr("y", (d) => y(d.length))
//     .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
//     .attr("height", (d) => height - y(d.length))
//     .style("fill", "#69b3a2");
// }

function updateMapColors() {
    if (geojsonLayer) {
        geojsonLayer.setStyle(getFeatureStyle);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

watch(
    [
        () => selectedData.value,
        () => selectedScheme.value,
        () => selectedClassification.value,
        () => currentColors.value,
    ],
    updateMapColors,
    { deep: true }
);

watch(
    [
        () => selectedData.value,
        () => selectedScheme.value,
        () => selectedClassification.value,
        () => currentColors.value,
    ],
    createLegend,
    { deep: true }
);

// watch(() => selectedData.value, renderHistogram);

onMounted(async () => {
    await Promise.all([
        import('@esri/calcite-components/dist/components/calcite-shell'),
        import('@esri/calcite-components/dist/components/calcite-navigation'),
        import('@esri/calcite-components/dist/components/calcite-navigation-logo'),
        import('@esri/calcite-components/dist/components/calcite-shell-panel'),
        import('@esri/calcite-components/dist/components/calcite-action-bar'),
        import('@esri/calcite-components/dist/components/calcite-action'),
        import('@esri/calcite-components/dist/components/calcite-panel'),
        import('@esri/calcite-components/dist/components/calcite-label'),
        import('@esri/calcite-components/dist/components/calcite-select'),
        import('@esri/calcite-components/dist/components/calcite-option')
    ]);
    
    Leaflet = await import("leaflet");

    map = Leaflet.map("classified-map", {
        center: [20, -100],
        zoom: 3,
        zoomControl: false,
        attributionControl: true,
    });

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    geojsonLayer = Leaflet.geoJSON(statesJSON, {
        style: getFeatureStyle,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(
                `<b>${feature.properties.name}</b>
            <br>Population: ${feature.properties.population}
            <br>Area (sqkm): ${feature.properties.area_sqkm}
            <br>Density: ${feature.properties.density}
        `
            );
        },
    }).addTo(map);

    actionBarRef.value.addEventListener("click", handleActionBarClick);

    createLegend();

    //   renderHistogram();
});
</script>

<template>
    <!-- <div class="selector-section">
    <calcite-label><b>Data Distribution</b></calcite-label>
    <div id="data-histogram" class="histogram-container"></div>
  </div> -->

    <calcite-shell content-behind>
        <calcite-navigation slot="header">
            <calcite-navigation-logo slot="logo" heading="US population classification map"></calcite-navigation-logo>
        </calcite-navigation>

        <calcite-shell-panel slot="panel-start" display-mode="float">
            <calcite-action-bar slot="action-bar" ref="actionBarRef">
                <calcite-action data-action-id="filter" icon="filter" text="Filter"></calcite-action>
            </calcite-action-bar>

            <calcite-panel heading="Filter" height-scale="l" data-panel-id="filter" hidden ref="filterRef">
                <div class="scheme-selector">
                    <div class="selector-section">
                        <calcite-label><b>Data</b></calcite-label>
                        <calcite-select :value="selectedData" @calciteSelectChange="selectedData = $event.target.value">
                            <calcite-option v-for="data in ['population', 'area_sqkm', 'density']" :key="data"
                                :value="data">
                                {{
                                    data === "area_sqkm"
                                        ? "Area (sqkm)"
                                        : capitalize(data)
                                }}
                            </calcite-option>
                        </calcite-select>
                    </div>

                    <div class="selector-section">
                        <calcite-label><b>Type</b></calcite-label>
                        <calcite-select :value="selectedType" @calciteSelectChange="changeType($event.target.value)">
                            <calcite-option v-for="type in Object.keys(colorSchemes)" :key="type" :value="type">
                                {{ colorSchemes[type].name }}
                            </calcite-option>
                        </calcite-select>
                    </div>

                    <div class="selector-section">
                        <calcite-label><b>Scheme</b></calcite-label>
                        <calcite-select :value="selectedSchemeName"
                            @calciteSelectChange="changeScheme($event.target.value)">
                            <calcite-option v-for="scheme in availableSchemes" :key="scheme.name" :value="scheme.name">
                                {{ scheme.name }}
                            </calcite-option>
                        </calcite-select>
                    </div>

                    <div class="selector-section">
                        <calcite-label><b>Number of data classes</b></calcite-label>
                        <calcite-select :value="selectedClasses"
                            @calciteSelectChange="changeClasses(Number($event.target.value))">
                            <calcite-option v-for="count in availableClasses" :key="count" :value="count">
                                {{ count }}
                            </calcite-option>
                        </calcite-select>
                    </div>

                    <div class="selector-section">
                        <calcite-label><b>Classification Method</b></calcite-label>
                        <calcite-select :value="selectedClassification"
                            @calciteSelectChange="changeClassification($event.target.value)">
                            <calcite-option value="equalInterval">Equal Interval</calcite-option>
                            <calcite-option value="quantile">Quantile</calcite-option>
                            <calcite-option value="naturalBreaks">Natural Breaks</calcite-option>
                        </calcite-select>
                    </div>
                </div>
            </calcite-panel>
        </calcite-shell-panel>

        <div id="classified-map" class="map-container"></div>
    </calcite-shell>
</template>

<style scoped>
.histogram-container {
    width: 100%;
    height: 150px;
    margin-top: 10px;
}

calcite-shell {
    height: 600px;
    position: relative;
    border-radius: 6px;
    border: 1px solid black;
}

.scheme-selector,
.selector-section {
    padding: 5px;
    margin-bottom: 5px;
    max-width: 220px;
}

html.dark .map path {
    stroke: #515151;
}

.map-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
