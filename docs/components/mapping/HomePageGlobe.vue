<template>
  <div id="globe"></div>
</template>
<!-- Inspired by Michael Keith's (@_mkeith_) globe -->
<script setup>
import { onMounted } from 'vue';
import * as d3 from 'd3';
import worldData from '../../data/world.json';

onMounted(() => {

  const heroContainer = document.querySelector('#globe');
  const containerRect = heroContainer.getBoundingClientRect();
  const size = Math.min(containerRect.width, containerRect.height);
  const sensitivity = 75;
  const scale = size * 0.45; 
  // Setup projection
  const projection = d3.geoOrthographic()
    .scale(scale)
    .center([0, 0])
    .rotate([0, -30])
    .translate([size / 2, size / 2]);

  const initialScale = projection.scale();
  let path = d3.geoPath().projection(projection);

  // Create SVG container
  const svg = d3.select("#globe")
    .append("svg")
    .attr("viewBox", `0 0 ${size} ${size}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Add globe circle
  const globe = svg.append("circle")
    .attr("fill", "transparent")
    .attr("stroke", "#14a02e")
    .attr("stroke-width", "1")
    .attr("cx", size/2)
    .attr("cy", size/2)
    .attr("r", initialScale);

  // Add drag behavior
  svg.call(d3.drag().on('drag', (event) => {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();
    projection.rotate([
      rotate[0] + event.dx * k,
      rotate[1] - event.dy * k
    ]);
    path = d3.geoPath().projection(projection);
    svg.selectAll("path").attr("d", path);
  }));

  // Add map features
  svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(worldData.features)
    .enter().append("path")
    .attr("d", path)
    .attr("fill", "transparent")
    .style('stroke', '#14a02e')
    .style('stroke-width', 0.8)
    .style("opacity", 0.8);

  // Auto rotation
  d3.timer((elapsed) => {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();
    projection.rotate([
      rotate[0] - 1 * k,
      rotate[1]
    ]);
    path = d3.geoPath().projection(projection);
    svg.selectAll("path").attr("d", path);
  }, 200);
});
</script>

<style scoped>
#globe {
  width: 100%;
  height: 100%;
}

.countries path {
  fill: #53a551;
  stroke: #515151;
}

/* Dark mode support */
:deep(body[class="calcite-mode-dark"]) .countries path {
  stroke: #eaecf0;
}
</style>