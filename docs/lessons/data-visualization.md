---
title: Data visualization
description: Learn about the main building blocks of visual encoding / data visualization.
authors:
  - name: Omar Kawach
    url: https://www.linkedin.com/in/omarkawach/
date: 2025-06-15
order: 1
---

# Data visualization

Cartography is considered a graphical form of communication. Communicating with maps would not be possible without the main building blocks for the visual encoding of [vector data](/lessons/spatial-data#types-of-spatial-data). The main building blocks for visual encoding are **marks** and **channels**. 

## Marks

Marks are a set of geometric primitives made up of:

1. **Points**
   - Represent locational information
     - A single point with X, Y coordinates (Cartesian coordinate system)
     - A single point with latitude, longitude coordinates (geographic coordinate system)
     - A single point with an address
     - E.g., Houses, hospitals, restaurants, etc.
2. **Lines**
   - Represent a connection with measurable length
     - Two vertices can be connected by a line to form a route
     - E.g., Highways, trails, bus routes, etc.
3. **Areas**
   - Represent a boundary with measurable area
     - Three vertices can be closed with two lines to form a boundary
     - E.g., Municipal boundaries, lakes, parks, etc.

<ContentFigure 
   :imgSrc="'/assets/images/marks.png'" 
   :description="'Types of marks'"
   :anchorHref="'https://creativecommons.org/licenses/by-nc-sa/4.0/'"
   :anchorText="'Credit: PennState licensed under CC BY-ND 2.0'"
/>

## Channels

The appearance of marks can be manipulated using channels:

1. **Position**
   - Change in X and/or Y position
2. **Color**
   - Color hue
     - Primary and secondary colors
   - Color luminance (or brightness)
     - The lightness or darkness of a color
   - Color saturation
     - How vivid or washed-out a color appears
3. **Shape**
   - Change in shape, which there are an infinite number of
   - Glyphs are considered a part of this channel
     - E.g., Egyptian hieroglyphs, and other typographic characters or symbols.
4. **Tilt**
   - Change in Angle and/or Alignment
5. **Size**
   - Change in Length, Area, and/or Volume

<ContentFigure 
   :imgSrc="'/assets/images/channels.png'" 
   :description="'Types of channels'"
   :anchorHref="'https://creativecommons.org/licenses/by-nc-sa/4.0/'"
   :anchorText="'Credit: PennState licensed under CC BY-ND 2.0'"
/>

## Visually encoded map

Now that you've learned about visual encoding, play around with the map below to see which marks and channels are displayed, as well as the data they contain. You can alter the style of the points by pressing the bottom-right button.

<VisualVariables />

## Test your knowledge

<Quiz :quiz-data="{
  questions: [
    {
      question: 'When you hovered over a hospital, was the location information represented as an address or latitude, longitude coordinate?',
      options: [
        {
          answer: 'Address',
          key: 1
        },
        {
          answer: 'Latitude, longitude coordinate',
          key: 2
        }
      ],
      correctAnswer: 1
    },
    {
      question: 'When you hovered over a ward, was the size represented as a length, area, or volume?',
      options: [
        {
          answer: 'Length',
          key: 1
        },
        {
          answer: 'Area',
          key: 2
        },
        {
          answer: 'Volume',
          key: 3
        }
      ],
      correctAnswer: 2
    },
    {
      question: 'When you hovered over a highway, was the size represented as a length, area, or volume?',
      options: [
        {
          answer: 'Length',
          key: 1
        },
        {
          answer: 'Area',
          key: 2
        },
        {
          answer: 'Volume',
          key: 3
        }
      ],
      correctAnswer: 1
    },
    {
      question: 'The Hospitals dataset possesses which mark and channels?',
      options: [
        {
          answer: 'Point, Position, Color, and Shape',
          key: 1
        },
        {
          answer: 'Point, Position, Color, Tilt, and Shape',
          key: 2
        },
        {
          answer: 'Point, Position, Color, Tilt, Area, and Shape',
          key: 3
        }
      ],
      correctAnswer: 1
    },
    {
      question: 'Though a hospital could change in shape an infinite number of times, how many shape styles did you count in the Visually Encoded Map? (on desktop browsers)',
      options: [
        {
          answer: '6',
          key: 1
        },
        {
          answer: '3',
          key: 2
        },
        {
          answer: '2',
          key: 3
        },
        {
          answer: '4',
          key: 4
        }
      ],
      correctAnswer: 4
    }
  ]
}" />

## Sources

<Sources :sources="[
  {
    title: 'Visualization Analysis and Design',
    author: 'Tamara Munzner',
    url: 'https://www.cs.ubc.ca/~tmm/vadbook/',
  },
  {
      title: 'Jacques Bertin\'s Semiology of Graphics',
      author: 'Information Visuals',
      url: 'https://www.informationvisuals.com/information-design-theory/jacques-bertins-semiology-of-graphics',
  },
  {
    title: 'Geometric Primitive',
    author: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Geometric_primitive',
  },
  {
    title: 'Visual Variables',
    author: 'infovis-wiki',
    url: 'https://infovis-wiki.net/wiki/Visual_Variables',
  },
]" />