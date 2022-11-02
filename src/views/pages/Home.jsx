import React from "react";

import { Link } from "react-router-dom";

import {
  Typography,
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

let theme = createTheme({
  header: {
    color: "#606c38",
  },
});

theme = responsiveFontSizes(theme);

const cards = [
  {
    title: "Projections",
    description:
      "Discover the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
    disabled: false,
  },
  {
    title: "Scale",
    description:
      "Explore how map scale can be used to hide and show details on a map.",

    url: "/scale",
    disabled: false,
  },
  {
    title: "Visual Encoding",
    description: "Learn about the main building blocks of visual encoding.",

    url: "/visual",
    disabled: false,
  },
  {
    title: "Types of Maps",
    description:
      "Find out how visual encoding allows geographers to produce thematic maps.",

    url: "/thematic",
    disabled: false,
  },
  {
    title: "Resources",
    description: "GIS resources recommended by the developer(s) of the site.",
    url: "/resources",
    disabled: true,
  },
];

export default function Home() {
  return (
    <MainLayout>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ marginTop: "25px" }}>
          <Box
            component="img"
            display="flex"
            style={{ margin: "auto", paddingBottom: "10px" }}
            alt="The house from the offer."
            src={require("../../assets/logo.png")}
          />
          <Typography variant="h5" align="center" color="textSecondary">
            Welcome to Interactive Learner GIS, where you can easily learn about
            Geographic Information Science / Systems (GIS).
          </Typography>
        </Container>

        <Container maxWidth="md" style={{ padding: "20px" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Topics
          </Typography>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
              padding: "0",
              border: 1,
            }}
          >
            {cards.map((card, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;

              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    borderBottom: index === cards.length - 1 ? 0 : 1,
                  }}
                >
                  <ListItemButton
                    to={card.url}
                    component={Link}
                    variant="contained"
                    disabled={card.disabled}
                    sx={{
                      "&:hover": {
                        opacity: "0.8",
                      },
                      padding: 0,
                    }}
                  >
                    <ListItemText
                      style={{ padding: "0px 15px 0px 20px" }}
                      id={labelId}
                      primary={
                        <React.Fragment>
                          <Typography variant="h5" color="text.secondary">
                            {card.title}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {card.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Container>
      </ThemeProvider>
    </MainLayout>
  );
}
