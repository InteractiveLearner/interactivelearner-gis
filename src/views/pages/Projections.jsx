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
import EmptyMap from "../components/maps/EmptyMap.jsx";
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
            <li>Distance (Equidistant)</li>
            <ul>
              <li>Preserves distance between features</li>
            </ul>
            <li>True Direction (Azimuth)</li>
            <ul>
              <li>Preserves direction between features</li>
              <li>Measured in degrees (°)</li>
            </ul>
            <li>Shape / Angle (Conformal)</li>
            <ul>
              <li>Cannot preserve shape and area at the same time</li>
              <li>Continents distorted</li>
            </ul>
            <li>Area (Equal-Area)</li>
            <ul>
              <li>Distorts distance and shape</li>
              <li>Preserves features to their exact size</li>
            </ul>
          </ol>
          Another important aspect to consider is the projection technique which
          impacts the Longitude (vertical lines) and Latitude (horizontal lines)
          on a map. The 3 main projection techniques are:
          <ol>
            <li>Azimuthal (or Planar)</li>
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
            <li>Conical</li>
            <ul>
              <li>Longitude lines appear as diverging</li>
              <li>Latitude lines appear circular around the poles</li>
            </ul>
            <li>Cylindrical</li>
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
            <li>The Mercator projection is cylindrical, and conformal</li>
            <li>
              The Mercator projection distorts the area of features which is why Greenland
              appears much larger than Africa
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
          Get familiar with the UI. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Est ullamcorper eget nulla facilisi etiam dignissim.
          Interdum consectetur libero id faucibus nisl tincidunt eget. Elit
          pellentesque habitant morbi tristique senectus et. Commodo odio aenean
          sed adipiscing diam donec adipiscing tristique. Quisque egestas diam
          in arcu cursus euismod. Lectus nulla at volutpat diam ut venenatis
          tellus in metus. Donec pretium vulputate sapien nec sagittis aliquam
          malesuada bibendum arcu. Vitae auctor eu augue ut lectus arcu. Ipsum
          dolor sit amet consectetur. Pulvinar pellentesque habitant morbi
          tristique senectus et netus et. Odio ut enim blandit volutpat maecenas
          volutpat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a
          scelerisque purus. Tellus rutrum tellus pellentesque eu tincidunt
          tortor aliquam nulla facilisi. Vulputate enim nulla aliquet porttitor.
          Praesent tristique magna sit amet. Consequat mauris nunc congue nisi
          vitae suscipit.
        </div>
        <EmptyMap />
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
                    to={card.url}
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
