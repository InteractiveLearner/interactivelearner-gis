import React from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from "@mui/material";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  card: {
    flexDirection: "column",
    display: "flex",
    padding: "0px 6px 6px 6px",
    margin: "0px 20px 20px 0px"
  },
  cardContent: {
    padding: "8px 0px 8px 8px",
  },
});

theme = responsiveFontSizes(theme);

export default function Authors(props) {
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "10px 0" }}>
          <Typography variant="h3" sx={theme.header} gutterBottom>
            Authors
          </Typography>
          <Grid container spacing={4} style={{ paddingLeft: "16px" }}>
            {props.authors.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card elevation={3} sx={theme.card}>
                  <CardContent sx={theme.cardContent} style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6">
                      {card.author}
                    </Typography>
                    <Typography variant="body1">{card.description}</Typography>
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
    </ThemeProvider>
  );
}
