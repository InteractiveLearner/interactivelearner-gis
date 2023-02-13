import React from "react";

import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  Container,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import { themeMUI } from "../../styles/themeMUI";

const cards = [
  {
    title: "Projections",
    description:
      "Discover the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
  },
  {
    title: "Scale",
    description:
      "Explore how map scale can be used to hide and show details on a map.",

    url: "/scale",
  },
  {
    title: "Visual encoding",
    description: "Learn about the main building blocks of visual encoding.",

    url: "/visual",
  },
  {
    title: "Types of maps",
    description:
      "Find out how visual encoding allows geographers to produce thematic maps.",

    url: "/thematic",
  },
  // {
  //   title: "Resources",
  //   description: "GIS resources recommended by the contributors of the site.",
  //   url: "/resources",
  // },
];

export default function Home() {
  return (
    <MainLayout>
      <ThemeProvider theme={themeMUI}>
        <Container maxWidth="lg" sx={themeMUI.container}>
          <Card elevation={3} sx={themeMUI.homeCard}>
            <Typography gutterBottom variant="h2" sx={themeMUI.homeHeader}>
              Welcome!
            </Typography>

            <Typography variant="h5" color="textSecondary">
              The goal of Interactive Learner GIS is to give readers a fun
              environment to develop, refresh or improve their map literacy. The
              content of this website aims to follow a standard geography
              curriculum. Map scale, projections, coordinate systems, spatial
              analysis, relational databases, thematic maps, and spatial
              statistics are some common courses you'd find in such a
              cirriculum.
            </Typography>

            <Typography gutterBottom variant="h3" sx={themeMUI.homeHeader}>
              What would you like to learn today?
            </Typography>

            <List dense sx={themeMUI.list}>
              {cards.map((card, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      to={card.url}
                      component={Link}
                      variant="contained"
                      sx={themeMUI.listItemButton}
                    >
                      <ListItemAvatar>
                        <Avatar sx={themeMUI.avatar}>&#128218;</Avatar>
                      </ListItemAvatar>
                      <ListItemText
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
          </Card>
        </Container>
      </ThemeProvider>
    </MainLayout>
  );
}
