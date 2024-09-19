<img src="https://github.com/InteractiveLearner/interactivelearner-gis/blob/main/public/logo192.png" width="192px" height="192px" />

# Interactive Learner GIS

[![Issues Open](https://img.shields.io/github/issues/InteractiveLearner/interactivelearner-gis?style=flat-square)](https://github.com/InteractiveLearner/interactivelearner-gis/issues) [![Project License](https://img.shields.io/github/license/InteractiveLearner/interactivelearner-gis?style=flat-square)](https://github.com/InteractiveLearner/interactivelearner-gis/blob/main/LICENSE)

Your one-stop shop for all things GIS! Easily learn about GIS in an interactive environment. 

## Demo

**[Live Link](https://www.interactivelearner-gis.com/ )**

## Motivation
Mapmakers use maps as a form of graphical communication. Map readers (such as yourself) vary in levels of map literacy. To bridge the gap between mapmakers and map readers, the site aims to promote map literacy and critical thinking by concentrating on improving map reader spatial inquiry competencies in an interactive / storytelling self-paced GIS learning environment. The site is meant to be open source and act as a knowledge base that contributors can build upon. 

## Curriculum

Have a chapter idea? Look below on [how to contribute](https://github.com/InteractiveLearner/interactivelearner-gis#how-to-contribute). 

The incomplete chapters are mentioned in the [Issues](https://github.com/InteractiveLearner/interactivelearner-gis/issues) tab under the *Content* label. 

- [x] [Projections](https://www.interactivelearner-gis.com/projections)
- [x] [Scale](https://www.interactivelearner-gis.com/scale)
- [x] [Visual Encoding](https://www.interactivelearner-gis.com/visual)
- [x] [Types of Maps](https://www.interactivelearner-gis.com/thematic)
- [x] [Classification Schemes](https://www.interactivelearner-gis.com/classification)
- [x] [Spatial Autocorrelation Statistics](https://www.interactivelearner-gis.com/spatial-stats)
- [ ] Lying with Maps
- [x] [Spatial data and its types](https://www.interactivelearner-gis.com/spatial-data)
    - Will touch on geometric primitives
- [ ] Spatial Analysis
- [ ] Web GIS
- [ ] Relational databases

## Planned features for a better learning experience

The incomplete features are mentioned in the [Issues](https://github.com/InteractiveLearner/interactivelearner-gis/issues) tab under the *Enhancement* label. 

- [ ] Implement report system using local storage to track user progress
- [ ] Grade tracking system to assess learning (also local storage)
- [ ] Support multiple languages
- [ ] Pagination
- [ ] Table of contents
- [x] Consistent styling between desktop and mobile

## How to contribute

### Developers and content writers

Create an issue and / or make a pull request. A GitHub account is required.

##### Clone the application

```
git clone https://github.com/InteractiveLearner/interactivelearner-gis.git
```

##### Package manager

It is recommended to use [pnpm](https://pnpm.io/) for this project. 

##### Run the application

```
pnpm install
pnpm start 
```

##### Build the application

```
pnpm build
```

##### Publish the application to GitHub Pages

```
pnpm deploy
```

### Other contributors 

Email me at omarkawach@outlook.com with any resources, feedback or ideas you'd like to share. If you do not have a GitHub account, I can upload and credit you for any content you wish to contribute. 

## Technologies

### Deployment
- [Vercel](https://vercel.com/docs)

### Tooling

- [Vite](https://vitejs.dev/)

### Web design
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Dash Components](https://www.npmjs.com/package/@didyoumeantoast/dash-components)

### Content writing and documentation
- [MDX JS](https://mdxjs.com/)
- [Markdown](https://daringfireball.net/projects/markdown/syntax)

### Data visualization
- [d3js](https://d3js.org/)

### Geospatial
- [GeoPandas](https://geopandas.org/en/stable/)
- [React Leaflet](https://react-leaflet.js.org/)
- [QGIS](https://qgis.org/en/site/)
- [ArcGIS Pro](https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview)
- [ArcGIS Online Map Viewer](https://doc.arcgis.com/en/arcgis-online/get-started/get-started-with-mv.htm)

## Author

[Omar Kawach](https://github.com/omarkawach)

## Contributors

[Jeff Menke](https://github.com/jmanke)
  
## Credits and acknowledgements

Under the supervision of [Dr. Charles Perin](http://charlesperin.net/), I developed this website for my capstone project at the [University of Victoria](https://www.uvic.ca/).

## License (GPL) 

Released under the [GNU General Public License, version 3](https://opensource.org/licenses/GPL-3.0). To protect against theft and promote free open source software, any developers making use of this repository must release their changes under the same license. 

## Dataset sources

**[Hospitals from Open Ottawa](https://open.ottawa.ca/datasets/b769ce497f2540aa962e602c983994d6_0?geometry=-76.050%2C45.348%2C-75.396%2C45.433)**

**[Road Network Files from Statistics Canada](https://www12.statcan.gc.ca/census-recensement/2011/geo/RNF-FRR/index-eng.cfm)**

**[Ottawa Wards from Open Ottawa](https://open.ottawa.ca/datasets/wards/explore?location=45.242656%2C-75.800844%2C0.90)**

**[Health Authority Boundaries from BC Data Catalogue](https://catalogue.data.gov.bc.ca/dataset/health-authority-boundaries)**

**[2016 Census Wards Excel from Open Ottawa](https://open.ottawa.ca/documents/2016-census-ward-data-1/about)**

**[State Population Totals for 2010-2019 from the United States Census Bureau]()**

## Icons

**[SeekPNG](https://www.seekpng.com/ks/clipart/)**