/**
 * Header.jsx displays information at the top of the page. 
 * Right now only the site name is there, but eventually the
 * plan is to access grades and progress reports from the <AppBar>
 */
import React from "react";

import { Public } from "@mui/icons-material";

import {
  Typography,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();

theme = responsiveFontSizes(theme);

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" style={{ background: "#283618" }}>
        <Toolbar>
          <Public style={{ minWidth: "40px" }} />
          <Typography variant="h6"> Interactive Learner GIS</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
