import React from "react";

import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Card,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import SchoolIcon from "@mui/icons-material/School";

import MainLayout from "../layouts/MainLayout";

import Title from "../../components/Title.jsx";
import Figure from "../../components/Figure.jsx";
import Question from "../../components/Question.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import ScaleMap from "../../maps/ScaleMap.jsx";
import ProjectionExplorer from "../../maps/ProjectionExplorer.jsx";

import readme from "../content/Projections.md";
import readme2 from "../content/Scale.md";

import Markdown from "markdown-to-jsx";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  contentHeader: {
    color: "#bc6c25",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
  },
  cardContent: {
    padding: "0px 0px 8px 0px",
  },
  content: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "0px 0px 16px 0px",
  },
  contentBullets: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "0px 0px 16px 0px",
  },
  markdown: {
    padding: "0px 20px",
  },
});

theme = responsiveFontSizes(theme);

const projectionQuestions = [
  {
    question: "The Albers projection uses which technique and type?",
    answer: "Conical and Equal Area",
  },
  {
    question: "The Equirectangular projection uses which technique and type?",
    answer: "Cylindrical and Equidistant",
  },
  {
    question: "The Mercator projection uses which technique and type?",
    answer: "Cylindrical and Conformal",
  },
  {
    question:
      "The Mercator projection distorts the area of features. Can you identify which features are heavily distorted?",
    answer: "One example is Greenland appearing much larger than Africa",
  },
  {
    question:
      "The spherical version of which projection is the de facto standard for web mapping?",
    answer: "Mercator projection, however non-conformal in this case",
  },
];

const scaleQuestions = [
  {
    question:
      "When you select the small-scale button, what is the graphic scale's length (or map distance) and ground distance?",
    answer:
      "The map distance is approximately 1 centimeter and the ground distance is 2 kilometers",
  },
  {
    question:
      "When you select the small-scale button, what is the verbal scale?",
    answer: '"One centimeter corresponds to 2 kilometers"',
  },
  {
    question:
      "When you select the small-scale button, what is the ratio scale?",
    answer:
      "1:200,000 or 1/200,000.\nCalculation: Convert 2 km to 200,000 cm and then divide 1 cm by 200,000 cm",
  },
  {
    question:
      "When you select the large-scale button, what is the graphic scale's or map distance and ground distance?",
    answer:
      "The map distance is approximately 1 centimeter and the ground distance is 300 meters",
  },
  {
    question:
      "When you select the large-scale button, what is the verbal scale?",
    answer: '"One centimeter corresponds to 300 meters"',
  },
  {
    question:
      "When you select the large-scale button, what is the ratio scale?",
    answer:
      "1:30,000 or 1/30,000.\nCalculation: Convert 300 m to 30,000 cm and then divide 1 cm by 30,000 cm",
  },
  {
    question:
      "If the map distance for the large-scale button's view was 0.75 cm, what would the ratio scale be?",
    answer: "1:40,000 or 1/40,000",
  },
];

const sources = [
  {
    title: "Distortion",
    author: "The GIS Encyclopedia",
    url: "http://wiki.gis.com/wiki/index.php/Distortion#:~:text=There%20are%20four%20main%20types,example%20is%20in%20cylindrical%20projections.",
  },
  {
    title: "Map Projections and Distortion",
    author: "Hunter College",
    url: "http://www.geography.hunter.cuny.edu/~jochen/gtech361/lectures/lecture04/concepts/Map%20coordinate%20systems/Map%20projections%20and%20distortion.htm",
  },
  {
    title: "Projections",
    author: "Intergovernmental Committee on Surveying and Mapping",
    url: "https://www.icsm.gov.au/education/fundamentals-mapping/projections",
  },
  {
    title: "Supported Map Projections",
    author: "ArcMap",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Characteristics of Projections",
    author: "PennState College of Earth and Mineral Sciences",
    url: "https://www.e-education.psu.edu/geog486/node/675",
  },
  {
    title: "Map Scale",
    author: "Geography Realm",
    url: "https://www.geographyrealm.com/map-scale/",
  },
  {
    title: "Map Scale",
    author: "Geokov",
    url: "https://desktop.arcgis.com/en/arcmap/latest/map/projections/mercator.htm",
  },
  {
    title: "Converting Between Scale Types",
    author: "Metal Detecting World",
    url: "https://www.metaldetectingworld.com/convert_map_scale_p1.shtml ",
  },
  {
    title: "Map Scale, Directions",
    author: "Western University",
    url: "https://instruct.uwo.ca/geog/2240/lecture2.htm",
  },
  {
    title: "Map Scale Calculator",
    author: "Map Tools",
    url: "https://www.maptools.com/scale_calculator",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

// TODO:
// Fix confetti
// Remove the content builder
// Update how sources are added
// Split projections and scale into one topic
// Split visual encoding and types of maps into one topic

export default function Projections() {
  const [Content, setContent] = React.useState("");
  const [Content2, setContent2] = React.useState("");

  fetch(readme)
    .then((response) => response.text())
    .then((text) => setContent(text));

  fetch(readme2)
    .then((response) => response.text())
    .then((text) => setContent2(text));

  return (
    <MainLayout>
      <Title crumbs={"Projections and Scale"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Projections
          </Typography>
          <Card elevation={3} sx={theme.card}>
            <Markdown
              sx={theme.markdown}
              children={Content}
              options={{
                overrides: {
                  ProjectionExplorer: {
                    component: ProjectionExplorer,
                  },
                  Figure: (props) => {
                    return (
                      <Figure
                        img={require("../../assets/images/" + props.img)}
                        title={props.title}
                        credit={props.credit}
                        url={props.url}
                      />
                    );
                  },
                  img: (props) => {
                    return (
                      <img
                        src={require("../../assets/images/" + props.src)}
                        alt={props.alt}
                      />
                    );
                  },
                  h1: (props) => {
                    return (
                      <Typography
                        gutterBottom
                        variant="h4"
                        sx={theme.contentHeader}
                      >
                        {props.children[0]}
                      </Typography>
                    );
                  },
                },
              }}
            />
          </Card>

          <Question questions={projectionQuestions} />

          <Typography gutterBottom variant="h3" sx={theme.header}>
            Scale
          </Typography>

          <Card elevation={3} sx={theme.card}>
            <Markdown
              sx={theme.markdown}
              children={Content2}
              options={{
                overrides: {
                  ScaleMap: {
                    component: ScaleMap,
                  },
                  Figure: (props) => {
                    return (
                      <Figure
                        img={require("../../assets/images/" + props.img)}
                        title={props.title}
                        credit={props.credit}
                        url={props.url}
                      />
                    );
                  },
                  img: (props) => {
                    return (
                      <img
                        src={require("../../assets/images/" + props.src)}
                        alt={props.alt}
                      />
                    );
                  },
                  h1: (props) => {
                    return (
                      <Typography
                        gutterBottom
                        variant="h4"
                        sx={theme.contentHeader}
                      >
                        {props.children[0]}
                      </Typography>
                    );
                  },
                },
              }}
            />
          </Card>

          <Question questions={scaleQuestions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
