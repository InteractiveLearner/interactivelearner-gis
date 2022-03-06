import React, { useState } from "react";

import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import BreadCrumbs from "../components/BreadCrumbs.jsx";
import Sources from "../components/Sources.jsx";
import ScaleMap from "../components/maps/ScaleMap.jsx";
import ProjectionExplorer from "../components/maps/ProjectionExplorer.jsx";

import "../../styles/map.css";

const sources = [
  {
    title: "Distortion - The GIS Encyclopedia",
    url: "http://wiki.gis.com/wiki/index.php/Distortion#:~:text=There%20are%20four%20main%20types,example%20is%20in%20cylindrical%20projections.",
  },
  {
    title: "Map Projections and Distortion - Hunter College",
    url: "http://www.geography.hunter.cuny.edu/~jochen/gtech361/lectures/lecture04/concepts/Map%20coordinate%20systems/Map%20projections%20and%20distortion.htm",
  },
  {
    title: "Projections - Intergovernmental Committee on Surveying and Mapping",
    url: "https://www.icsm.gov.au/education/fundamentals-mapping/projections",
  },
  {
    title: "Supported Map Projections - ArcMap",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Map Scale - Geography Realm",
    url: "https://www.geographyrealm.com/map-scale/",
  },
  {
    title: "Map Scale - Geokov",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Converting Between Scale Types - Metal Detecting World",
    url: "https://www.metaldetectingworld.com/convert_map_scale_p1.shtml ",
  },
  {
    title: "Map Scale, Directions - Western University",
    url: "https://instruct.uwo.ca/geog/2240/lecture2.htm",
  },
  {
    title: "Map Scale Calculator - Map Tools",
    url: "https://www.maptools.com/scale_calculator",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner",
    url: "https://github.com/omarkawach",
  },
];

