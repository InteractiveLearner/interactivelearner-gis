import React from "react";

import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f0ead2", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Interactive Learner
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Contribute on {" "}
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
      Copyright ©{" "} Interactive Learner GIS 2022
      </Typography>
    </Box>
  );
}
