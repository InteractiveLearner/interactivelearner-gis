---
title: Web GIS
description: GIS and web development technologies
author: Omar Kawach
order: 8
---

# Web GIS

By {{ $frontmatter.author }}

Making a beautiful map requires a lot of effort. 
You may only need a printed or static digital version of your map if it is mostly meant to be illustrative and not to be used to interact with data.

However, expectations have evolved. People today expect their maps to be more engaging, interactive, and accessible. They are looking for maps with dynamic content that encourage exploration and provide deeper insights.

WebGIS can greatly help with that, and depending on what you're trying to achieve, implementing WebGIS at your organization can get quite technical.

WebGIS combines the power of the browser and GIS tools for capturing, storing, and analyzing spatial data, enabling users to access spatial data from anywhere, on any device.

Below are ***some*** key considerations for a successful WebGIS based mapping application:
- Choose a web mapping library that suits your needs 
- Decide on a frontend web development framework
- Assuming your data has already been preprocessed and ready for publishing, consider where you will host your data
  - Client side or server side?

## Web mapping libraries

To include maps in a web application, the easiest and most common way is through mapping libraries. Mapping libraries provides out-of-box support for visualizations and interactions in maps. Common choices are as follows:

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

::: tip
You should check out all the different lessons on this site for examples of a few of these libraries. 
The [projections](/lessons/projections) page uses D3, the [scale](/lessons/scale) page uses Leaflet and the [types of maps](/lessons/map-types) page uses the ArcGIS Maps SDK for JavaScript. 
You can ***usually*** tell which technology was used to author a web map by looking at the attribution at the bottom of the map.
:::

Choosing the best web mapping libraries that suit end user and developer needs is a crucial step for all web development involving maps and/or location services.

## Frontend frameworks


::: tip
This site was built with [VitePress](https://vitepress.dev/) which is a Vite and Vue powered static site generator. You can check out all the code for this site at https://github.com/InteractiveLearner/interactivelearner-gis/
:::

## Backend

Different caching strategies

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'Can a spatial database have non-spatial relationships?',
            options: [
                {
                answer: 'Yes',
                key: 1
                },
                {
                answer: 'No',
                key: 2
                }
            ],
            correctAnswer: 1
            },
        ]
    }" 
/>

## Sources

<Sources 
  :sources="
    [{
        title: 'Section Five - What Are Relational Databases and Geodatabases',
        author: 'Learn GIS',
        url: 'https://vector.geospatial.science/textbook/chapter-four/what-are-relational-databases-and-geodatabases',
    },
    {
        title: 'Database Systems: The Complete Book',
        author: 'Hector Garcia-Molina, Jeffrey D. Ullman and Jennifer Widom',
        url: 'http://infolab.stanford.edu/~ullman/dscb.html',
    }]"
/>