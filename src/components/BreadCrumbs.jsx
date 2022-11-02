/**
 * BreadCrumbs.jsx tells users the page's location 
 * in terms of the website hierarchy
 */ 
import React from "react";

import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  Typography,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();

theme = responsiveFontSizes(theme);

export default function BreadCrumbs(props) {
  return (
    <ThemeProvider theme={theme}>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link
          underline="hover"
          to="/"
          style={{ textDecoration: "none", color: "#152403" }}
        >
          Home
        </Link>
        <Typography>{props.crumbs}</Typography>
      </Breadcrumbs>
    </ThemeProvider>
  );
}
