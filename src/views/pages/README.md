# Pages

## Basic Template

Anytime you want to add a new page, it should follow this format. 

```jsx
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
import Quiz from "../../components/Quiz.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import { MDXProvider } from "@mdx-js/react";
import Content from "../content/NameOfFile.mdx";
import questions from "../questions/NameOfFile.json";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
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
          
          <Card elevation={3} sx={theme.card}>
            <MDXProvider>
              <Content />
            </MDXProvider>
          </Card>

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