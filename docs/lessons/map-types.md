---
title: Types of maps
description: Find out how visual encoding allows geographers to produce thematic maps.
author: Omar Kawach
order: 4
---

# Types of maps

## Reference maps

**Reference maps** serve a general purpose. They can be found in the form of transit maps, topographic maps, road maps, hiking trail maps, and so on. Reference maps have no intended theme and only showed the location and names of features.

<ReferenceMap />

## Thematic maps

**Thematic maps**, unlike reference maps, serve a special purpose. Exploratory data analysis, for example, could be used to uncover patterns and relationships in spatial data. A thematic map's theme(s) are made up of a mix of marks, channels, quantitative and/or qualitative data, and sometimes even a base map that serves as a point of reference.

Thematic mapping channel selections are linked to the **expressiveness types** and **effectiveness ranks** principles. The expressiveness types principle seeks to match a data type with the appropriate channel. The effectiveness ranks principle simply argues that not all channels are created equal, and that certain channels have a higher importance than others.

<ContentFigure
  :imgSrc="'/assets/images/datatype.png'"
  :description="'Channel Ranking'"
  :anchorHref="'https://creativecommons.org/licenses/by-nc-sa/4.0/'"
  :anchorText="'Credit: PennState licensed under CC BY-ND 2.0'"
/>

## Types of thematic maps

**Choropleth maps** are useful for showing variability in data. A single classification scheme is required and statistical normalization may be necessary. This map type is quantitative, and may be of data type ordinal, interval or ratio. You might want to use choropleth mapping to depict population density, GDP per capita, DUIs per 10,000 persons, etc.
Proportional Symbol Maps show that the size of a single dot within a geographic region is based on the absolute magnitude of a quantity. This map type is quantitative, and may be of data type ordinal, interval or ratio.

**Graduated Symbol** Maps show that the size of a single dot within a geographic region based on the class of a quantity. This map type is quantitative, and may be of data type ordinal, interval or ratio. You might want to use graduated symbol mapping when your desired theme is a choropleth map, but the area attribute is not necessary.

**Diagram Symbol Maps** are useful for displaying a relationship between variables / attributes. This map type is quantitative and sometimes qualitative, and may be of data type nominal, ordinal, interval or ratio. You might want to use diagram symbol maps for comparing the number of post-secondary graduates by gender in each US State by use of a bar chart.

**Dot Density Maps** are useful for depicting the geographic distribution of a variable / attribute. Many dots within a geographic region, each portraying quantity. This map type is quantitative, and may be of data type ordinal, interval or ratio. You might want to use dot density maps for depicting the number of people within each US state.

**Chorochromatic Maps** are useful when there is no data hierarchy. This map type is qualitative, and is of data type categorical / nominal. You may want to use chorochromatic maps for identifying city zoning, water resource regions, and cover types.

**Multivariate Maps** are a combination of two or more themes.

## Exploration of thematic Maps

Now that you've learned how thematic maps are designed, it is time to explore and learn about the types of thematic maps. Here are some suggestions to consider as you explore:

- Can you identify which channels were used to create each of the thematic maps? The Channel Ranking figure could be useful.
- The dot density maps's view is set to World. Notice how the dots begin to indicate a different number of people when you zoom in to a Continent or Country level.
- There is no diagram symbol map below. However, you can find pie charts as one of the hospital shape styles in the [Visually encoded map](/lessons/visual-encoding) from the previous chapter. Despite the fact that the pie charts in the Visually Encoded Map contain meaningless data, they could, for example, represent each hospital's budget categories.

<calcite-carousel label="Maps" style="height: 600px;">
    <calcite-carousel-item label="Chorochromatic map">
        <ArcgisCalciteMap itemId="6748f56e0bb24ec5bbc6494687a3cca0" title="Chorochromatic map" :zoom=4 mapId="chorochromatic" />
    </calcite-carousel-item>
    <calcite-carousel-item label="Dot density map">
        <ArcgisCalciteMap itemId="b247e64a3d6a45ffaa63bbba12726db3" title="Dot density map" :zoom=2 mapId="dot"/>
    </calcite-carousel-item>
    <calcite-carousel-item label="Choropleth and symbol map">
        <ArcgisCalciteMap itemId="11e173a4e2f040ae80d39e44ee29467a" title="Choropleth and symbol map" :zoom=7.5 mapId="choropleth"/>
    </calcite-carousel-item>
</calcite-carousel>

## Test your knowledge

<Quiz
    :quiz-data="{
        questions: [
            {
            question: 'Based on the chorochromatic map, how many health authorities are there in British Columbia?',
            options: [
                {
                answer: '4',
                key: 1
                },
                {
                answer: '6',
                key: 2
                },
                {
                answer: '5',
                key: 3
                }
            ],
            correctAnswer: 3
            },
            {
            question: 'Which channel is the chorochromatic map using?',
            options: [
                {
                answer: 'Identity - Color hue',
                key: 1
                },
                {
                answer: 'Magnitude - Color luminance',
                key: 2
                },
                {
                answer: 'Magnitude - Color saturation',
                key: 3
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'What is the meaning of the darkest colour in the choropleth map scale?',
            options: [
                {
                answer: 'The darkest colour represents the lowest population density in the city of Ottawa',
                key: 1
                },
                {
                answer: 'The darkest colour represents the highest population density in Ottawa',
                key: 2
                }
            ],
            correctAnswer: 2
            },
            {
            question: 'At the Country level, how many people does a dot represent in the dot density map?',
            options: [
                {
                answer: '1 dot = 70,000 people',
                key: 1
                },
                {
                answer: '1 dot = 17,500 people',
                key: 2
                },
                {
                answer: '1 dot = 35,000 people',
                key: 3
                },
                {
                answer: '1 dot = 8,750 people',
                key: 4
                }
            ],
            correctAnswer: 2
            }
        ]
    }"
/>

## Sources

<Sources
    :sources="[
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
        {
            title: 'Thematic Map',
            author: 'Statistics Canada',
            url: 'https://www150.statcan.gc.ca/n1/pub/92-195-x/2011001/other-autre/theme/def-eng.htm#archived',
        },
        {
            title: 'Dot Distribution vs Graduated Symbols vs Proportional Symbol Maps',
            author: 'GISGeography',
            url: 'https://gisgeography.com/dot-distribution-graduated-symbols-proportional-symbol-maps/#:~:text=While%20proportional%20symbol%20maps%20scale,population%20into%204%20separate%20classes.',
        },
    ]"
/>
