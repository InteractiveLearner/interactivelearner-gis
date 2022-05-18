/**
 * Footer.jsx replaces the HTML <footer> tag for one
 * built using Material UI.
 */
import React from "react";

import {
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
  box: {
    backgroundColor: "#e5e5e5",
    p: 6,
  },
});

theme = responsiveFontSizes(theme);

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={theme.box} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Interactive Learner GIS
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Learn how to {" "}
          <a
            style={{ color: "inherit" }}
            href="https://www.interactivelearner-gis.com/#/contribute"
            target="_blank"
            rel="noreferrer"
          >
            contribute
          </a>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Source code available on{" "}
          <a
            style={{ color: "inherit" }}
            href="https://github.com/InteractiveLearner/interactivelearner.github.io"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Copyright © Interactive Learner GIS 2022
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
