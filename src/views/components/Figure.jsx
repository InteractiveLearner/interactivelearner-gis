import React from "react";

import { Typography, Box, Card, CardMedia } from "@mui/material";

export default function Footer(props) {
  return (
    <Card
      elevation={3}
      style={{
        padding: "0px 8px 8px 8px",
        margin: "0px 20px 20px 20px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={props.img} />
        <Box
          sx={{
            bottom: 0,
            left: 0,
            width: "100%",
            color: "black",
            padding: "0px 10px 0px 10px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ typography: { sm: "h6", xs: "subtitle2" } }}
          >
            Cylinder, Cone, and Plane
          </Typography>
          <Typography variant="caption">
            Credit: PennState licensed under{" "}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY-ND 2.0
            </a>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
