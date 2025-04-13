---
title: Web GIS
description: GIS and web development technologies
author: Omar Kawach
order: 8
---

<script setup>
  import LeafletMarker from "../samples/LeafletMarker.vue"
</script>

::: warning
Interactive examples are a work in progress for this page.
:::

# Web GIS

By {{ $frontmatter.author }}

Making a beautiful map requires a lot of effort.
If your map is only for illustration, you may only need a printed or static digital version.

However, expectations have evolved. People today expect their maps to be more engaging, interactive, and accessible. They are looking for maps with dynamic content that encourage exploration and provide more profound insights.

Web GIS can help with that, but depending on what you're trying to achieve, implementing Web GIS at your organization can get quite technical.

Web GIS combines the power of the browser and GIS tools for capturing, storing, and analyzing spatial data, enabling users to access spatial data from anywhere, on any device.

Below are **_some_** key considerations for a successful Web GIS based mapping application:

- Choose a web mapping library that suits your needs
- Decide on a frontend web development framework
- Assuming your data has already been preprocessed and ready for publishing, consider where you will host your data
  - Client side or server side?

## Web mapping libraries

To include maps in a web application, the easiest and most common way is through mapping libraries. Mapping libraries provide out-of-the-box support for visualizations and interactions in maps. Common choices are as follows:

