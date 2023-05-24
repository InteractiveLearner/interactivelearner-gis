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
import questions from "../questions/MapTypes.json";
import { themeMUI } from "../../styles/themeMUI";

import { MDXProvider } from "@mdx-js/react";
import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import { ThemeProvider } from "theme-ui";
import { themeMDX } from "../../styles/themeMDX";
import Content from "../content/MapTypes.mdx";

const sources = [
  {
    title: "Visualization Analysis and Design",
    author: "Tamara Munzner",
    url: "https://www.cs.ubc.ca/~tmm/vadbook/",
  },
  {
    title: "Visual Representation from Semiology of Graphics by J. Bertin",
    author: "Sheelagh Carpendale",
    url: "https://innovis.cpsc.ucalgary.ca/innovis/uploads/Courses/InformationVisualizationDetails/09Bertin.pdf",
  },
  {
    title: "Geometric Primitive",
    author: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Geometric_primitive",
  },
  {
    title: "Visual Variables",
    author: "infovis-wiki",
    url: "https://infovis-wiki.net/wiki/Visual_Variables",
  },
  {
    title: "Thematic Map",
    author: "Statistics Canada",
    url: "https://www150.statcan.gc.ca/n1/pub/92-195-x/2011001/other-autre/theme/def-eng.htm#archived",
  },
  {
    title: "Map",
    author: "วราภรณ์ มูลวงศ์",
    url: "https://sites.google.com/site/boardinclassrom/map/chorochromatic-map",
  },
  {
    title: "Dot Distribution vs Graduated Symbols vs Proportional Symbol Maps",
    author: "GISGeography",
    url: "https://gisgeography.com/dot-distribution-graduated-symbols-proportional-symbol-maps/#:~:text=While%20proportional%20symbol%20maps%20scale,population%20into%204%20separate%20classes.",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function MapTypes() {
  return (
    <MainLayout>
      <Title crumbs={"Types of Maps"} />
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
