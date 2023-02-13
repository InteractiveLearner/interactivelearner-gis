/**
 * Header.jsx displays information at the top of the page.
 * Right now only the site name is there, but eventually the
 * plan is to access grades and progress reports from the <AppBar>
 */
import React from "react";

import { Link } from "react-router-dom";

import { Public } from "@mui/icons-material";

import {
  Typography,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
  link: {
    color: "white",
    textDecoration: "none",
  },
  background: {
    background: "#0a0908",
  },
  icon: {
    minWidth: "40px",
  },
});

theme = responsiveFontSizes(theme);

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" sx={theme.background}>
        <Toolbar to="/#" component={Link} sx={theme.link}>
          <Public sx={theme.icon} />
          <Typography variant="h6"> Interactive Learner GIS</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
