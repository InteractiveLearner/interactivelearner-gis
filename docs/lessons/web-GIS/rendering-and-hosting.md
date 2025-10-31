---
title: Application rendering and data hosting strategies
description: Learn about rendering strategies and data hosting options for building scalable and efficient web mapping applications.
authors:
  - name: Omar Kawach
    url: https://www.linkedin.com/in/omarkawach/
date: 2025-09-27
order: 11
---

# Application rendering and data hosting strategies

When building web mapping applications, you might need to consider how the application is rendered for [search engine optimization](https://en.wikipedia.org/wiki/Search_engine_optimization) (SEO) and where the spatial data is hosted. These decisions can significantly impact performance, discoverability, scalability, and user experience.

## Application rendering strategies

As opposed to [client-side rendering](https://developer.mozilla.org/en-US/docs/Glossary/CSR) (CSR) like many existing React applications on the web today, [static site generators](https://en.wikipedia.org/wiki/Static_site_generator) (SSG) such as [Astro](https://astro.build/), [Nuxt](https://nuxt.com/), and [Next.js](https://nextjs.org/) offer advantages like SEO, simplified page routing and [server-side rendering](https://developer.mozilla.org/en-US/docs/Glossary/SSR) (SSR). However, mapping libraries are often problematic when integrated with SSR environments due to their reliance on the browser's [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) object, which is unavailable during SSR. You might find yourself needing to write workarounds when trying to use web mapping functionalities within SSG-based applications.

The SSR example below shows a workaround that had to be done in order to get Leaflet to work in a SSG-based application.
If the CSR Vue component is rendered on the server, it will throw an error because `window` is not defined.

::: code-group

```vue [SSR] ts:line-numbers
<script setup>
import { onMounted } from 'vue';
let Leaflet;

onMounted(async () => {
  // Import dynamically to avoid window not defined error in SSR
  Leaflet = await import('leaflet'); 

  // Check if window is defined
  if (typeof window !== 'undefined') {
    const map = Leaflet.map('map').setView([48.43, -123.36], 14);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Leaflet.marker([48.43, -123.36])
      .addTo(map)
      .bindPopup('Find our cafe here!')
      .openPopup();
  }
});
</script>
```

```vue [CSR] ts:line-numbers
<script setup>
import { onMounted } from 'vue';
// Direct import in CSR
import * as Leaflet from 'leaflet';

onMounted(() => {
  const map = Leaflet.map('map').setView([48.43, -123.36], 14);

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  Leaflet.marker([48.43, -123.36])
    .addTo(map)
    .bindPopup('Find our cafe here!')
    .openPopup();
});
</script>
```

:::

Luckily, most SSGs provide built-in solutions to handle such scenarios, allowing you to specify that certain components should only be rendered on the client-side.
Check out how VitePress [`<ClientOnly>`](https://vitepress.dev/guide/ssr-compat#clientonly), Astro [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives), and React [`"use client"`](https://react.dev/reference/rsc/use-client) offer simpler workarounds.

::: tip
This site was built with [VitePress](https://vitepress.dev/) which is a Vite and Vue powered SSG. You can check out all the code for this site [here](https://github.com/InteractiveLearner/interactivelearner-gis/).

If you're interested in SEO, you should read up [Vercel's research of how Google handles JavaScript through the indexing process based on different rendering strategies](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process#moving-forward-with-new-information). 

Afterwards, try passing your website through Google Search Console's [URL Inspection Tool](https://search.google.com/search-console/about) to see how Googlebot views your web mapping application for SEO.
:::

## Client-side/server-side data

When a user visits a web mapping application, the application can load spatial data on the client-side directly in the user's browser. For example, with Leaflet, you can load a [CSV or GeoJSON](/lessons/spatial-data#vector-data) file directly into the map. This is ideal for small datasets or offline use in [disconnected/air gapped environments](https://en.wikipedia.org/wiki/Air_gap_(networking)). CSR, as covered in [rendering strategies](/lessons/web-GIS/rendering-and-hosting#application-rendering-strategies) above, often uses client-side data.

::: code-group

```javascript [Load GeoJSON data in Leaflet] ts:line-numbers {1}
import * as L from 'leaflet';

const map = L.map("map").setView([48.43, -123.36], 14);

fetch('points.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });
```

:::

Server-side data is more scalable for enterprise/large company needs because it is hosted externally and accessible via APIs or services on a remote server or cloud service. 

You can load web maps and other [geospatial data](https://www.esri.com/arcgis-blog/products/developers/developers/whats-special-about-geospatial-data) that you make with [Map Viewer](https://doc.arcgis.com/en/arcgis-online/get-started/get-started-with-mv.htm) directly from [ArcGIS Online](https://www.arcgis.com/), or connect to your own hosted GIS services using the ArcGIS Maps SDK for JavaScript. Map Viewer is a feature of ArcGIS Online and [ArcGIS Enterprise](https://enterprise.arcgis.com/en/) that aims to simplify the creation and sharing of web maps.

::: code-group

```html [index.html] ts:line-numbers {1}
<body>
  <arcgis-map id="map">
    <arcgis-zoom slot="top-left"></arcgis-zoom>
  </arcgis-map>
  <script type="module" src="main.js"></script>
</body>
```

```javascript [main.js] ts:line-numbers {1}
import Map from "@arcgis/core/Map.js";
import Layer from "@arcgis/core/layers/Layer.js";

const viewElement = document.getElementById("map");

viewElement.addEventListener("arcgisViewReadyChange", async (event) => {
  const layer = await Layer.fromPortalItem({
    // Item ID of a web map created in Map Viewer 
    // and hosted on ArcGIS Online
    portalItem: {
      id: "11e173a4e2f040ae80d39e44ee29467a",
    },
  });
  viewElement.map = new Map({
    basemap: "topo-vector",
    layers: [layer],
  });
  viewElement.center = [-73.97, 40.77];
  viewElement.zoom = 10;
});
```

:::

Self-hosting requires setting up a GIS server (such as ArcGIS Enterprise or [GeoServer](https://geoserver.org/)), caching, maintenance, publishing services, understanding [relational databases](/lessons/relational-db), and managing authentication and access. 
Loading from a paid service like ArcGIS Online is relatively simple in comparison.

However, loading data from a server isn't limited to the ArcGIS Maps SDK for JavaScript. You can do something similar with [OpenLayers and GeoServer](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html).

::: code-group

```javascript [Load data from a remote source with OpenLayers] ts:line-numbers {1}
import Vector from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { bbox } from 'ol/loadingstrategy.js';

// Load vector data from a remote GeoServer using WFS and GeoJSON
const vectorSource = new Vector({
  format: new GeoJSON(),
  loader: function(extent, resolution, projection, success, failure) {
    const proj = projection.getCode();
    const url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
      'outputFormat=application/json&srsname=' + proj + '&' +
      'bbox=' + extent.join(',') + ',' + proj;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const features = vectorSource.getFormat().readFeatures(data);
        vectorSource.addFeatures(features);
        success(features);
      })
      .catch(() => {
        vectorSource.removeLoadedExtent(extent);
        failure();
      });
  },
  strategy: bbox,
});
```

:::

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'For a simple web map to display a business location, which might be sufficient?',
            options: [
                {
                  answer: 'A complex frontend framework like Angular',
                  key: 1
                },
                {
                  answer: 'Only HTML/JavaScript/CSS',
                  key: 2
                },
                {
                  answer: 'Static site generator with server-side rendering',
                  key: 3
                }
            ],
            correctAnswer: 2
            },
            {
            question: 'What is a key challenge associated with mapping libraries that are not framework-agnostic web components?',
            options: [
                {
                  answer: 'They generally have poor performance compared to native browser APIs.',
                  key: 1
                },
                {
                  answer: 'Switching to a different frontend framework after committing can be difficult.',
                  key: 2
                },
                {
                  answer: 'They often lack support for basic map visualizations and interactions.',
                  key: 3
                }
            ],
            correctAnswer: 2
            },
            {
            question: 'Web GIS combines browser capabilities with GIS tools',
            options: [
                {
                  answer: 'True',
                  key: 1
                },
                {
                  answer: 'False',
                  key: 2
                },
            ],
            correctAnswer: 1
            },
        ],     
    }" 
/>

## Next steps

::: warning
Exercise for how to host your own web mapping application via GitHub Pages is a work in progress.
:::