- Open-source libraries:
  - [Leaflet](https://leafletjs.com/)
  - [MapLibre GL JS](https://maplibre.org/)
  - [OpenLayers](https://openlayers.org/)
  - [turf.js](https://turfjs.org/)
  - [D3.js](https://d3js.org/d3-geo)
- Commercial libraries:
  - [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
  - [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
  - [MapBox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

Choosing the best web mapping libraries that suit end user and developer needs is a crucial step for all web development involving maps and/or location services.

::: tip
You should check out all the different lessons on this site for examples of a few of these libraries.
The [projections](/lessons/projections) page uses D3, the [scale](/lessons/scale) page uses Leaflet and the [types of maps](/lessons/map-types) page uses the ArcGIS Maps SDK for JavaScript. Leaflet and the JavaScript Maps SDK were used on this page too.
You can **_usually_** tell which technology was used to author a web map by looking at the attribution at the bottom of the map.
:::

## Frontend frameworks

Your choice of a [frontend](https://en.wikipedia.org/wiki/Frontend_and_backend) framework can depend on the scale of the website you plan to host your web mapping application on. 
Some web maps can be quite simple like placing a point on a map to help customers find a business.
For this, the application can be written quickly without extra tools, all you need is HTML/JavaScript/CSS. 

::: tip
If you're new to web development, you should read about the [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) (DOM), [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML), [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript), and [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS).
:::

<LeafletMarker/>

::: code-group

```html [index.html] ts:line-numbers {1}
<html>
  <head>
    <title>Simple Leaflet Map</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  </head>
  <body>
    <div id="map"></div>
    <script src="script.js"></script>
  </body>
</html>
```

```javascript [script.js] ts:line-numbers {1}
// Initialize the map and center on Victoria, BC
var map = L.map("map").setView([48.46, -123.36], 14); 

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

```css [style.css] ts:line-numbers {1}
#map {
  height: 100vh;
  width: 100%;
}
```

:::

What you saw above is great, but it's important to remember that there are organizations out there that intentionally build applications meant to scale with demands. 
If you want to scale quickly along with a team, writing a complex web application requires structure, organization, and maintainability.

Fortunately, you don't need to decide on structure and tooling yourself.
Frameworks make app development easier by providing more structure to the way we write applications.
They do come with a learning curve, but in return, you get a more maintainable codebase, reusable components, nice conveniences, and helpful tooling — which can really pay off as your project scales.

There are a lot of front-end frameworks to choose from. Some of the most popular are [React](https://react.dev/), [Vue](https://vuejs.org/), and [Angular](https://angular.dev/). There are some nuances, but generally, frontend frameworks encourage component-based/reusable code block architecture via a [top-down, one-way data flow](https://jurassix.gitbooks.io/dataflow-through-react/content/data-loading/top-down.html). In turn, frontend frameworks promote declarative code writing (e.g., more HTML and less JavaScript).

::: tip
Be sure to read up on [Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js), [npm](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Package_management), [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json), [dependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies), [devDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devdependencies), and [semantic versioning](https://docs.npmjs.com/about-semantic-versioning) before you start working with frameworks.
:::

<!-- Example here comparing vanilla JS imperative code to React code (use JS Maps SDK?)-->

::: code-group

```html [Imperative] ts:line-numbers {1}
<template>
  <div>Hello World</div>
</template>
```

```js [Declarative] ts:line-numbers {1}
<script setup>
const msg = 'Hello World'
</script>
```

:::

### Tooling

HTML/CSS/JavaScript are core features of modern web browsers. Frameworks like React or Vue extend these native web technologies.

[Bundling tools](https://webreference.com/javascript/advanced/module-bundlers/) like [Vite](https://vite.dev/) optimize and prepare framework-based applications for browsers by reducing file sizes and splitting bundles.

Furthermore, adding [TypeScript](https://www.typescriptlang.org/) to frontend frameworks like React provides an improved developer experience. TypeScript's static typing adds a layer of safety to JavaScript development, reducing uncertainty and boosting confidence.

::: info Code sample
Check out [this code repository](https://github.com/omarkawach/maps-sdk-react-ts) combining the ArcGIS Maps SDK for JavaScript with React, Vite, and TypeScript.
::: 


### Rendering strategies

As opposed to [client-side rendering](https://developer.mozilla.org/en-US/docs/Glossary/CSR) (CSR), [static site generators](https://en.wikipedia.org/wiki/Static_site_generator) (SSG) like [Astro](https://astro.build/), [Nuxt](https://nuxt.com/), and [Next.js](https://nextjs.org/) offer advantages like simplified page routing and [server-side rendering](http://developer.mozilla.org/en-US/docs/Glossary/SSR) (SSR). However, mapping libraries are often problematic when integrated with SSR environments due to their reliance on the browser's [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) object, which is unavailable during SSR. You might find yourself needing to write workarounds when trying to use web mapping functionalities within SSG-based applications. 

This is what could be done to get Leaflet to work in a SSG-based application.

::: code-group

<<< @/samples/LeafletMarker.vue#setup{vue:line-numbers} [SSR]

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

You won't allows need to write this kind of workaround. 
See VitePress [`<ClientOnly>`](https://vitepress.dev/guide/ssr-compat#clientonly) or Astro [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) for simpler examples.

::: tip
This site was built with [VitePress](https://vitepress.dev/) which is a Vite and Vue powered SSG. You can check out all the code for this site [here](https://github.com/InteractiveLearner/interactivelearner-gis/).
:::


### Framework-based mapping libraries

There are a growing number of JavaScript mapping libraries as React, Angular, web, or Vue components. Some notable component libraries are:

- Open-source:
  - [Nivo React](https://github.com/plouc/nivo) (built on top of D3)
  - [Vue 3.x components for CesiumJS](https://github.com/zouyaoji/vue-cesium)
  - [React Leaflet](https://react-leaflet.js.org/)
  - [ngx-leaflet](https://www.npmjs.com/package/@asymmetrik/ngx-leaflet)
  - [ngx-maplibre-gl](https://github.com/maplibre/ngx-maplibre-gl)
  - [leaflet-map](https://github.com/leaflet-extras/leaflet-map)
  - [openlayers-elements](https://github.com/openlayers-elements/openlayers-elements)
- Commericial libraries:
  - [ArcGIS Maps SDK for JavaScript components](https://developers.arcgis.com/javascript/latest/components/)
  - [Google Maps JavaScript API Web Components](https://mapsplatform.google.com/resources/blog/build-maps-faster-web-components/#:~:text=Maps%20JavaScript%20API%20Web%20Components.%20Developers%20can%20access)

The challenge with mapping libraries lacking framework-agnostic web components is that committing to one framework can make switching difficult, or the library might not even offer support for your desired framework. This scenario often requires you to build all the necessary UI components yourself.

::: info What are web components?

> [Web components](https://www.webcomponents.org/introduction) are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.
> Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Interested in writing your own web components using a web mapping library? Check out these code repositories about the process:
- [foss-gis-web-components](https://github.com/omarkawach/foss-gis-web-components)
- [arcgis-web-components](https://github.com/omarkawach/arcgis-web-components)
:::

## Backend and hosting

<!-- Different caching strategies?
JS Maps SDK client side example 
JS Maps SDK AGO webmap example 
JS Maps SDK GeoJSON request example  -->
<!-- Deploy your app to GitHub pages or Vercel -->
<!-- Postgres + PostGIS, GeoServer and Leaflet? -->

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
