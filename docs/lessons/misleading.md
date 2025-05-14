---
title: Misleading maps
description: Find out how map making decisions can mislead and/or lie to readers.
author: Omar Kawach
---

# Misleading maps

By {{ $frontmatter.author }}

Every map reflects decisions someone made about what to show, what to leave out, and how to present it. Whether intentional or careless, our choices can shape our worldview in ways we may not notice. Occasionally, they can even mislead us.

## Scale

[Scale](/lessons/scale) controls what gets shown—and what gets left out. A large-scale map (like a neighborhood street map) gives detail but omits broader context. A small-scale map (like a national or continental map) shows the big picture but hides local nuance. 

**Example:** At a small scale, would you be able to tell that downtown Victoria, BC, has a Chinatown?

<ScaleMap />

## Data

Without context, raw numbers can be misleading. Normalizing data by population size, density, or other factors promotes fairer comparisons. 
A map of total COVID-19 cases without per capita adjustment may make a large, rural city look worse than a densely packed city. Other factors, like retirement home numbers, can affect local case rates. 
While perfection isn't possible, ignoring variables can lead to flawed conclusions, while including them in analysis provides a more nuanced and truthful picture.

**Example:** In the [choropleth](/lessons/map-types#types-of-thematic-maps) map below, the visualization begins with raw numbers of US state populations.
You can normalize by population density (population divided by area in square kilometers) with one of the filter options in the map's left side panel.
You can also play around with the classification methods and color schemes to see how they affect the map.

<ClassifiedMap/>

### False correlations

Just because two things appear together on a map doesn’t mean they’re connected. A map that displays obesity rates alongside fast-food locations may appear to exhibit a pattern, but it might not establish a causal relationship. Without proper analysis, it’s just a guess. 

Check out the [spatial statistics](/lessons/spatial-stats) chapter for more.

## Projection

Every map [projection](/lessons/projections) causes some kind of distortion. While preserving shapes, the Mercator projection makes regions close to the poles appear larger than they actually are, giving Greenland (shown in orange below) the impression that it is larger than Africa. And while equal-area projections correct for size distortion, they cause shape distortion.

<MisleadingProjection />

## Theme

[Design choices](/lessons/visual-encoding) matter. For example, red might suggest danger or urgency, and color gradients and shading, if unbalanced, can exaggerate trends and change perception. Symbol size can misrepresent importance—larger circles draw attention, even if the data doesn’t justify it. These visual tricks change the story a map tells.

The choropleth map below of Vancouver, BC displays graffiti counts in different areas, with darker red indicating higher counts and lighter yellow indicating lower counts. 
The theming suggests southern and western parts have higher graffiti incidence, but this is misleading due to the reversed color ramp. 
In actuality, the central and northeastern parts of Vancouver have a higher graffiti incidence compared to the southern and western regions.

Click the button on the top right of the map to reverse the color ramp.

<MisleadingTheme />

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'What is a key difference between large-scale and small-scale maps?',
            options: [
                {
                answer: 'Large-scale maps cover more area with less detail',
                key: 1
                },
                {
                answer: 'Small-scale maps show greater local detail',
                key: 2
                },
                {
                answer: 'Large-scale maps provide more detail in a smaller area',
                key: 3
                },
                {
                answer: 'Small-scale maps have no distortion',
                key: 4
                }
            ],
            correctAnswer: 3
            },
            {
            question: 'A map showing total COVID-19 cases without adjusting for population size can lead to misleading interpretations.',
            options: [
                {
                answer: 'True',
                key: 1
                },
                {
                answer: 'False',
                key: 2
                }
            ],
            correctAnswer: 1
            },
            {
            question: 'Fill in the blank. The __________ projection exaggerates the size of landmasses near the poles, such as making Greenland appear the size of Africa.',
            options: [
                {
                answer: 'Albers',
                key: 1
                },
                {
                answer: '1:150,000 or 1/150,000',
                key: 2
                },
                {
                answer: 'Transverse mercator',
                key: 3
                },
                {
                answer: 'Mercator',
                key: 4
                }
            ],
            correctAnswer: 4
            }
        ]
    }" 
/>

## Sources

<Sources 
    :sources="[
        {
            title: '7. Lying With Maps',
            author: 'Eric Deluca and Sara Nelson',
            url: 'https://open.lib.umn.edu/mapping/chapter/7-lying-with-maps/',
        }
    ]"
/>