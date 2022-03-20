import React from "react";

import { Public } from "@mui/icons-material";

import { Typography, AppBar, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="relative" style={{ background: '#283618' }}>
      <Toolbar>
        <Public style={{minWidth: '40px'}}/>
        <Typography variant="h6"> Interactive Learner - GIS</Typography>
      </Toolbar>
    </AppBar>
  );
}
