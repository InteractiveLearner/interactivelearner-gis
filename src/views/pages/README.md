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
import questions from "../questions/NameOfFile.json";
import { themeMUI } from "../../styles/themeMUI";

import { MDXProvider } from "@mdx-js/react";
import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import { ThemeProvider } from "theme-ui";
import { themeMDX } from "../../styles/themeMDX";
import Content from "../content/NameOfFile.mdx";


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
```