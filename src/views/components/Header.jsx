import React from "react";

import { Public } from "@mui/icons-material";

import { Typography, AppBar, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="relative" style={{ background: '#1D3557' }}>
      <Toolbar>
        <Public style={{minWidth: '40px'}}/>
        <Typography variant="h6"> Interactive Learner</Typography>
      </Toolbar>
    </AppBar>
  );
}
