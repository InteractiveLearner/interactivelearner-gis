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

import md from "../content/Contribute.md";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

const sources = [
  {
    title: "markdown-it demo",
    author: "markdown-it",
    url: "https://markdown-it.github.io/",
  },
  {
    title: "React Syntax Highlighter Demo",
    author: "React Syntax Highlighter",
    url: "https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function Resources() {
  return (
    <MainLayout>
      <Title crumbs={"Contribute"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0px 0px 0px" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            How to Contribute
          </Typography>
          <ContentBuilder Content={md} />

        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
