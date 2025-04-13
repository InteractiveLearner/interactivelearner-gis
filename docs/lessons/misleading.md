---
title: Misleading maps
description: Find out how map making decisions can mislead readers.
author: Omar Kawach
---

::: warning
Interactive examples are a work in progress for this page.
:::

# Misleading maps

By {{ $frontmatter.author }}

Every map reflects decisions someone made about what to show, what to leave out, and how to present it. Whether intentional or careless, our choices can shape our worldview in ways we may not notice. Occasionally, they can even mislead us.

## Scale

Scale controls what gets shown—and what gets left out. A large-scale map (like a neighborhood street map) gives detail but omits broader context. A small-scale map (like a national or continental map) shows the big picture but hides local nuance.

<!-- Copy / paste scale map? -->

## Data

Without context, raw numbers can be misleading. Normalizing data by population size, density, or other factors promotes fairer comparisons. 
A map of total COVID-19 cases without per capita adjustment may make a large, rural city look worse than a densely packed city. Other factors, like retirement home numbers, can affect local case rates. 
While perfection isn't possible, ignoring these variables can lead to flawed conclusions, while including them in analysis provides a more nuanced and truthful picture.

<!-- Compare normalized to non normalized choropleth map? -->

### False Correlations

Just because two things appear together on a map doesn’t mean they’re connected. A map that displays obesity rates alongside fast-food locations may appear to exhibit a pattern, but it might not establish a causal relationship. Without proper analysis, it’s just a guess.

## Projection

All map projections cause some form of distortion. The Mercator projection preserves shapes but exaggerates the size of areas near the poles—making Greenland look the size of Africa. Equal-area projections address size distortion but distort shapes. The projection chosen reflects a priority—and influences perception.

## Theme

Design choices matter. For example, red might suggest danger or urgency, and color gradients and shading, if unbalanced, can exaggerate trends and change perception. Symbol size can misrepresent importance—larger circles draw attention, even if the data doesn’t justify it. These visual tricks change the story a map tells.

<!-- Have an example that messed with color -->

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
