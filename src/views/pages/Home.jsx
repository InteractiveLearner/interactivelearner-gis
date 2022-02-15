import React from "react";

import MainLayout from "../layouts/MainLayout";

import { Link } from "react-router-dom";

import img from "../../img/b.jpg";

import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";

const cards = [
  {
    title: "Projections and Scale",
    description:
      "Discover map scales and the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
    img: "../../../public/img/b.jpg",
    disabled: false,
  },
  {
    title: "Visual Variables and Types of Maps",
    description: "",
    url: "/variables",
    img: "../../../public/img/b.jpg",
    disabled: false,
  },
  {
    title: "Classification Schemes",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: "../../../public/img/b.jpg",
    disabled: true,
  },
  {
    title: "Spatial Autocorrelation Statistics",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: "../../../public/img/b.jpg",
    disabled: true,
  },
  {
    title: "Lying with Maps",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: "../../../public/img/b.jpg",
    disabled: true,
  },
  {
    title: "Resources",
    description: "GIS resources recommended by the developer(s) of the site.",
    url: "/resources",
    img: "../../../public/img/b.jpg",
    disabled: false,
  },
];

export default function Home() {
  return (
    <MainLayout>
      <div>
        <Container maxWidth="sm" style={{ marginTop: "25px" }}>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Geographic Information Systems
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            View any of the topics below to learn about GIS!
          </Typography>
        </Container>
      </div>
      <Container maxWidth="md" style={{ padding: "20px 0" }}>
        <Grid container spacing={4} style={{ padding: "16px" }}>
          {cards.map((card, index) => (
            // Space on device
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                style={{
                  flexDirection: "column",
                  height: "100%",
                  display: "flex",
                }}
              >
                <CardMedia
                  style={{ padding: "56.25%" }} // 16:9 aspect ratio
                  image={img}
                  title="Image title"
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    style={{ background: "#2E3B55" }}
                    size="small"
                    color="primary"
                    to={card.url}
                    component={Link}
                    variant="contained"
                    disabled={card.disabled}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}
