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

- "Where": Referring to the location of the data
- "What": Referring to the information about the data

## Types of spatial data

Spatial data can be categorized into two types: raster and vector.

Raster data are described as a grid of cells (rows and columns), similar to pixels in pictures.

- Each cell contains a value representing a specific characteristic of a studied geography
- Commonly used for continuous data, like land use, temperature or elevation (e.g., Digital Elevation Models or DEMs, which consist of elevation values)
- Raster data are stored as a grid of cells, with each cell having a unique value based on its x, y, and z coordinates within the grid
- Can be either continuous (progressive, varying data) or discrete (thematic or categorical)
- Rectangular tessellated rasters are most commonly used due to their mathematical simplicity
- Examples of raster data include satellite images or aerial photos
- Most commonly seen in the GeoTIFF file format

Vector data are represented as points, lines, and polygons.

- Commonly used for representing discrete or categorical data, such as political boundaries, roads, or land cover
- Stored as sets of x, y coordinate pairs defining point locations, or as series of coordinates defining vertices of lines or polygons
- Can be categorized into 0-dimensional, 1-dimensional, and 2-dimensional forms (geometric primitives). In the 0th dimension, coordinate points exist independently. In the 1st dimension, two points can form a line. In the 2nd dimension, three or more lines can be joined to create a polygon
- Vector data allows for more efficient storage and manipulation
- Can convert vectors to raster and vice versa using specialized software (e.g., ArcGIS Pro, and QGIS)
- Common data formats include CSV, KML (Google), GeoJSON, and Shapefile (Esri)

<ContentFigure 
   :imgSrc="'/assets/images/vector_raster.png'" 
   :description="'Comparing real world data to types of spatial data'"
   :anchorHref="'http://www.geography.hunter.cuny.edu/~jochen/gtech361/lectures/lecture05/concepts/03%20-%20Geographic%20data%20models.html'"
   :anchorText="'Credit: CUNY Department of Geography and Environmental Science'"
/>

## Compare vector and raster data

Interaction coming soon

## Compare elevation maps

Interaction coming soon

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
]" />
