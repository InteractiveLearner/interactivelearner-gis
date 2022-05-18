/**
 * ContentBuilder.jsx is used for the "Learn and Interact"
 * section of each chapter. This component reads and formats markdown files 
 * that may also possess JSX and any additional overrides.
 */

import React from "react";

import {
  Typography,
  ThemeProvider,
  Card,
  CardMedia,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import Markdown from "markdown-to-jsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Add custom components as overrides
import ContentFigure from "./Figure.jsx";

// Add custom maps as overrides
import "../styles/map.css";
import EmptyMap from "../maps/EmptyMap.jsx";
import ProjectionExplorer from "../maps/ProjectionExplorer.jsx";
import ScaleMap from "../maps/ScaleMap.jsx";
import VisualVariables from "../maps/VisualVariables.jsx";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  contentHeader: {
    color: "#bc6c25",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
  },
  markdown: {
    padding: "0px 20px",
  },
});

theme = responsiveFontSizes(theme);

export default function ContentBuilder(props) {
  const [Content, setContent] = React.useState("");

  fetch(props.Content)
    .then((response) => response.text())
    .then((text) => setContent(text));

  return (
    <ThemeProvider theme={theme}>
      <Card elevation={3} sx={theme.card}>
        <Markdown
          sx={theme.markdown}
          children={Content}
          options={{
            overrides: {
              SyntaxHighlighter: (props) => {
                return (
                  <SyntaxHighlighter language={props.language} style={docco}>
                    {props.children}
                  </SyntaxHighlighter>
                );
              },
              EmptyMap: {
                component: EmptyMap,
              },
              ProjectionExplorer: {
                component: ProjectionExplorer,
              },
              ScaleMap: {
                component: ScaleMap,
              },
              VisualVariables: {
                component: VisualVariables,
              },
              ContentFigure: (props) => {
                // All images used must be saved locally. 
                // See the contribution page on the site.
                return (
                  <ContentFigure
                    img={require("../assets/images/" + props.img)}
                    title={props.title}
                    credit={props.credit}
                    url={props.url}
                  />
                );
              },
              CardMedia: (props) => {
                return (
                  <CardMedia
                    component="iframe"
                    title={props.title}
                    style={{
                      margin: "auto",
                      border: 0,
                    }}
                    height={props.height}
                    image={props.url}
                  />
                );
              },
              img: (props) => {
                // All images used must be saved locally. 
                // See the contribution page on the site.
                return (
                  <img
                    src={require("../assets/images/" + props.src)}
                    alt={props.alt}
                  />
                );
              },
              h1: (props) => {
                return (
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={theme.contentHeader}
                  >
                    {props.children[0]}
                  </Typography>
                );
              },
              a: (props) => {
                return (
                  <a
                    style={{ textDecoration: "none", color: "#dda15e" }}
                    href={props.href}
                  >
                    {props.children.join("")}
                  </a>
                );
              },
            },
            namedCodesToUnicode: {
              // Add more unicode here
              le: "\u2264",
              ge: "\u2265",
              copy: "\u00A9",
            },
          }}
        />
      </Card>
    </ThemeProvider>
  );
}
