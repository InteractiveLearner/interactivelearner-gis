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
import VisualVariables from "../components/maps/VisualVariables.jsx";

import marks from "../../img/marks.png";

import "../../styles/map.css";

const theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  contentHeader: {
    color: "#bc6c25",
    paddingBottom: "8px",
  },
  card: {
    padding: "0px 16px 16px 16px",
    margin: "0px 20px 20px 20px",
  },
  content: {
    color: "rgba(0, 0, 0, 0.75)",
  },
  contentBullets: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "16px 0px 0px 0px",
  },
});

const figures = [
  {
    img: marks,
    title: "Types of Marks",
    credit: "Credit: Tamara Munzner licensed under CC BY-ND 4.0",
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
    title: "Source",
    url: "https://www.google.ca/",
  },
];

function Variables() {
  const [crumbs, setCrumbs] = useState(["Visual Variables and Types of Maps"]);
  return (
    <MainLayout>
      <Title crumbs={crumbs} />
      <ThemeProvider theme={theme}>
        <Grow in={true} timeout={1000}>
          <Container maxWidth="md" style={{ padding: "20px 0" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Visual Variables
            </Typography>
            <Card elevation={3} sx={theme.card}>
              <CardContent>
                <Typography variant="h4" sx={theme.contentHeader}>
                  <MapOutlinedIcon
                    style={{ minWidth: "20px" }}
                    fontSize={"medium"}
                  />{" "}
                  Marks
                </Typography>
                <Typography component="p" variant="h5" sx={theme.content}>
                  French Cartographer Jacques Bertin introduced the main building blocks of visual variables 
                  in his book <i>Semiology of Graphics</i>
                  
                  In geography, points represent location. Points have
                  {/* Jacques Bertin */}
                </Typography>
              </CardContent>
            </Card>
            <Figure
              img={figures[0].img}
              title={figures[0].title}
              credit={figures[0].credit}
              url={figures[0].url}
            />
            <Card elevation={3} sx={theme.card}>
              <CardContent>
                <Typography variant="h4" sx={theme.contentHeader}>
                  <MapOutlinedIcon
                    style={{ minWidth: "20px" }}
                    fontSize={"medium"}
                  />{" "}
                  Channels
                </Typography>
                <Typography component="p" variant="h5" sx={theme.content}>
                  Content
                  {/* Jacques Bertin */}
                </Typography>
              </CardContent>
            </Card>
            <VisualVariables />
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Types of Maps
            </Typography>
            <Card elevation={3} sx={theme.card}>
              <CardContent>
                <Typography variant="h4" sx={theme.contentHeader}>
                  <MapOutlinedIcon
                    style={{ minWidth: "20px" }}
                    fontSize={"medium"}
                  />{" "}
                  Title
                </Typography>
                <Typography component="p" variant="h5" sx={theme.content}>
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
    </MainLayout>
  );
}

export default Variables;
