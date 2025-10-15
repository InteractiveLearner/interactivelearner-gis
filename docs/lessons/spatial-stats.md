---
title: Spatial autocorrelation statistics
description: Understand how spatial autocorrelation statistics can help you analyze spatial data.
authors:
  - name: Omar Kawach
    url: https://www.linkedin.com/in/omarkawach/
date: 2025-06-15
order: 9
---

::: warning
Interactive examples are a work in progress for this page.
:::

# Spatial autocorrelation statistics

## What is spatial autocorrelation statistics?

Spatial autocorrelation statistics in geographic information systems (GIS) assess relationships between variable values at different locations, measuring similarity or dissimilarity based on distance. 
They identify patterns like clustering or dispersion, aiding fields such as environmental science, urban planning, and epidemiology.
For example, if the values of a variable are clustered together in one area and dispersed in another, this may indicate a relationship between the variable and other spatial factors, such as socioeconomic status or natural resources.

## Types of spatial autocorrelation statistics

There are two main types of spatial autocorrelation statistics: **global** statistics and **local** statistics. 
Global statistics, like [**Global Moran's I**](https://en.wikipedia.org/wiki/Moran%27s_I), summarize the overall pattern of spatial autocorrelation in a dataset. 
In contrast, local statistics, such as **Local Moran's I**, provide information on the spatial autocorrelation of values within specific geographic areas.

## Considerations

Spatial autocorrelation statistics follow **Tobler's first law of Geography** ([TFL](https://en.wikipedia.org/wiki/Tobler%27s_first_law_of_geography)) where near things are more related than distant things.
When conducting statistical analysis, the outcome of the correlation coefficient from Moran's I can explain the relationship between two values (or multiple locations).
The relationship between two values ([bivariate](https://en.wikipedia.org/wiki/Bivariate_analysis)) can either be by chance or correlated. 
This is where you would reject or accept a hypothesis and show that the distribution is/isn't random, which is the same as cause and effect in data. 

### Moran's I

Moran's I generally describes a measure of spatial autocorrelation, indicating the degree to which a set of spatial data points are clustered, dispersed, or randomly distributed.
Global Moran's I measures how clustered or dispersed values are in a dataset/study area. 
Local Moran's I can be used to identify specific spatial clusters or outliers within a dataset.

<ContentFigure
  :imgSrc="'/assets/images/moran_formula.svg'"
  :description="'Formula for Moran\'s I'"
  :anchorHref="'https://en.wikipedia.org/wiki/Moran%27s_I'"
  :anchorText="'Credit: Wikipedia'"
/>

In the formula for Moran's I, ( **N** ) represents the number of regions or spatial units, and ( **W** ) represents the sum of all [weights](https://geodacenter.github.io/workbook/4a_contig_weights/lab4a.html#spatial-weights---basic-concepts). 
There are different weight matrices such as queen contiguity, rook contiguity, distance, and k-nearest neighbors.

The output of Moran's I ranges between -1 and +1, where a positive value indicates similar values are found together, a negative value (which is rare) indicates dissimilar values are found together, and a value of 0 means the distribution is random with no spatial autocorrelation. 

<ContentFigure
  :imgSrc="'/assets/images/p-z-value.png'"
  :description="'Spatial autocorrelation analysis'"
  :anchorHref="'https://www.researchgate.net/publication/305954162_Spatial_cluster_analysis_of_Crimean-Congo_hemorrhagic_fever_virus_seroprevalence_in_humans_Greece'"
  :anchorText="'Credit: Anna Papa, Persefoni Sidira, Andreas Tsatsaris'"
/>

Additionally, measuring significance is important, as p-values determine the probability of spatial autocorrelation/null hypothesis being true, and z-scores indicate the likelihood that the data is spatially autocorrelated.
You can calculate the p-value by comparing random distributions of data to the observed data (a low p-value is desirable), and the z-score by comparing the observed data to the mean and standard deviation of the random distributions (a high absolute value is desirable).

Distance decay is another factor to consider, as Moran's I decreases when more distant observations are included in the calculations, thus having less influence.

#### Local indicators of spatial association (LISA)

A LISA cluster map uses Local Moran's I to inform where things are concentrated (hot spot, relationship likely not by chance) and where they are not (cold spot).
Spatial clusters in LISA indicate areas where similar values (high or low) are grouped together, while spatial outliers highlight areas where a value significantly differs from its surrounding values.

Spatial clusters
- high high (red) indicates a high concentration within itself and surrounding areas
- low low (blue) indicates a low concentration when surrounding areas have more concentration

Spatial outliers
- high low (light red) indicates a high concentration when surrounding areas have low concentration
- low high (light blue) indicates a low concentration when surrounding areas have high concentration

### Spatiotemporal dependence (space and time)

The two most challenging aspects of spatial statistics, or GIS in general, are space and time.
Consider that the weather at one location is likely to be similar to the weather of a nearby location, but the weather at both locations is also likely to change over time.
Spatiotemporal dependence combines both spatial dependence and temporal dependence.
Spatial dependence signifies that values of a variable at one location can depend on values of that same variable at other locations.
It's worth mentioning that there are issues related to spatial dependance that impact statistical tests:

- Modifiable Areal Unit Problem ([MAUP](https://en.wikipedia.org/wiki/Modifiable_areal_unit_problem)) can introduce bias
    - Boundaries impact statistical tests (most importantly, look at standard deviation)
    - Location of boundaries used to aggregate data can influence results of statistical tests (Moran's I)
    - Gerrymandering is a good example of this
    <ContentFigure
        :imgSrc="'/assets/images/gerrymandering.png'"
        :anchorHref="'https://www.scientificamerican.com/article/geometry-reveals-the-tricks-behind-gerrymandering/'"
        :anchorText="'Credit: Spektrum der Wissenschaft/Manon Bischoff'"
    />
- [Ecological fallacy](https://en.wikipedia.org/wiki/Ecological_fallacy) can result in weak inferences
    - Individuals vs populations
    - Cant take aggregated results and apply them to individuals
    - Statistical test results change based on data aggregation
- Sampling methods such as [random](https://www.scribbr.com/methodology/simple-random-sampling/), [stratified random](https://www.scribbr.com/methodology/stratified-sampling/#:~:text=What%20is%20stratified%20sampling%3F,using%20another%20probability%20sampling%20method.), and [systematic sampling](https://www.scribbr.com/methodology/systematic-sampling/) can dictate sampling bias
    - For a good amount of spatial representation and to avoid bias, use stratified random sampling
- [Boundary problem](https://en.wikipedia.org/wiki/Boundary_problem_(spatial_analysis)) might lead to loss of information

## Interaction

Coming soon

## Test your knowledge

<Quiz
    :quiz-data="{
        questions: [
            {
            question: 'Gerrymandering is an example of which type of spatial analysis?',
            options: [
                {
                'answer': 'Spatial autocorrelation',
                'key': 1
                },
                {
                'answer': 'MUAP',
                'key': 2
                }
            ],
            correctAnswer: 2
            },
            {
            question: 'Which sampling method introduces no bias?',
            options: [
                {
                answer: 'Random sampling',
                key: 1
                },
                {
                answer: 'Systematic sampling',
                key: 2
                },
                {
                answer: 'Stratified random sampling',
                key: 3
                }
            ],
            correctAnswer: 3
            }
        ]
    }"
/>

## Sources

<Sources
    :sources="[
        {
            title: 'FOSS for performing spatial autocorrelation statistics',
            author: 'GeoDa',
            url: 'https://geodacenter.github.io/',
        },
        {
            title: 'Spatial Regression with GeoDa ',
            author: 'GeoDa',
            url: 'https://s4.ad.brown.edu/Resources/Tutorial/Modul2/GeoDa3FINAL.pdf',
        },
        {
            title: 'Geographic Data Science with Python',
            author: 'Sergio J. Rey, Dani Arribas-Bel, Levi J. Wolf',
            url: 'https://geographicdata.science/book/intro.html',
        },
        {
            title: 'Chapter 13 Spatial Autocorrelation',
            author: 'Manuel Gimond',
            url: 'https://mgimond.github.io/Spatial/spatial-autocorrelation.html',
        },
    ]"
/>
