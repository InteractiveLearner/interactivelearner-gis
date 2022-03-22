import React from "react";

import {
  Container,
  Typography,
  Grow,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
    typography: { sm: "h3", xs: "h5" },
  },
  author: {
    typography: { sm: "body1", xs: "body2" },
  },
  card: {
    padding: "0px 16px 16px 16px",
    margin: "0px 20px 20px 20px",
    minWidth: "20px",
  },
  title: {
    typography: { sm: "h6", xs: "subtitle2" },
  },
});

export default function Sources(props) {
  return (
    <ThemeProvider theme={theme}>
      <Grow in={true} timeout={1000}>
        <Container maxWidth="md" style={{ padding: "10px 0" }}>
          <Typography sx={theme.header} gutterBottom>
            Sources
          </Typography>
          <Grid container spacing={4} style={{ padding: "16px" }}>
            {props.sources.map((card, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                style={{
                  paddingTop: "8px",
                }}
              >
                <Card
                  key={index}
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <CardActionArea
                    href={card.url}
                    sx={{
                      ".MuiCardActionArea-focusHighlight": {
                        opacity: "0.05",
                      },
                    }}
                  >
                    <CardContent style={{ flexGrow: 1 }}>
                      <Typography gutterBottom sx={theme.title}>
                        {card.title}
                      </Typography>
                      <Typography sx={theme.author}>{card.author}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grow>
    </ThemeProvider>
  );
}
