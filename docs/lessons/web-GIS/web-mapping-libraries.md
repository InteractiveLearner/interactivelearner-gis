---
title: Web mapping libraries
description: Explore popular web mapping libraries for building interactive maps, including open-source and commercial options, and learn how to create a simple web map using Leaflet with plain JavaScript.
authors:
  - name: Omar Kawach
    url: https://www.linkedin.com/in/omarkawach/
date: 2025-09-27
order: 9
---

# Web mapping libraries

To include maps in a web application, the easiest and most common way is through mapping libraries. Mapping libraries provide out-of-the-box support for visualizations and interactions in maps. Here are some popular web mapping libraries:

- Free open-source libraries:
  - [Leaflet](https://leafletjs.com/)
  - [MapLibre GL JS](https://maplibre.org/)
  - [OpenLayers](https://openlayers.org/)
  - [turf.js](https://turfjs.org/)
  - [D3.js](https://d3js.org/d3-geo)
  - [CesiumJS](https://cesium.com/platform/cesiumjs/)
  - [Kepler.gl](https://kepler.gl/)
  - [deck.gl](https://deck.gl/)
- Commercial libraries:
  - [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
  - [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
  - [MapBox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

Choosing the best web mapping libraries that suit end user and developer needs is a crucial step for all web development involving maps and/or location services.

::: tip
You should check out all the different lessons on this site for examples of a few of these libraries.
The [projections](/lessons/projections) page uses D3, the [scale](/lessons/scale) page uses Leaflet and the [types of maps](/lessons/map-types) page uses the ArcGIS Maps SDK for JavaScript at the bottom. 
Leaflet is used on this page, and the ArcGIS Maps SDK for JavaScript is on the next page.
You can **_usually_** tell which technology was used to author a web map by looking at the attribution at the bottom of the map.
:::

## A plain JavaScript app

When building your first web mapping application, you can use plain JavaScript, HTML and CSS without any tooling or complex setup to get started quickly.
Some web mapping applications can be as simple as placing a point on a map to help customers find your business.

For these kinds of applications, the web mapping library has already packaged and optimized the code to run in your browser by simply including a `script` tag in your HTML file pointing to a <WikiTooltip url="https://en.wikipedia.org/wiki/Content_delivery_network">Content Delivery Network</WikiTooltip> (CDN) URL.

<LeafletMarker/>

::: code-group

```[index.html] html:line-numbers
<html>
  <head>
    <!-- Page title shown in browser tab -->
    <title>Simple Leaflet Map</title>
    <meta charset="utf-8" />
    <!-- Responsive design for mobile devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Custom stylesheet for map styling -->
    <link rel="stylesheet" href="./style.css" />
    <!-- Leaflet CSS for map appearance -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <!-- Leaflet JS library for interactive maps from the unpkg CDN -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  </head>
  <body>
    <!-- Container for the Leaflet map -->
    <div id="map"></div>
    <!-- Custom JavaScript for map initialization and interaction -->
    <script src="./script.js"></script>
  </body>
</html>
```

```[script.js] js:line-numbers
// Initialize the map and center on Victoria, BC
const map = L.map("map").setView([48.46, -123.36], 14);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add a marker
L.marker([48.46, -123.36])
  .addTo(map)
  .bindPopup("Find our cafe here!")
  .openPopup();
```

```[style.css] css:line-numbers
#map {
  height: 100vh;
  width: 100%;
}
```

:::

As you saw, an HTML page loads the CSS/JS of Leaflet from a CDN, a full-screen `div` element is defined, and some custom JavaScript generates a map centered on Victoria, BC.

This example demonstrates the basics of a Leaflet map. 
The map includes background basemap tiles from [OpenStreetMap](https://www.openstreetmap.org/) and an instant popup that reads "Find our cafe here!" for a single marker. 
No further setup, accounts, or tools are required for the user to simply land on the website, see the location-focused map, drag to pan, scroll to zoom, and re-open the pop-up if closed.

## Next steps

What you saw above is great, but it's important to remember that there are companies out there that intentionally build applications meant to scale with demands and complexity.

In the next chapter, we'll dive into the importance of <WikiTooltip url="https://en.wikipedia.org/wiki/Frontend_and_backend">frontend</WikiTooltip> web development frameworks and their role on the scale of the website you plan to host your web mapping application on.