function Projections() {
  const [crumbs, setCrumbs] = useState(["Projections and Scale"]);

  return (
    <MainLayout>
      <div>
        <Container maxWidth="sm" style={{ marginTop: "25px" }}>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {crumbs}
          </Typography>
          <BreadCrumbs crumbs={crumbs} />
        </Container>
      </div>
      <Container maxWidth="md" style={{ padding: "20px 0" }}>
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Projections
        </Typography>
        <div style={{ padding: "0px 16px 16px 16px" }}>
          When it comes to presenting maps to readers, geographers are
          challenged with selecting a projection based on the map's purpose and
          location. Projections transform three-dimensional curved surfaces to
          two-dimensional flat surfaces. Consequently, such transformations
          cause distortion to the maps. The 4 ways that the relationship between
          features on a map can be distorted or preserved include:
          <ol>
            <li>
              <b>Distance (Equidistant)</b>
            </li>
            <ul>
              <li>Preserves distance between features</li>
            </ul>
            <li>
              <b>True Direction (Azimuth)</b>
            </li>
            <ul>
              <li>Preserves direction between features</li>
              <li>Measured in degrees (°)</li>
            </ul>
            <li>
              <b>Shape / Angle (Conformal)</b>
            </li>
            <ul>
              <li>Cannot preserve shape and area at the same time</li>
              <li>Continents distorted</li>
            </ul>
            <li>
              <b>Area (Equal-Area)</b>
            </li>
            <ul>
              <li>Distorts distance and shape</li>
              <li>Preserves features to their exact size</li>
            </ul>
          </ol>
          Another important aspect to consider is the projection technique which
          impacts the Longitude (vertical lines) and Latitude (horizontal lines)
          on a map. The 3 main projection techniques are:
          <ol>
            <li>
              <b>Azimuthal (or Planar)</b>
            </li>
            <ul>
              <li>
                Increasingly distorted from the centre point (typically the
                South or North Pole as the centre point)
              </li>
              <li>
                Longitude lines appear equally spaced and straight which become
                increasingly radiant
              </li>
              <li>Latitude lines appear as equally spaced centric circles</li>
            </ul>
            <li>
              <b>Conical</b>
            </li>
            <ul>
              <li>Longitude lines appear as diverging</li>
              <li>Latitude lines appear circular around the poles</li>
            </ul>
            <li>
              <b>Cylindrical</b>
            </li>
            <ul>
              <li>
                Longitude lines appear straight, equally spaced, and parallel
              </li>
              <li>
                Latitude lines appear straight, and sometimes not consistently
                equally spaced
              </li>
            </ul>
          </ol>
          Now that you've gotten familiar with transformations, try out the
          projection explorer below! Notice that:
          <ul>
            <li>The Albers projection is conical and equal-area</li>
            <li>
              The Equirectangular projection is cylindrical and equidistant
            </li>
            <li>The Mercator projection is cylindrical and conformal</li>
            <li>
              The Mercator projection distorts the area of features which is why
              Greenland appears much larger than Africa
            </li>
          </ul>
          Side note: The spherical version of the Mercator projection is
          non-conformal and the de facto standard for web mapping.
        </div>
        <ProjectionExplorer />
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px", paddingTop: "16px" }}
        >
          Scale
        </Typography>
        <div style={{ padding: "0px 16px 16px 16px" }}>
          <p>
            As we've learned from transformations, there is no perfect
            representation of reality in mapping. When you use your favorite
            navigation service (e.g., Google Maps, Apple Maps, Bing Maps, etc.)
            to look up addresses or directions, the real world features you see
            cannot be drawn to their true size. Instead, these navigation
            services use a <b>graphic scale</b> to represent the measurable
            relationship between the map and the area observed. Similarly, GIS
            software such as QGIS and ArcGIS Pro use representative fractions (
            <b>ratio scale</b>) to represent this relationship. Representative
            fractions and graphic scales can both be read verbally as a{" "}
            <b>verbal scale</b>. However, representative fractions differ from
            graphic scales as representative fractions do not use units (e.g.,
            km, miles, etc.). Regardless of whether someone decides to use
            representative fractions or graphic scales, the level of detail
            shown is what matters most.
          </p>
          <p>
            The map you see below is a <b>small-scale</b> map of Victoria, BC.
            The map is considered small-scale due to covering a large geographic
            area, and showing a low level of detail. If you click the{" "}
            <b>large-scale</b> button in the map, you will see downtown Victoria
            with a high level of detail. As a result, you lose sight of
            municipality names but gain sight of street names and buildings.
          </p>

          <p>
            As you play with the interaction below, notice the real world units
            and length of the graphic scale change. Simply put:
            <ul>
              <li>
                When you select the small-scale button, the graphic scale's
                length (or map distance) is approximately 1 centimeter and it's
                ground distance is 2.5 kilometers.
                <ul>
                  <li>
                    Verbally: One centimeter corresponds to 2.5 kilometers
                  </li>
                  <li>
                    As a representative fraction: Convert 2.5 km to 250,000 cm
                    and divide 1 cm by 250,000 cm which gives you 1:250,000 or
                    1/250,000
                  </li>
                </ul>
              </li>
              <li>
                When you select the large-scale button, the graphic scale's map
                distance is approximately 1 centimeter and it's ground distance
                is 300 meters.
                <ul>
                  <li>Verbally: One centimeter corresponds to 300 meters</li>
                  <li>
                    As a representative fraction: Convert 300 m to 30,000 cm and
                    divide 1 cm by 30,000 cm which gives you 1:30,000 or
                    1/30,000
                  </li>
                  <ul>
                    <li>
                      If the map distance for the large-scale view was 0.75 cm,
                      the representative fraction would be 1:40,000
                    </li>
                  </ul>
                </ul>
              </li>
            </ul>
          </p>
        </div>
        <ScaleMap />
      </Container>
      <Sources sources={sources} />
      {/* TODO: Turn into component */}
      <Container maxWidth="md" style={{ padding: "10px 0" }}>
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Authors
        </Typography>
        <Grid
          container
          spacing={4}
          style={{ paddingLeft: "16px", paddingTop: "16px" }}
        >
          {authors.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                style={{
                  flexDirection: "column",
                  height: "100%",
                  display: "flex",
                }}
              >
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {card.author}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    style={{ background: "#2E3B55" }}
                    size="small"
                    color="primary"
                    href={card.url}
                    variant="contained"
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default Projections;
