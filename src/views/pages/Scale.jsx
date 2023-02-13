import React from "react";

import {
  Typography,
  Container,
  ThemeProvider as ThemeProviderMUI,
  Card,
} from "@mui/material";
import MainLayout from "../layouts/MainLayout";

import Title from "../../components/Title.jsx";
import Quiz from "../../components/Quiz.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";
import questions from "../questions/Scale.json";
import { themeMUI } from "../../styles/themeMUI";

import { MDXProvider } from "@mdx-js/react";
import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import { ThemeProvider } from "theme-ui";
import { themeMDX } from "../../styles/themeMDX";
import Content from "../content/Scale.mdx";

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
      <ThemeProviderMUI theme={themeMUI}>
        <Container maxWidth="lg" style={{ padding: "20px 0 0" }}>
          <Typography gutterBottom variant="h3" sx={themeMUI.header}>
            Learn and Interact
          </Typography>

          <Card elevation={3} sx={themeMUI.card}>
            <ThemeProvider theme={themeMDX}>
              <MDXProvider components={useThemedStylesWithMdx()}>
                <Content />
              </MDXProvider>
            </ThemeProvider>
          </Card>

          <Typography gutterBottom variant="h3" sx={themeMUI.header}>
            Test Your Knowledge
          </Typography>
          <Quiz questions={questions} />
        </Container>
      </ThemeProviderMUI>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
