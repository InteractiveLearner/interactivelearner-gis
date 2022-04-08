import React from "react";

import {
  Typography,
  Container,
  CardMedia,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Checkbox,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import SchoolIcon from "@mui/icons-material/School";

import MainLayout from "../layouts/MainLayout";

import Title from "../../components/Title.jsx";
import ContentBuilder from "../../components/ContentBuilder.jsx";
import Figure from "../../components/Figure.jsx";
import Question from "../../components/Question.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import VisualVariables from "../../maps/VisualVariables.jsx";

import marks from "../../assets/images/marks.png";
import channels from "../../assets/images/channels.png";
import datatype from "../../assets/images/datatype.png";

import "../../styles/map.css";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
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

const encodingTopic = [
  {
    type: "content",
    title: "Marks",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          Cartography is considered a graphical form of communication.
          Communicating with maps would not be possible without the main
          building blocks for the visual encoding of vector data. The main
          building blocks for visual encoding are <b>marks</b> and{" "}
          <b>channels</b>. Marks are a set of geometric primitives made up of:
        </Typography>,
      ],
      [
        <Typography
          key={1}
          component="ol"
          variant="h5"
          sx={theme.contentBullets}
        >
          <ol>
            <li>
              <b>Points</b>
            </li>
            <ul>
              <li>Represent locational information</li>
              <ul>
                <li>
                  A single point with X, Y coordinates (Cartesian coordinate
                  system)
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
                <li>Two vertices can be connected by a line to form a route</li>
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
                  Three vertices can be closed with two lines to form a boundary
                </li>
                <li>E.g., Municipal boundaries, lakes, parks, etc.</li>
              </ul>
            </ul>
          </ol>
        </Typography>,
      ],
      [
        <Figure
          img={figures[0].img}
          title={figures[0].title}
          credit={figures[0].credit}
          url={figures[0].url}
          key={2}
        />,
      ],
    ],
  },
  {
    type: "content",
    title: "Channels",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          The appearance of marks can be manipulated using channels:
        </Typography>,
      ],
      [
        <Typography
          key={1}
          component="ol"
          variant="h5"
          sx={theme.contentBullets}
        >
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
              <li>Change in shape, which there are an infinite number of</li>
              <li>Glyphs are considered a part of this channel</li>
              <ul>
                <li>
                  E.g., Egyptian hieroglyphs, and other typographic characters
                  or symbols.
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
        </Typography>,
      ],
      [
        <Figure
          img={figures[1].img}
          title={figures[1].title}
          credit={figures[1].credit}
          url={figures[1].url}
          key={2}
        />,
      ],
    ],
  },
  {
    type: "interaction",
    title: "Visually Encoded Map",
    icon: MouseOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          Now that you've learned about visual encoding, play around with the
          map below to see which marks and channels are displayed, as well as
          the data they contain. You can alter the style of the points by
          pressing the bottom-right button.
        </Typography>,
      ],
      [<VisualVariables key={1} />],
    ],
  },
  {
    type: "test",
    title: "Test Your Knowledge",
    icon: SchoolIcon,
    content: [[<Question key={0} questions={encodingQuestions} />]],
  },
];

const typesQuestions = [
  {
    question:
      "Based on the chorochromatic map, how many health authorities are there in British Columbia?",
    answer: "5",
  },
  {
    question: "Which channel is the chorochromatic map using?",
    answer: "Identity - Color Hue",
  },
  {
    question:
      "What is the meaning of the darkest colour in the choropleth map scale?",
    answer:
      "The darkest colour represents the highest population density in Ottawa",
  },
  {
    question:
      "At the Country level, how many people does a dot represent in the dot density map?",
    answer: "1 dot = 17,500 people",
  },
];

