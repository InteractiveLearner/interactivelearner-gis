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
import Question from "../../components/Question.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import md from "../content/Projections.md";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

const projectionQuestions = [
  {
    question: "The Albers projection uses which technique and type?",
    answer: "Conical and Equal Area",
  },
  {
    question: "The Equirectangular projection uses which technique and type?",
    answer: "Cylindrical and Equidistant",
  },
  {
    question: "The Mercator projection uses which technique and type?",
    answer: "Cylindrical and Conformal",
  },
  {
    question:
      "The Mercator projection distorts the area of features. Can you identify which features are heavily distorted?",
    answer: "One example is Greenland appearing much larger than Africa",
  },
  {
    question:
      "The spherical version of which projection is the de facto standard for web mapping?",
    answer: "Mercator projection, however non-conformal in this case",
  },
];

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

          <ContentBuilder Content={md} />

          <Typography gutterBottom variant="h3" sx={theme.header}>
            Test Your Knowledge
          </Typography>

          <Question questions={projectionQuestions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
