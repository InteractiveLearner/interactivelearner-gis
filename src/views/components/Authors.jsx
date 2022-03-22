import React from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Grow,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
    typography: { sm: "h3", xs: "h5" },
  },
  card: {
    flexDirection: "column",
    display: "flex",
    padding: "0px 6px 6px 6px",
    margin: "0px 20px 20px 0px",
  },
  cardContent: {
    padding: "8px 0px 8px 8px",
  },
  author: {
    typography: { sm: "h6", xs: "subtitle2" },
  },
  description: {
    typography: { sm: "body1", xs: "body2" },
  },
});

export default function Authors(props) {
  return (
    <ThemeProvider theme={theme}>
      <Grow in={true} timeout={1000}>
        <Container maxWidth="md" style={{ padding: "10px 0" }}>
          <Typography sx={theme.header} gutterBottom>
            Authors
          </Typography>
          <Grid container spacing={4} style={{ paddingLeft: "16px" }}>
            {props.authors.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card elevation={3} sx={theme.card}>
                  <CardContent sx={theme.cardContent} style={{ flexGrow: 1 }}>
                    <Typography gutterBottom sx={theme.author}>
                      {card.author}
                    </Typography>
                    <Typography sx={theme.description}>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ background: "#283618" }}
                      size="small"
                      color="primary"
                      href={card.url}
                      variant="contained"
                    >
                      View Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grow>
    </ThemeProvider>
  );
}