const typesTopic = [
  {
    type: "content",
    title: "Reference Maps",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          <b>Reference maps</b> serve a general purpose. They can be found in
          the form of transit maps, topographic maps, road maps, hiking trail
          maps, and so on. The Scale Map you saw in the{" "}
          <a
            style={{ textDecoration: "none", color: "#dda15e" }}
            href="https://www.interactivelearner-gis.com/#/projections"
          >
            Projections and Scales
          </a>{" "}
          chapter is considered a reference map because it had no intended theme
          and only showed the location and names of features.
        </Typography>,
      ],
    ],
  },
  {
    type: "content",
    title: "Thematic Maps",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          <b>Thematic maps</b>, unlike reference maps, serve a special purpose.
          Exploratory data analysis, for example, could be used to uncover
          patterns and relationships in spatial data. A thematic map's theme(s)
          are made up of a mix of marks, channels, quantitative and/or
          qualitative data, and sometimes even a base map that serves as a point
          of reference.
          <br></br>
          <br></br>
          Thematic mapping channel selections are linked to the{" "}
          <b>expressiveness types</b> and <b>effectiveness ranks</b> principles.
          The expressiveness types principle seeks to match a data type with the
          appropriate channel. The effectiveness ranks principle simply argues
          that not all channels are created equal, and that certain channels
          have a higher importance than others.
        </Typography>,
      ],
      [
        <Figure
          img={figures[2].img}
          title={figures[2].title}
          credit={figures[2].credit}
          url={figures[2].url}
          key={1}
        />,
      ],
    ],
  },
  {
    type: "interaction",
    title: "Exploration of Thematic Map Types",
    icon: MouseOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          Now that you've learned how thematic maps are designed, it is time to
          explore and learn about the types of thematic maps. Here are some
          suggestions to consider as you explore:
        </Typography>,
      ],
      [
        <Typography
          key={1}
          component="ol"
          variant="h5"
          sx={theme.contentBullets}
        >
          <ul>
            <li>
              Can you identify which channels were used to create each of the
              thematic maps? The Channel Ranking figure could be useful.
            </li>
            <li>
              The dot density maps's view is set to <i>World</i>. people. Notice
              how the dots begin to indicate a different number of people when
              you zoom in to a <i>Continent</i> or <i>Country</i> level.
            </li>
            <li>
              There is no diagram symbol map below. However, an example can
              still be seen on this page. Did you notice that pie charts were
              one of the hospital shape styles in the Visually Encoded Map?
              Despite the fact that the pie charts in the Visually Encoded Map
              contain meaningless data, they could, for example, represent each
              hospital's budget categories.
            </li>
          </ul>
        </Typography>,
      ],
      [
        <CardMedia
          key={2}
          component="iframe"
          title="Chorochromatic Map"
          style={{
            margin: "auto",
            border: 0,
          }}
          height={1000}
          image="https://arcg.is/19vjX50"
        />,
      ],
    ],
  },
  {
    type: "test",
    title: "Test Your Knowledge",
    icon: SchoolIcon,
    content: [[<Question key={0} questions={typesQuestions} />]],
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
  {
    title: "Map",
    author: "วราภรณ์ มูลวงศ์",
    url: "https://sites.google.com/site/boardinclassrom/map/chorochromatic-map",
  },
  {
    title: "Dot Distribution vs Graduated Symbols vs Proportional Symbol Maps",
    author: "GISGeography",
    url: "https://gisgeography.com/dot-distribution-graduated-symbols-proportional-symbol-maps/#:~:text=While%20proportional%20symbol%20maps%20scale,population%20into%204%20separate%20classes.",
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
  const [checked, setChecked] = React.useState([-1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <MainLayout>
      <Title crumbs={"Visual Encoding and Types of Maps"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0px 0px 0px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Visual Encoding
            </Typography>
            <Checkbox
              edge="end"
              style={{ color: "#283618", width: "85px" }}
              onChange={handleToggle(0)}
              checked={checked.indexOf(0) !== -1}
              sx={{ marginLeft: "auto" }}
            />
          </div>
          <ContentBuilder topics={encodingTopic} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Types of Maps
            </Typography>
            <Checkbox
              edge="end"
              style={{ color: "#283618", width: "85px" }}
              onChange={handleToggle(1)}
              checked={checked.indexOf(1) !== -1}
              sx={{ marginLeft: "auto" }}
            />
          </div>
          <ContentBuilder topics={typesTopic} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}

export default Visual;
