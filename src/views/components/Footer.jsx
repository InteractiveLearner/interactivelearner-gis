import React from "react";

import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Interactive Learner
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        View the code on {" "}
        <a
          style={{ color: "inherit" }}
          href="https://github.com/InteractiveLearner/gis"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </Typography>
    </Box>
  );
}
