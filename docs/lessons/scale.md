---
title: Scale
description: Explore how map scale can be used to hide and show details on a map.
author: Omar Kawach
---

# {{ $frontmatter.title }}

By {{ $frontmatter.author }}

## Scale types

As we've seen with projections, mapping isn't a perfect depiction of reality. When you use your favourite navigation service to look up locations or directions (e.g., Google Maps, Apple Maps, Bing Maps, etc. ), the real-world features you see cannot be drawn to their proper scale. These navigation services, on the other hand, use a **graphic scale** to indicate the measurable relationship between the map and the area being examined. Similarly, GIS tools such as QGIS and ArcGIS Pro portray this relationship using representative fractions (**ratio scale**). Both representative fractions and graphic scales can be read aloud as a **verbal scale**. However, representative fractions differ from graphic scales in that they do not employ units (e.g., km, miles, etc.). Regardless of whether representative fractions or graphic scales are used, the level of detail shown is what matters most.

## Scale sizes

The level of detail on a map is determined by the scale size. In **small-scale** maps, a lot of ground is covered in a large geographic area and at a low level of detail whereas **large-scale** maps cover small geographic areas with a high level of detail. In the figure below, the small-scale map of Victoria depicts the entire region, neighborhoods, and major road networks. In contrast, the large-scale map of Victoria depicts the downtown core, street names, more labels and outline of buildings.

<ContentFigure 
   :imgSrc="'/assets/images/scale.png'" 
   :description="'Small scale versus large scale Victoria, BC'"
/>

## Scale map

The view of Victoria, BC below is displayed in small-scale by default. The buttons to change scale are on the bottom right of the map. Notice how the real-world units and length of the graphic scale (bottom left of the map) vary as you move around and zoom in / out of the map.

<ScaleMap />

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'When you select the small-scale button, what is the graphic scale\'s length (or map distance) and ground distance?',
            options: [
                {
                answer: 'The map distance is approximately 1 centimeter and the ground distance is 2 miles',
                key: 1
                },
                {
                answer: 'The map distance is approximately 1 centimeter and the ground distance is 2 kilometers',
                key: 2
                }
            ],
            correctAnswer: 2
            },
            {
            question: 'When you select the small-scale button, what is the verbal scale?',
            options: [
                {
                answer: 'One centimeter corresponds to 2 kilometers',
                key: 1
                },
                {
                answer: 'One centimeter corresponds to 2 miles',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'When you select the small-scale button, what is the ratio scale? Hint: Convert ___ km to ___ cm and then divide 1 cm by ___ cm',
            options: [
                {
                answer: '1:200,000 or 1/200,000',
                key: 1
                },
                {
                answer: '1:150,000 or 1/150,000',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'When you select the large-scale button, what is the graphic scale\'s length (or map distance) and ground distance?',
            options: [
                {
                answer: 'The map distance is approximately 1 centimeter and the ground distance is 300 meters',
                key: 1
                },
                {
                answer: 'The map distance is approximately 1 centimeter and the ground distance is 300 feet',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'When you select the small-scale button, what is the verbal scale?',
            options: [
                {
                answer: 'One centimeter corresponds to 300 meters',
                key: 1
                },
                {
                answer: 'One centimeter corresponds to 300 feet',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'When you select the small-scale button, what is the ratio scale? Hint: Convert ___ km to ___ cm and then divide 1 cm by ___ cm',
            options: [
                {
                answer: '1:30,000 or 1/30,000',
                key: 1
                },
                {
                answer: '1:60,000 or 1/60,000',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'If the map distance for the large-scale button\'s view was 0.75 cm, what would the ratio scale be?',
            options: [
                {
                answer: '1:20,000 or 1/20,000',
                key: 1
                },
                {
                answer: '1:40,000 or 1/40,000',
                key: 2
                }
            ],
            correctAnswer: 2
            }
        ]
    }" 
/>

## Sources

<Sources 
  :sources="
    [{
        title: 'Map Scale',
        author: 'Geokov',
        url: 'https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm',
    },
    {
        title: 'Converting Between Scale Types',
        author: 'Metal Detecting World',
        url: 'https://www.metaldetectingworld.com/convert_map_scale_p1.shtml ',
    },
    {
        title: 'Map Scale, Directions',
        author: 'Western University',
        url: 'https://instruct.uwo.ca/geog/2240/lecture2.htm',
    },
    {
        title: 'Map Scale Calculator',
        author: 'Map Tools',
        url: 'https://www.maptools.com/scale_calculator',
    }]"
/>
