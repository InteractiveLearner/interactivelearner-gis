import React from "react";

import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";

import MainLayout from "../layouts/MainLayout";

import Title from "../components/Title.jsx";
import Figure from "../components/Figure.jsx";
import Question from "../components/Question.jsx";
import Sources from "../components/Sources.jsx";
import Authors from "../components/Authors.jsx";

import VisualVariables from "../components/maps/VisualVariables.jsx";

import marks from "../../img/marks.png";
import channels from "../../img/channels.png";
import datatype from "../../img/datatype.png";

import "../../styles/map.css";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  contentHeader: {
    color: "#bc6c25",
    paddingBottom: "8px",
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
  },
  contentBullets: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "16px 0px 16px 0px",
  },
  icon: {
    verticalAlign: "middle",
    paddingBottom: "5px",
    fontSize: "inherit",
  },
});

theme = responsiveFontSizes(theme);

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
  {
    img: datatype,
    title: "Channel Ranking",
    credit: "Credit: Tamara Munzner (License CC BY-ND 4.0)",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
];

const encodingQuestions = [
  {
    question:
      "When you hovered over a hospital, was the location information represented as an address or latitude, longitude coordinate? ",
    answer: "Address",
  },
  {
    question:
      "When you hovered over a ward, was the size represented as a length, area, or volume? ",
    answer: "Area",
  },
  {
    question:
      "When you hovered over a highway, was the size represented as a length, area, or volume? ",
    answer: "Length",
  },
  {
    question: "The Hospitals dataset possesses which mark and channels?",
    answer: "Point, Position, Color, and Shape",
  },
  {
    question: "The Wards dataset possesses which mark and channels?",
    answer: "Area,",
  },
  {
    question: "The Roads dataset possesses which mark and channels?",
    answer: "Line,",
  },
  {
    question:
      "Though a hospital could change in shape an infinite number of times, how many shape styles did you count in the Visually Encoded Map? ",
    answer: "4 (on desktop browsers)",
  },
];

