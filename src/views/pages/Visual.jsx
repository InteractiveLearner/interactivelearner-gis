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
import questions from "../questions/VisualEncoding.json";
import { themeMUI } from "../../styles/themeMUI";

import { MDXProvider } from "@mdx-js/react";
import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import { ThemeProvider } from "theme-ui";
import { themeMDX } from "../../styles/themeMDX";
import Content from "../content/VisualEncoding.mdx";

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
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function Visual() {
  return (
    <MainLayout>
      <Title crumbs={"Visual Encoding"} />
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
