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

import md from "../content/Template.md";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

const Questions = [
  {
    question: "Question",
    answer: "Answer",
  },
];

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
      <Title crumbs={"Template Page"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0px 0px 0px" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Title
          </Typography>
          <ContentBuilder Content={md} />
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Test Your Knowledge
          </Typography>
          <Question questions={Questions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
