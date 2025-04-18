---
title: Remote sensing
description: Earth observation through active and passive remote sensing
author: Omar Kawach
order: 3
---

::: warning
Interactive examples are a work in progress for this page.
:::

# Remote sensing

By {{ $frontmatter.author }}

The science of gathering data about the Earth's surface without making direct physical contact is known as [remote sensing](https://en.wikipedia.org/wiki/Remote_sensing), and it depends on the detection and measurement of electromagnetic energy. 

Passive and active energy sources are a basic approach to classifying remote sensing systems. 
Remote sensing is useful for environmental monitoring, disaster response, resource management, and countless other applications.

Both active and passive sensors are deployed on various platforms, including satellites, which orbit the Earth at different altitudes (e.g., low Earth orbit), and aerial platforms like airplanes and drones, which offer more localized and often higher spatial resolution data acquisition.

<ContentFigure
  :imgSrc="'/assets/images/active-passive-remote-sensing.png'"
  :description="'Passive versus active'"
  :anchorHref="'https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/remote-sensing'"
  :anchorText="'Credit: NASA Earthdata'"
/>

## Spatial resolution

[Spatial resolution](https://en.wikipedia.org/wiki/Spatial_resolution) is the amount of detail that can be discerned in a remote sensing [raster](/lessons/spatial-data#types-of-spatial-data) image. 
It is frequently described in terms of the smallest distinguishable feature on the ground. 
Higher spatial resolution shows finer detail and smaller resolvable objects.

You can consider an image to be composed of a grid of pixels.
The low resolution grid below is composed of fewer, larger cells/pixels, meaning each pixel covers a larger area on the ground. 
This results in less detail, making it harder to distinguish between smaller features. 

<ContentFigure
  :imgSrc="'/assets/images/spatial_resolution.png'"
  :description="'Spatial resolution'"
  :anchorHref="'https://openverse.org/image/80007498-4292-4197-89f5-ee032a032a28?q=spatial+resolution&p=1'"
  :anchorText="'Credit: Morrisccs, licensed under CC BY 4.0 (modified)'"
/>

## Passive remote sensing

[Passive remote sensing](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/passive-remote-sensing) systems detect Earth-emitted or reflected electromagnetic radiation, with sunlight and thermal being the primary natural energy sources.

### Natural energy sources

#### Sunlight

The sun is the primary energy source for passive remote sensing, emitting a wide spectrum of electromagnetic radiation, including white light. 
Passive sensors measure the reflection of this sunlight from surface features. 
However, sunlight has limitations such as time-of-day constraints and cloud coverage, which make it unsuitable for continuous data acquisition. 
Longer wavelengths like infrared and microwave can mitigate these issues, but their energy is weaker, resulting in lower spatial resolution.

<ContentFigure
  :imgSrc="'/assets/images/EM_spectrum.png'"
  :description="'Electromagnetic spectrum'"
  :anchorHref="'https://commons.wikimedia.org/wiki/File:EM_spectrum_updated.svg'"
  :anchorText="'Credit: Mathmensch, licensed under CC Attribution-Share Alike 3.0 Unported '"
/>

#### Thermal energy

Earth emits thermal infrared electromagnetic radiation due to its temperature, allowing passive sensors to map temperature variations across its surface. 
This information helps understand phenomena like urban heat islands, volcanic activity, and ocean currents.

### Sensors

Passive remote sensing systems use various types of sensors to capture different parts of the electromagnetic spectrum, each suited for specific applications.

#### Multispectral

[Multispectral](https://en.wikipedia.org/wiki/Multispectral_imaging) sensors provide information about the reflectance or emittance characteristics of different surface features and are commonly used for land cover classification, vegetation monitoring, and environmental change detection. 

<ContentFigure
  :imgSrc="'/assets/images/multispectral.png'"
  :description="'Multispectral'"
  :anchorHref="'https://commons.wikimedia.org/wiki/File:Multispectral_imaging_graph.svg'"
  :anchorText="'Credit: Hunster, licensed under CC BY 4.0 (modified)'"
/>

#### Hyperspectral

[Hyperspectral](https://en.wikipedia.org/wiki/Multispectral_imaging) sensors collect data in hundreds or thousands of very narrow, contiguous spectral bands, ideal for applications such as mineral exploration, agricultural crop analysis, and water quality assessment.

<ContentFigure
  :imgSrc="'/assets/images/hyperspectral.png'"
  :description="'Hyperspectral'"
  :anchorHref="'https://commons.wikimedia.org/wiki/File:Hyperspectral_imaging_graph.svg'"
  :anchorText="'Credit: Hunster, licensed under CC BY 4.0 (modified)'"
/>

#### Thermal imaging

[Thermal imaging](https://en.wikipedia.org/wiki/Thermal_remote_sensing) sensors detect and measure thermal infrared radiation, allowing for the creation of thermal maps depicting temperature differences on the Earth's surface.

## Active remote sensing

[Active remote sensing](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/active-remote-sensing) systems generate their own source of electromagnetic energy and measure the energy that is reflected or backscattered from the Earth's surface, making them particularly valuable for nighttime observations or in areas with persistent cloud cover. Key examples of active remote sensing technologies include 

### LiDAR

[LiDAR](https://en.wikipedia.org/wiki/Lidar) (light detection and ranging) uses laser pulses to measure distances to the Earth's surface, generating highly accurate three-dimensional models. 

### RADAR

[RADAR](https://en.wikipedia.org/wiki/Radar) (radio detection and ranging) instruments transmit microwave pulses and analyze the backscattered signal to obtain information about surface roughness, moisture content, and elevation.

### SAR
  
[SAR](https://en.wikipedia.org/wiki/Synthetic-aperture_radar) (synthetic aperture radar) is an advanced form of radar that utilizes the motion of the sensor platform to synthesize a larger antenna, resulting in higher spatial resolution imagery.

## Applications of remote sensing

Remote sensing data, acquired through both passive and active means, enables a wide range of applications, including land cover classification, the [Normalized Difference Vegetation Index](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index) (NDVI), and the [urban heat island](https://en.wikipedia.org/wiki/Urban_heat_island) effect. Passive multispectral and hyperspectral imagery are fundamental for land cover classification, while NDVI quantifies vegetation greenness and health based on red and near-infrared bands. These sensors help researchers and urban planners identify areas experiencing the most intense heat, understand contributing factors, and develop mitigation strategies to improve urban sustainability and human health.

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'Which of the following is an example of an active remote sensing system?',
            options: [
                {
                answer: 'Multispectral sensor',
                key: 1
                },
                {
                answer: 'Thermal imaging sensor',
                key: 2
                },
                {
                answer: 'LiDAR',
                key: 3
                },
                {
                answer: 'Hyperspectral sensor',
                key: 4
                }
            ],
            correctAnswer: 3
            },
            {
            question: 'Remote sensing involves making direct physical contact with the Earth\'s surface to gather data.',
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
            correctAnswer: 2
            },
            {
            question: 'Higher spatial resolution in a remote sensing image means that smaller features on the ground can be distinguished.',
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
            question: 'Passive remote sensing systems generate their own source of electromagnetic energy.',
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
            correctAnswer: 2
            }
        ]
    }" 
/>
