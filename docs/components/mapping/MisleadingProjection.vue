<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import * as d3 from "d3";
import GreenlandJSON from "../../data/Greenland.json";

const DefaultProjection = "Mercator";
const projectionTypes = [
  "Azimuthal Equal Area",
  "Mercator",
];

const Circles = [
  [-135, 0],
  [-90, 0],
  [-45, 0],
  [0, 0],
  [45, 0],
  [90, 0],
  [135, 0],
  [180, 0],
  [0, -70],
  [0, -35],
  [0, 35],
  [0, 70],
  [180, -70],
  [180, -35],
  [180, 35],
  [180, 70],
];

const GeoGenerator = d3.geoPath().projection(DefaultProjection);
const Graticule = d3.geoGraticule();
const GeoCircle = d3.geoCircle().radius(10).precision(1);

const geojson = ref(null);

const state = reactive({
  type: DefaultProjection,
  scale: 120,
  translateX: 450,
  translateY: 250,
  centerLon: 0,
  centerLat: 0,
  rotateLambda: 0.1,
  rotatePhi: 0,
  rotateGamma: 0,
});

onMounted(async () => {
  await Promise.all([
    import('@esri/calcite-components/dist/components/calcite-label'),
    import('@esri/calcite-components/dist/components/calcite-select'),
    import('@esri/calcite-components/dist/components/calcite-option'),
    import('@esri/calcite-components/dist/components/calcite-slider')
  ]);
  
  try {
    const json = await d3.json(
      "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
    );
    geojson.value = json;
    updateProjection();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
});

watch(state, () => {
  updateProjection();
});

function updateProjection() {
  const projection = d3["geo" + state.type.replace(/\s/g, "")]();
  GeoGenerator.projection(projection);
  projection
    .scale(state.scale)
    .translate([state.translateX, state.translateY])
    .center([state.centerLon, state.centerLat])
    .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma]);

  let u = d3.select("g.misleading-map").selectAll("path").data(geojson.value.features);
  u.enter()
    .append("path")
    .merge(u)
    .attr("d", GeoGenerator)
    .attr("fill", "#53a551")
    .attr("stroke", "#515151");

  const greenlandProjection = d3["geo" + state.type.replace(/\s/g, "")]();
  greenlandProjection
    .scale(state.scale)
    .translate([state.translateX, state.translateY])
    .center([state.centerLon, state.centerLat])
    .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma]);

  const greenlandGeoGenerator = d3.geoPath().projection(greenlandProjection);

  let greenland = d3
    .select("g.greenland")
    .selectAll("path")
    .data([GreenlandJSON]);
  greenland
    .enter()
    .append("path")
    .merge(greenland)
    .attr("d", greenlandGeoGenerator)
    .attr("fill", "orange")
    .attr("stroke", "#515151");

  const projectedCenter = projection([state.centerLon, state.centerLat]);
  d3.select(".projection-center")
    .attr("cx", projectedCenter[0])
    .attr("cy", projectedCenter[1]);

  d3.select(".graticule path").datum(Graticule()).attr("d", GeoGenerator);

  u = d3.select(".circles").selectAll("path").data(
    Circles.map((d) => {
      GeoCircle.center(d);
      return GeoCircle();
    })
  );
  u.enter().append("path").merge(u).attr("d", GeoGenerator);
}

function updateType(event) {
  state.type = event.target.value;
}

function updateScale(event) {
  state.scale = event.target.value;
}
</script>

<template>
  <div>
    <div class="projection-type">
      <div style="max-width: 200px">
        <calcite-label>
          Choose a projection
          <calcite-select :value="state.type" @calciteSelectChange="updateType">
            <calcite-option v-for="type in projectionTypes" :key="type" :value="type" :selected="state.type === type">
              {{ type }}
            </calcite-option>
          </calcite-select>
        </calcite-label>
      </div>
    </div>
    <div class="slider">
      <calcite-label>
        Scale
        <calcite-slider min="0" max="400" :value="state.scale" @calciteSliderInput="updateScale" label-handles
          scale="l"></calcite-slider>
      </calcite-label>
    </div>
    <svg width="95%" height="500px" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet">
      <g class="graticule">
        <path></path>
      </g>
      <g class="circles"></g>
      <g class="misleading-map"></g>
      <g class="greenland"></g> <!-- New group for Greenland -->
      <circle class="projection-center" r="4"></circle>
    </svg>
  </div>
</template>

<style>
.slider {
  max-width: 300px;
}

.misleading-map path {
  fill: #6b64ce;
  stroke: #515151;
}

body[class="calcite-mode-dark"] .map path {
  stroke: unset;
}

.graticule path {
  fill: none;
  stroke: #e2e2e2;
}

body[class="calcite-mode-dark"] .graticule path {
  stroke: #54575c;
}

.circles path {
  fill: none;
  stroke: #515151;
}

body[class="calcite-mode-dark"] .circles path {
  stroke: #eaecf0;
}

.projection-center {
  fill: #ff4444;
}
</style>