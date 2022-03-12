import React from "react";

import { Typography, Box, Card, CardMedia } from "@mui/material";

export default function Footer(props) {
  return (
    <Card
      elevation={3}
      style={{
        padding: "8px 8px 8px 8px",
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
            {props.title}
          </Typography>
          {(() => {
            if (props.credit !== "") {
              return (
                <Typography variant="caption">
                  <a href={props.url} style={{ color: "black" }}>
                    {props.credit}
                  </a>
                </Typography>
              );
            }
          })()}
        </Box>
      </Box>
    </Card>
  );
}
