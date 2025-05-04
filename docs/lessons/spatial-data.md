---
title: Spatial data and its types
description: Check out the key elements of spatial data and its types.
author: Omar Kawach
order: 2
---

# Spatial data and its types

By {{ $frontmatter.author }}

## Spatial data

Spatial data have two main components that set them apart from regular data, making them suitable for mapping:

- **"Where"**: Referring to the location of the data
- **"What"**: Referring to the information about the data

## Types of spatial data

Spatial data can be categorized into two types: raster and vector.

### Raster data

Raster data can be described as a grid of cells (rows and columns), similar to pixels in pictures.

- Each cell contains a value representing a specific characteristic of a studied geography
- Commonly used for continuous data, like land use, temperature or elevation (e.g., Digital Elevation Models or DEMs, which consist of elevation values)
- Raster data are stored as a grid of cells, with each cell having a unique value based on its x, y, and z coordinates within the grid
- Can be either continuous (progressive, varying data) or discrete (thematic or categorical)
- Rectangular tessellated rasters are most commonly used due to their mathematical simplicity
- Examples of raster data include satellite images or aerial photos
- Most commonly seen in the [GeoTIFF](https://en.wikipedia.org/wiki/GeoTIFF) file format

### Vector data

Vector data are represented as points, lines, and polygons.

- Commonly used for representing discrete or categorical data, such as political boundaries, roads, or land cover
- Stored as sets of x, y coordinate pairs defining point locations, or as series of coordinates defining vertices of lines or polygons
- Can be categorized into 0-dimensional, 1-dimensional, and 2-dimensional forms (geometric primitives). In the 0th dimension, coordinate points exist independently. In the 1st dimension, two points can form a line. In the 2nd dimension, three or more lines can be joined to create a polygon
- Vector data allows for more efficient storage and manipulation
- Can convert vectors to raster and vice versa using specialized software (e.g., ArcGIS Pro, and QGIS)
- Common data formats include [CSV](https://en.wikipedia.org/wiki/Comma-separated_values), [KML](https://en.wikipedia.org/wiki/Keyhole_Markup_Language) (Google), [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON), and [Shapefile](https://en.wikipedia.org/wiki/Shapefile) (Esri)

<ContentFigure 
   :imgSrc="'/assets/images/vector_raster.png'" 
   :description="'Comparing real world data to types of spatial data'"
   :anchorHref="'http://www.geography.hunter.cuny.edu/~jochen/gtech361/lectures/lecture05/concepts/03%20-%20Geographic%20data%20models.html'"
   :anchorText="'Credit: CUNY Department of Geography and Environmental Science'"
/>

## Basemaps and data

Basemaps are fundamental background layers in mapping, providing critical geographical context for all overlaid data. 
Basemaps can be raster or vector. 
Examples of raster basemaps include [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Raster_tile_providers) and [OpenTopoMap](https://wiki.openstreetmap.org/wiki/OpenTopoMap), which provide pre-rendered map tiles in [PNG](https://en.wikipedia.org/wiki/PNG) format. 

Overlaying vector data, such as polygon features from a GeoJSON layer, onto a raster basemap is common to visualize specific geographic information within the broader context provided by the underlying imagery.

Similarly, raster data, such as additional imagery layers, can be superimposed over a raster basemap. 
While [vector basemaps](https://wiki.openstreetmap.org/wiki/Vector_tiles) offer performance and customization advantages, the basemap examples provided below are raster-based.

Check out the examples below:

1. This map shows U.S. states as colored polygons on top of a street/navigation basemap. You can cycle through different themes using a dropdown menu. The legend classifies what the colors represent for each theme.

2. This map's raster basemap shows terrain/topography, and the map has an image [SVG](https://en.wikipedia.org/wiki/SVG) graphic on top. 

<VectorAndRaster />

## Test your knowledge

<Quiz :quiz-data="{
  questions: [
    {
      question: 'Which is preferred for representing continuous data such as elevation? (Hint: you want the data with the more detailed representation of terrain)',
      options: [
        {
          answer: 'Raster',
          key: 1
        },
        {
          answer: 'Vector',
          key: 2
        }
      ],
      correctAnswer: 1
    },
    {
      question: 'Which is preferred for representing discrete or categorical data such as political boundaries?',
      options: [
        {
          answer: 'Raster',
          key: 1
        },
        {
          answer: 'Vector',
          key: 2
        }
      ],
      correctAnswer: 2
    },
    {
      question: 'Can you convert vector data to raster and vice versa?',
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
    }
  ]
}" />

## Sources

<Sources :sources="[
  {
    title: 'Geospatial Analysis 6th Edition, 2021 update',
    author: 'spatialanalysisonline.com',
    url: 'https://spatialanalysisonline.com/HTML/index.html?tessellations_and_triangulatio.htm',
  },
  {
    title: '6.4 Geometric Primitives',
    author: 'PennState College of Earth and Mineral Sciences',
    url: 'https://www.e-education.psu.edu/geog160/node/1948',
  },
  {
    title: 'The Ultimate List of GIS Formats and Geospatial File Extensions',
    author: 'GISGeography',
    url: 'https://gisgeography.com/gis-formats/',
  },
  {
    title: 'Tessellation',
    author: 'Living Textbook',
    url: 'https://ltb.itc.utwente.nl/491/concept/79690',
  },
  {
    title: 'Overlay examples',
    author: 'Leaflet',
    url: 'https://leafletjs.com/examples/overlays/',
  },
]" />
