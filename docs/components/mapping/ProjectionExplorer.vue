<script setup>
import { ref, watchEffect } from "vue";
import * as d3 from "d3";

const DefaultProjection = "AzimuthalEqualArea";
const projectionTypes = [
  "Azimuthal Equal Area",
  "Azimuthal Equidistant",
  "Albers",
  "Conic Conformal",
  "Conic Equal Area",
  "Conic Equidistant",
  "Equirectangular",
  "Mercator",
  "TransverseMercator",
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

const state = ref({
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

const geojson = ref(null);
const svg = ref(null);

watchEffect(async () => {
  if (!geojson.value) {
    try {
      const json = await d3.json(
        "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
      );
      geojson.value = json;
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }

  console.log("geo" + state.value.type.replace(/\s/g, ""))
  const projection = d3["geo" + state.value.type.replace(/\s/g, "")]();
  GeoGenerator.projection(projection);
  projection
    .scale(state.value.scale)
    .translate([state.value.translateX, state.value.translateY])
    .center([state.value.centerLon, state.value.centerLat])
    .rotate([state.value.rotateLambda, state.value.rotatePhi, state.value.rotateGamma]);

  const u = d3.select(svg.value).select("g.map").selectAll("path").data(geojson.value.features);
  u.enter().append("path").merge(u).attr("d", GeoGenerator);

  const projectedCenter = projection([state.value.centerLon, state.value.centerLat]);
  d3.select(svg.value).select(".projection-center")
    .attr("cx", projectedCenter[0])
    .attr("cy", projectedCenter[1]);

  d3.select(svg.value).select(".graticule path").datum(Graticule()).attr("d", GeoGenerator);

  const circles = d3.select(svg.value).select(".circles").selectAll("path").data(
    Circles.map((d) => {
      GeoCircle.center(d);
      return GeoCircle();
    })
  );
  circles.enter().append("path").merge(circles).attr("d", GeoGenerator);
});

function updateScale(event) {
  state.value.scale = event.target.value;
}

function updateCenterLon(event) {
  state.value.centerLon = event.target.value;
}

function updateCenterLat(event) {
  state.value.centerLat = event.target.value;
}
</script>

<template>
  <div class="menu" style="margin: inherit">
    <div class="projection-type item">
      <div style="max-width: 200px">
        <calcite-select v-model="state.type" @calciteSelectChange="update">
          <calcite-option v-for="type in projectionTypes" :key="type" :value="type" :selected="state.type === type">
            {{ type }}
          </calcite-option>
        </calcite-select>
      </div>
    </div>
    <div class="slider item">
      <calcite-label>
        Scale
        <calcite-slider min="0" max="400" :value="state.scale" @calciteSliderInput="updateScale"></calcite-slider>
      </calcite-label>
    </div>
    <div class="slider item">
      <calcite-label>
        Center - Longitude
        <calcite-slider min="-180" max="180" :value="state.centerLon"
          @calciteSliderInput="updateCenterLon"></calcite-slider>
      </calcite-label>
    </div>
    <div class="slider item">
      <calcite-label>
        Center - Latitude
        <calcite-slider min="-90" max="90" :value="state.centerLat"
          @calciteSliderInput="updateCenterLat"></calcite-slider>
      </calcite-label>
    </div>
    <svg ref="svg" width="95%" height="500px" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet">
      <g class="graticule">
        <path></path>
      </g>
      <g class="circles"></g>
      <g class="map"></g>
      <circle class="projection-center" r="4"></circle>
    </svg>
  </div>
</template>

<style scoped>
.menu {
  width: 98%;
  padding-left: 0px;
  padding-top: 16px;
}

.menu .item {
  margin-bottom: 12px;
}

.menu .item input {
  width: 200px;
  cursor: pointer;
}

.menu select {
  margin-top: 4px;
  cursor: pointer;
  border: 2px solid;
  width: 250px;
  padding: 5px;
}

.menu .item .value {
  font-weight: bold;
}

.menu .item span,
.menu .item input {
  vertical-align: middle;
}

.menu .item .low {
  display: inline-block;
  width: 30px;
  text-align: right;
}

.map path {
  fill: #53a551;
  stroke: #515151;
}

html[data-theme="dark"] .map path {
  stroke: unset;
}

.projection-center {
  fill: #ff4444;
}

.graticule path {
  fill: none;
  stroke: #e2e2e2;
}

html[data-theme="dark"] .graticule path {
  stroke: #54575c;
}

.circles path {
  fill: none;
  stroke: #515151;
}
</style>