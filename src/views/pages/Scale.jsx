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

import md from "../content/Scale.md";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

const scaleQuestions = [
  {
    question:
      "When you select the small-scale button, what is the graphic scale's length (or map distance) and ground distance?",
    answer:
      "The map distance is approximately 1 centimeter and the ground distance is 2 kilometers",
  },
  {
    question:
      "When you select the small-scale button, what is the verbal scale?",
    answer: '"One centimeter corresponds to 2 kilometers"',
  },
  {
    question:
      "When you select the small-scale button, what is the ratio scale?",
    answer:
      "1:200,000 or 1/200,000.\nCalculation: Convert 2 km to 200,000 cm and then divide 1 cm by 200,000 cm",
  },
  {
    question:
      "When you select the large-scale button, what is the graphic scale's or map distance and ground distance?",
    answer:
      "The map distance is approximately 1 centimeter and the ground distance is 300 meters",
  },
  {
    question:
      "When you select the large-scale button, what is the verbal scale?",
    answer: '"One centimeter corresponds to 300 meters"',
  },
  {
    question:
      "When you select the large-scale button, what is the ratio scale?",
    answer:
      "1:30,000 or 1/30,000.\nCalculation: Convert 300 m to 30,000 cm and then divide 1 cm by 30,000 cm",
  },
  {
    question:
      "If the map distance for the large-scale button's view was 0.75 cm, what would the ratio scale be?",
    answer: "1:40,000 or 1/40,000",
  },
];

const sources = [
  {
    title: "Map Scale",
    author: "Geography Realm",
    url: "https://www.geographyrealm.com/map-scale/",
  },
  {
    title: "Map Scale",
    author: "Geokov",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Converting Between Scale Types",
    author: "Metal Detecting World",
    url: "https://www.metaldetectingworld.com/convert_map_scale_p1.shtml ",
  },
  {
    title: "Map Scale, Directions",
    author: "Western University",
    url: "https://instruct.uwo.ca/geog/2240/lecture2.htm",
  },
  {
    title: "Map Scale Calculator",
    author: "Map Tools",
    url: "https://www.maptools.com/scale_calculator",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function Scale() {
  return (
    <MainLayout>
      <Title crumbs={"Scale"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Learn and Interact
          </Typography>

          <ContentBuilder Content={md} />

          <Typography gutterBottom variant="h3" sx={theme.header}>
            Test Your Knowledge
          </Typography>

          <Question questions={scaleQuestions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
