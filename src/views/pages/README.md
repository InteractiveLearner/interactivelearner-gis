# Pages

## Basic Template

Anytime you want to add a new page, it should follow this format. 

```
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

import content from "../content/NameOfFile.md";
import questions from "../questions/NameOfFile.json";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
});

theme = responsiveFontSizes(theme);

const sources = [
  {
    title: "",
    author: "",
    url: "link here",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function ComponentName() {
  return (
    <MainLayout>
      <Title crumbs={"ComponentName"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Learn and Interact
          </Typography>
          <ContentBuilder Content={md} />

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
```