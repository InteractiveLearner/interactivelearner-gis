import React from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  card: {
    padding: "0px 16px 16px 16px",
    margin: "0px 20px 20px 20px",
    minWidth: "20px",
  },
});

theme = responsiveFontSizes(theme);

export default function Sources(props) {
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "10px 0" }}>
          <Typography variant="h3" sx={theme.header} gutterBottom>
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
                      <Typography gutterBottom variant="h6">
                        {card.title}
                      </Typography>
                      <Typography variant="body1">{card.author}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </ThemeProvider>
  );
}
