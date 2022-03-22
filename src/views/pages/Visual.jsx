import React, { useState } from "react";

import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grow,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";

import MainLayout from "../layouts/MainLayout";

import Title from "../components/Title.jsx";
import Figure from "../components/Figure.jsx";
import Sources from "../components/Sources.jsx";
import Authors from "../components/Authors.jsx";

import VisualVariables from "../components/maps/VisualVariables.jsx";

import marks from "../../img/marks.png";
import channels from "../../img/channels.png";

import "../../styles/map.css";

const theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
    typography: { sm: "h3", xs: "h5" },
  },
  contentHeader: {
    color: "#bc6c25",
    paddingBottom: "8px",
    typography: { sm: "h4", xs: "h6" },
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
  },
  cardContent: {
    padding: "0px 0px 8px 0px",
  },
  content: {
    color: "rgba(0, 0, 0, 0.75)",
    typography: { sm: "h5", xs: "body1" },
  },
  contentBullets: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "16px 0px 16px 0px",
    typography: { sm: "h5", xs: "body1" },
  },
  icon: {
    verticalAlign: { sm: "middle", xs: "middle" },
    paddingBottom: { sm: "5px", xs: "2.5px" },
    fontSize: { sm: "inherit", xs: "inherit" },
    minWidth: "20px",
  },
});

const figures = [
  {
    img: marks,
    title: "Types of Marks",
    credit: "Credit: Tamara Munzner (License CC BY-ND 4.0)",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
  {
    img: channels,
    title: "Types of Channels",
    credit: "Credit: Tamara Munzner (License CC BY-ND 4.0)",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
];

const sources = [
  {
    title: "Visualization Analysis and Design",
    author: "Tamara Munzner",
    url: "https://www.cs.ubc.ca/~tmm/vadbook/",
  },
  {
    title: "Visual Representation from Semiology of Graphics by J. Bertin",
    author: "Sheelagh Carpendale",
    url: "https://innovis.cpsc.ucalgary.ca/innovis/uploads/Courses/InformationVisualizationDetails/09Bertin.pdf",
  },
  {
    title: "Geometric Primitive",
    author: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Geometric_primitive",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

function Visual() {
  const [crumbs, setCrumbs] = useState(["Visual Encoding and Types of Maps"]);
  return (
    <MainLayout>
      <Title crumbs={crumbs} />
      <ThemeProvider theme={theme}>
        <Grow in={true} timeout={1000}>
          <Container maxWidth="md" style={{ padding: "20px 0" }}>
            <Typography gutterBottom sx={theme.header}>
              Visual Encoding
            </Typography>
            <Card elevation={3} sx={theme.card}>
              <CardContent sx={theme.cardContent}>
                <Typography sx={theme.contentHeader}>
                  <MapOutlinedIcon sx={theme.icon} /> Marks and Channels
                </Typography>
                <Typography component="p" sx={theme.content}>
                  Cartography is considered a graphical form of communication.
                  Communicating with maps would not be possible without the main
                  building blocks for visual encoding. The main building blocks
                  for visual encoding are <b>marks</b> and <b>channels</b>.
                  Marks are a set of geometric primitives made up of:
                </Typography>
                <Typography component="ol" sx={theme.contentBullets}>
                  <ol>
                    <li>
                      <b>Points</b>
                    </li>
                    <ul>
                      <li>Represent location information</li>
                      <ul>
                        <li>X, Y coordinates</li>
                        <li>Latitude, longitude coordinates</li>
                        <li>Addresses</li>
                      </ul>
                    </ul>
                    <li>
                      <b>Lines</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                    <li>
                      <b>Areas</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                  </ol>
                </Typography>
                <Typography component="p" sx={theme.content}>
                  And channels that make up the mark's appearance are composed
                  of:
                </Typography>
                <Typography component="ol" sx={theme.contentBullets}>
                  <ol>
                    <li>
                      <b>Position</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                    <li>
                      <b>Color</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                    <li>
                      <b>Shape</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                    <li>
                      <b>Tilt</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                    <li>
                      <b>Size</b>
                    </li>
                    <ul>
                      <li>Text</li>
                    </ul>
                  </ol>
                </Typography>
              </CardContent>
            </Card>
            <Figure
              img={figures[0].img}
              title={figures[0].title}
              credit={figures[0].credit}
              url={figures[0].url}
            />
            <Figure
              img={figures[1].img}
              title={figures[1].title}
              credit={figures[1].credit}
              url={figures[1].url}
            />
            {/* <Card elevation={3} sx={theme.card}>
              <CardContent>
                <Typography variant="h4" sx={theme.contentHeader}>
                  <MapOutlinedIcon
                    style={{ minWidth: "20px" }}
                    fontSize={"medium"}
                  />{" "}
                  Color
                </Typography>
                <Typography component="p" variant="h5" sx={theme.content}>
                  Content
                </Typography>
              </CardContent>
            </Card> */}
            <VisualVariables />
            <Typography gutterBottom sx={theme.header}>
              Types of Maps
            </Typography>
            <Card elevation={3} sx={theme.card}>
              <CardContent sx={theme.cardContent}>
                <Typography sx={theme.contentHeader}>
                  <MapOutlinedIcon sx={theme.icon} /> Title
                </Typography>
                <Typography component="p" sx={theme.content}>
                  Content
                  {/* Mention Reference maps. */}
                </Typography>
              </CardContent>
            </Card>
            {/* <CardMedia
          component="iframe"
          title="isu map"
          style={{ margin: "inherit", width: "97%" }}
          height={500}
          // width: "80%",
          // margin: "auto"
          image="https://isu-ubc.github.io/clinic-mapping-2/"
        /> */}
          </Container>
        </Grow>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}

export default Visual;
