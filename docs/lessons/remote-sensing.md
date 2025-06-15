---
title: Remote sensing
description: Earth observation through active and passive remote sensing
authors:
  - name: Omar Kawach
    url: https://www.linkedin.com/in/omarkawach/
date: 2025-06-15
order: 3
---

# Remote sensing

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

## Types of resolutions

Remote sensing systems can be classified based on their spatial, spectral, temporal, and radiometric resolutions.

### Spatial  

[Spatial resolution](https://en.wikipedia.org/wiki/Spatial_resolution) is the amount of detail that can be discerned in a remote sensing [raster](/lessons/spatial-data#types-of-spatial-data) image. 
It is frequently described in terms of the smallest distinguishable feature on the ground. 
Higher spatial resolution shows finer detail and smaller resolvable objects.

You can consider an image to be composed of a grid of pixels.
Each pixel within an image represents a small square of the ground surface. 
While the spatial resolution of a sensor remains constant, the pixel size can be adjusted to represent either smaller or larger ground areas. 
The low resolution grid below is composed of fewer, larger cells/pixels, meaning each pixel covers a larger area on the ground. 
This results in less detail, making it harder to distinguish between smaller features. 

<ContentFigure
  :imgSrc="'/assets/images/spatial_resolution.png'"
  :description="'Spatial resolution'"
  :anchorHref="'https://openverse.org/image/80007498-4292-4197-89f5-ee032a032a28?q=spatial+resolution&p=1'"
  :anchorText="'Credit: Morrisccs, licensed under CC BY 4.0 (modified)'"
/>

### Spectral 

[Spectral resolution](https://en.wikipedia.org/wiki/Spectral_resolution) refers to the width of the electromagnetic spectrum regions that a sensor can detect. 
This allows for the identification of materials using distinctive spectral signatures. 
The particular features or materials being observed—such as differentiating bodies of water or examining human infrared emissions—determine the optimal spectral resolution.

### Radiometric 

[Radiometric resolution](https://en.wikipedia.org/wiki/Satellite_imagery#:~:text=Radiometric%20resolution) refers to a sensor's ability to detect very small differences in energy. 
A sensor with finer radiometric resolution is more sensitive to subtle variations in reflected or emitted energy. 
This characteristic is directly related to the sensor's [bit depth](https://en.wikipedia.org/wiki/Bit_depth).

### Temporal 

[Temporal resolution](https://en.wikipedia.org/wiki/Temporal_resolution) refers to the discrete frequency with which a sensor acquires measurements over a specific area in relation to time. 
Temporal resolution is influenced by the sensor's swath width, configuration, and orbital characteristics.

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
- High energy (short wavelength, high frequency) and cannot penetrate aerosol
- Can be used for topographic mapping, vegetation analysis, and urban planning

### RADAR

[RADAR](https://en.wikipedia.org/wiki/Radar) (radio detection and ranging) instruments transmit microwave pulses and analyze the backscattered signal to obtain information about surface roughness, moisture content, and elevation.
- Low energy (long wavelength, lower frequency) and can penetrate aerosol
- Can be used for surface moisture estimation, and precipitation monitoring

### SAR
  
[SAR](https://en.wikipedia.org/wiki/Synthetic-aperture_radar) (synthetic aperture radar) is an advanced form of radar that utilizes the motion of the sensor platform to synthesize a larger antenna, resulting in higher spatial resolution imagery.
- High resolution through motion and able to penetrate clouds
- Can be used for topographic mapping and land cover classification

## Applications of remote sensing

Remote sensing data, acquired through both passive and active means, enables a wide range of applications, including land cover classification, the [Normalized Difference Vegetation Index](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index) (NDVI), and the [urban heat island](https://en.wikipedia.org/wiki/Urban_heat_island) effect. Passive multispectral and hyperspectral imagery are fundamental for land cover classification, while NDVI quantifies vegetation greenness and health based on red and near-infrared bands. These sensors help researchers and urban planners identify areas experiencing the most intense heat, understand contributing factors, and develop mitigation strategies to improve urban sustainability and human health.

## Explore the urban heat island effect in Montreal, Quebec

The urban heat island (UHI) describes the common phenomenon of urban areas being warmer in temperature than their semirural surroundings, though the presence of significant canopy cover and green infrastructure in some cities can lessen or counteract this effect (i.e., cool islands). 

In the example below, the City of Montreal is shown to have a significant UHI effect, with the hottest areas (in red) being located in the downtown core and other densely populated areas. The data used for the 2020 UHI GeoJSON vector layer was sourced from [Données Québec](https://www.donneesquebec.ca/recherche/dataset/vmtl-ilots-de-chaleur). [Vector data](/lessons/spatial-data#vector-data) is easier to work with for this kind of thematic mapping on the web. 

However, for analyzing the UHI, [surface thermography](https://donnees.montreal.ca/dataset/thermographie-surface) is crucial to maps heat patterns. Données Québec, for example, created Montreal's heat island maps by combining surface thermography, and LiDAR. LiDAR airborne and satellite imagery provided the City of Montreal's [digital surface model (DSM)](https://en.wikipedia.org/wiki/Digital_elevation_model). This imagery is generally distributed in ([Geo](https://en.wikipedia.org/wiki/GeoTIFF))[TIFF](https://en.wikipedia.org/wiki/TIFF) format.

[Lossless](https://en.wikipedia.org/wiki/Lossless_compression) TIFF is preferable for scientific analysis than [JPEG](https://en.wikipedia.org/wiki/JPEG) since it preserves data and image quality, which is highly beneficial for accurate pixel temperature readings.
High quality TIFF raster images are essential for in-depth spatial analysis of heat distribution and change detection, allowing [principal component analysis](https://spss.espaceweb.usherbrooke.ca/analyse-en-composantes-principales-2/) to compare thermal behavior over time, but they are less suitable for interactive web-based demonstrations than vector data. 

This is more apparent when you look at an imprecise geo-rectified image of Montreal West's surface thermography taken at night in 2016, shown below.

<RasterUHI />

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
            },
            {
            question: 'Urban heat island effect can be measured with the help of LiDAR and surface thermography.',
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
            }
        ]
    }" 
/>

## Sources

<Sources 
  :sources="
    [{
        title: 'Urban Geographicots',
        author: 'Climate Central',
        url: 'https://www.climatecentral.org/climate-matters/urban-heat-islands-2023',
    },
    {
        title: 'What data can be stored in a GeoTIFF file?',
        author: 'Blue Marble Geographics',
        url: 'https://www.bluemarblegeo.com/blog/about-geotiff-format/',
    }]"
/>