const typesQuestions = [
  {
    question: "Q",
    answer: "A",
  },
  {
    question: "Q",
    answer: "A",
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
  {
    title: "Visual Variables",
    author: "infovis-wiki",
    url: "https://infovis-wiki.net/wiki/Visual_Variables",
  },
  {
    title: "Thematic Map",
    author: "Statistics Canada",
    url: "https://www150.statcan.gc.ca/n1/pub/92-195-x/2011001/other-autre/theme/def-eng.htm#archived",
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
  return (
    <MainLayout>
      <Title crumbs={"Visual Encoding and Types of Maps"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Visual Encoding
          </Typography>
          <Card elevation={3} sx={theme.card}>
            <CardContent sx={theme.cardContent}>
              <Typography variant="h4" sx={theme.contentHeader}>
                <MapOutlinedIcon sx={theme.icon} /> Marks and Channels
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                Cartography is considered a graphical form of communication.
                Communicating with maps would not be possible without the main
                building blocks for the visual encoding of vector data. The main
                building blocks for visual encoding are <b>marks</b> and{" "}
                <b>channels</b>. Marks are a set of geometric primitives made up
                of:
              </Typography>
              <Typography component="ol" variant="h5" sx={theme.contentBullets}>
                <ol>
                  <li>
                    <b>Points</b>
                  </li>
                  <ul>
                    <li>Represent locational information</li>
                    <ul>
                      <li>
                        A single point with X, Y coordinates (Cartesian
                        coordinate system)
                      </li>
                      <li>
                        A single point with latitude, longitude coordinates
                        (geographic coordinate system)
                      </li>
                      <li>A single point with an address</li>
                      <li>E.g., Houses, hospitals, restaurants, etc.</li>
                    </ul>
                  </ul>
                  <li>
                    <b>Lines</b>
                  </li>
                  <ul>
                    <li>Represent a connection with measurable length</li>
                    <ul>
                      <li>
                        Two vertices can be connected by a line to form a route
                      </li>
                      <li>E.g., Highways, trails, bus routes, etc.</li>
                    </ul>
                  </ul>
                  <li>
                    <b>Areas</b>
                  </li>
                  <ul>
                    <li>Represent a boundary with measurable area </li>
                    <ul>
                      <li>
                        Three vertices can be closed with two lines to form a
                        boundary
                      </li>
                      <li>E.g., Municipal boundaries, lakes, parks, etc.</li>
                    </ul>
                  </ul>
                </ol>
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                And the appearance of marks can be manipulated using channels:
              </Typography>
              <Typography component="ol" variant="h5" sx={theme.contentBullets}>
                <ol>
                  <li>
                    <b>Position</b>
                  </li>
                  <ul>
                    <li>Change in X and/or Y position</li>
                  </ul>
                  <li>
                    <b>Color</b>
                  </li>
                  <ul>
                    <li>Color hue</li>
                    <ul>
                      <li>Primary and secondary colors</li>
                    </ul>
                    <li>Color luminance (or brightness)</li>
                    <ul>
                      <li>The lightness or darkness of a color</li>
                    </ul>
                    <li>Color saturation</li>
                    <ul>
                      <li>How vivid or washed-out a color appears</li>
                    </ul>
                  </ul>
                  <li>
                    <b>Shape</b>
                  </li>
                  <ul>
                    <li>
                      Change in shape, which there are an infinite number of
                    </li>
                    <li>Glyphs are considered a part of this channel</li>
                    <ul>
                      <li>
                        E.g., Egyptian hieroglyphs, and other typographic
                        characters or symbols.
                      </li>
                    </ul>
                  </ul>
                  <li>
                    <b>Tilt</b>
                  </li>
                  <ul>
                    <li>Change in Angle and/or Alignment</li>
                  </ul>
                  <li>
                    <b>Size</b>
                  </li>
                  <ul>
                    <li>Change in Length, Area, and/or Volume</li>
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
          <Card elevation={3} sx={theme.card}>
            <CardContent sx={theme.cardContent}>
              <Typography variant="h4" sx={theme.contentHeader}>
                <MouseOutlinedIcon // Replace with mouse icon
                  sx={theme.icon}
                />{" "}
                Visually Encoded Map
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                Now that you have learned about visual encoding, interact with
                the map below to discover which marks and channels are shown and
                the information they possess.
                {/* Mention change icon style button */}
              </Typography>
            </CardContent>
          </Card>
          <VisualVariables />
          <Question questions={encodingQuestions} />
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Types of Maps
          </Typography>
          <Card elevation={3} sx={theme.card}>
            <CardContent sx={theme.cardContent}>
              <Typography variant="h4" sx={theme.contentHeader}>
                <MapOutlinedIcon sx={theme.icon} /> Reference Maps
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                <b>Reference maps</b> serve a general purpose. You come across
                them quite often in the form of transit maps, topographic maps,
                road maps, hiking trail maps, etc. The Scale Map you had seen in
                the{" "}
                <a href="https://www.interactivelearner-gis.com/#/projections">
                  Projections and Scales
                </a>{" "}
                chapter is considered a reference map since it had no intended
                theme and only showed the location and names of features.
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={theme.card}>
            <CardContent sx={theme.cardContent}>
              <Typography variant="h4" sx={theme.contentHeader}>
                <MapOutlinedIcon sx={theme.icon} /> Thematic Maps
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                The aim of <b>thematic maps</b> is to convey information via the
                use of a theme or multiple themes. Therefore, unlike reference
                maps, thematic maps serve a special purpose. One special purpose
                could be exploratory data analysis to reveal patterns and
                relations in the spatial data. The theme(s) of a thematic map is
                made up of a combination of marks, channels, quantitative and /
                or qualitative data and maybe even a base map acting as a
                locational reference.
                {/* Maps transform from simple layers */}
                {/* When to use which channel? Expressiveness vs effectiveness */}
                {/* Data Types */}
                {/* Mixing of visual variables / channels */}
                {/* Multivariate Maps */}
                {/* Show a collection of maps and ask users to identify each theme */}
                <br></br>
                <br></br>
                The <b>expressiveness types</b> and <b>effectiveness ranks</b>{" "}
                principles are connected to the channel selections in thematic
                mapping. The expressiveness types principle aims to assign the
                ideal channel to a given data type. The effectiveness ranks
                principle simply states that not all channels are equal, some
                channels take priority over others.
                <br></br>
                <br></br>
                With all this background in mind, we will go over a few thematic
                map types:
              </Typography>

              <Typography component="ol" variant="h5" sx={theme.contentBullets}>
                <ol>
                  <li>
                    <b>Chorochromatic Maps</b>
                  </li>
                  <ul>
                    <li>Qualitative</li>
                    <li>Data type: categorical / nominal</li>
                  </ul>
                  <li>
                    <b>Choropleth Maps</b>
                  </li>
                  <ul>
                    <li>Quantitative</li>
                    <li>Data type: ordinal, interval or ratio</li>
                  </ul>
                  <li>
                    <b>Diagram Maps</b>
                  </li>
                  <ul>
                    <li>Quantitative</li>
                    <ul>
                      <li>And sometimes qualitative</li>
                    </ul>
                    <li>Data type: ordinal, interval or ratio</li>
                  </ul>
                  <li>
                    <b>Dot Density Maps</b>
                  </li>
                  <ul>
                    <li>Quantitative</li>
                    <li>Data type: ordinal, interval or ratio</li>
                  </ul>
                  <li>
                    <b>Proportional Symbol Maps</b>
                  </li>
                  <ul>
                    <li>Quantitative</li>
                    <li>Data type: ordinal, interval or ratio</li>
                  </ul>
                  <li>
                    <b>Graduated Symbol Maps</b>
                  </li>
                  <ul>
                    <li>Quantitative</li>
                    <li>Data type: ordinal, interval or ratio</li>
                  </ul>
                </ol>
              </Typography>
            </CardContent>
          </Card>
          <Figure
            img={figures[2].img}
            title={figures[2].title}
            credit={figures[2].credit}
            url={figures[2].url}
          />
          <Card elevation={3} sx={theme.card}>
            <CardContent sx={theme.cardContent}>
              <Typography variant="h4" sx={theme.contentHeader}>
                <MouseOutlinedIcon // Replace with mouse icon
                  sx={theme.icon}
                />{" "}
                Exploration of Thematic Maps
              </Typography>
              <Typography component="p" variant="h5" sx={theme.content}>
                Now that you have learned about types of maps and how they are
                designed, it is your turn to explore them. Here are some tips:
              </Typography>
              <Typography component="ol" variant="h5" sx={theme.contentBullets}>
                <ul>
                  <li>
                    Can you identify which channels were used in the making of
                    each thematic map? The Channel Ranking figure may prove
                    useful.
                  </li>
                  <li>
                    The dot density maps's view is set to <i>World</i>. Notice
                    how as you zoom in to a <i>Continent</i> or <i>Country</i>{" "}
                    level, the dots begin to represent a different number of
                    people.
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
          <CardMedia
            component="iframe"
            title="Dot Density Map"
            style={{
              margin: "auto",
              marginBottom: "20px",
              width: "95%",
              border: 0,
            }}
            height={500}
            image="https://omarkawach.maps.arcgis.com/apps/instant/basic/index.html?appid=de956853f5e746f39465a008681eb2ee"
          />
          {/* Ask Users to Identify each thematic map */}
          {/* Watch as the dots in the dot density map represent a different number of people */}
          <Question questions={typesQuestions} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}

export default Visual;
