import React from "react";

import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import Title from "../../components/Title.jsx";
import ContentBuilder from "../../components/ContentBuilder.jsx";
import Quiz from "../../components/Quiz.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import content from "../content/Projections.md";
import questions from "../questions/Projections.json";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

// Add true or false question

const sources = [
  {
    title: "Distortion",
    author: "The GIS Encyclopedia",
    url: "http://wiki.gis.com/wiki/index.php/Distortion#:~:text=There%20are%20four%20main%20types,example%20is%20in%20cylindrical%20projections.",
  },
  {
    title: "Map Projections and Distortion",
    author: "Hunter College",
    url: "http://www.geography.hunter.cuny.edu/~jochen/gtech361/lectures/lecture04/concepts/Map%20coordinate%20systems/Map%20projections%20and%20distortion.htm",
  },
  {
    title: "Projections",
    author: "Intergovernmental Committee on Surveying and Mapping",
    url: "https://www.icsm.gov.au/education/fundamentals-mapping/projections",
  },
  {
    title: "Supported Map Projections",
    author: "ArcMap",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Characteristics of Projections",
    author: "PennState College of Earth and Mineral Sciences",
    url: "https://www.e-education.psu.edu/geog486/node/675",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function Projections() {
  return (
    <MainLayout>
      <Title crumbs={"Projections"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Learn and Interact
          </Typography>
          <ContentBuilder Content={content} />

          <Typography gutterBottom variant="h3" sx={theme.header}>
            Test Your Knowledge
          </Typography>
          <Quiz questions={questions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
