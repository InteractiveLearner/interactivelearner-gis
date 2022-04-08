import React from "react";

import {
  Typography,
  Box,
  Card,
  CardMedia,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
  card: {
    padding: "8px 8px 8px 8px"
  },
  box: {
    bottom: 0,
    left: 0,
    width: "100%",
    color: "black",
    padding: "0px 10px 0px 10px",
  },
});

theme = responsiveFontSizes(theme);

export default function Footer(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card elevation={3} sx={theme.card}>
        <Box sx={{ position: "relative" }}>
          <CardMedia component="img" image={props.img} />
          <Box sx={theme.box}>
            <Typography variant="h6">{props.title}</Typography>
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
    </ThemeProvider>
  );
}
