/* Title.jsx is a basic title with some theming */
import React from "react";

import BreadCrumbs from "../components/BreadCrumbs.jsx";

import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();

theme = responsiveFontSizes(theme);

export default function Title(props) {
  return (
    <div>
      <ThemeProvider theme={theme}>
          <Container maxWidth="sm" style={{ marginTop: "25px" }}>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h2"
            >
              {props.crumbs}
            </Typography>
            <BreadCrumbs crumbs={props.crumbs} />
          </Container>
      </ThemeProvider>
    </div>
  );
}
