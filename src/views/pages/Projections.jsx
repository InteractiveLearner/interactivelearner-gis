import React from "react";

import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Checkbox,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import SchoolIcon from "@mui/icons-material/School";

import MainLayout from "../layouts/MainLayout";

import Title from "../components/Title.jsx";
import ContentBuilder from "../components/ContentBuilder.jsx";
import Figure from "../components/Figure.jsx";
import Question from "../components/Question.jsx";
import Sources from "../components/Sources.jsx";
import Authors from "../components/Authors.jsx";

import ScaleMap from "../components/maps/ScaleMap.jsx";
import ProjectionExplorer from "../components/maps/ProjectionExplorer.jsx";

import surfaces from "../../img/projection_surfaces.png";
import scaleImg from "../../img/scale.png";

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

const projectionTopic = [
  {
    type: "content",
    title: "Projection Types",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          When it comes to presenting maps to readers, geographers must choose a
          projection that is appropriate for the map's purpose and location.
          Projections transform three-dimensional curved surfaces to
          two-dimensional flat surfaces. Consequently, such transformations
          cause distortion to the maps. The following are the 4 types in which
          the relationship between features on a map may be distorted or
          preserved:
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
              <b>Distance (Equidistant)</b>
            </li>
            <ul>
              <li>Preserves distance between features</li>
            </ul>
            <li>
              <b>True Direction (Azimuth)</b>
            </li>
            <ul>
              <li>Preserves direction between features</li>
              <li>Measured in degrees (°)</li>
            </ul>
            <li>
              <b>Shape / Angle (Conformal)</b>
            </li>
            <ul>
              <li>Cannot preserve shape and area at the same time</li>
              <li>Continents distorted</li>
            </ul>
            <li>
              <b>Area (Equal-Area)</b>
            </li>
            <ul>
              <li>Distorts distance and shape</li>
              <li>Preserves features to their exact size</li>
            </ul>
          </ol>
        </Typography>,
      ],
    ],
  },
  {
    type: "content",
    title: "Projection Techniques",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          The projection techniques, which affect the <b>longitude</b> (vertical
          lines) and <b>latitude</b> (horizontal lines) on a map, are another
          significant factor to consider. The following are the 3 primary
          projection techniques:
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
              <b>Cylindrical</b>
            </li>
            <ul>
              <li>
                Longitude lines appear straight, equally spaced, and parallel
              </li>
              <li>
                Latitude lines appear straight, and sometimes not consistently
                equally spaced
              </li>
            </ul>
            <li>
              <b>Conical</b>
            </li>
            <ul>
              <li>Longitude lines appear as diverging</li>
              <li>Latitude lines appear circular around the poles</li>
            </ul>
            <li>
              <b>Azimuthal (or Planar)</b>
            </li>
            <ul>
              <li>
                Increasingly distorted from the centre point (typically the
                South or North Pole as the centre point)
              </li>
              <li>
                Longitude lines appear equally spaced and straight which become
                increasingly radiant
              </li>
              <li>Latitude lines appear as equally spaced centric circles</li>
            </ul>
          </ol>
        </Typography>,
      ],
      [
        <Figure
          img={surfaces}
          title={"Cylinder, Cone, and Plane"}
          credit={"Credit: PennState licensed under CC BY-ND 2.0"}
          url={"https://creativecommons.org/licenses/by-nc-sa/4.0/"}
          key={2}
        />,
      ],
    ],
  },
  {
    type: "interaction",
    title: "Projection Explorer",
    icon: MouseOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          Try out the projection explorer below now that you've learned about
          projection types and techniques.
        </Typography>,
      ],
      [<ProjectionExplorer key={1} />],
    ],
  },
  {
    type: "test",
    title: "Test Your Knowledge",
    icon: SchoolIcon,
    content: [[<Question key={0} questions={projectionQuestions} />]],
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

const scaleTopic = [
  {
    type: "content",
    title: "Scale Types",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          As we've seen with projections, mapping isn't a perfect depiction of
          reality. When you use your favourite navigation service to look up
          locations or directions (e.g., Google Maps, Apple Maps, Bing Maps,
          etc. ), the real-world features you see cannot be drawn to their
          proper scale. These navigation services, on the other hand, use a{" "}
          <b>graphic scale</b> to indicate the measurable relationship between
          the map and the area being examined. Similarly, GIS tools such as QGIS
          and ArcGIS Pro portray this relationship using representative
          fractions (<b>ratio scale</b>). Both representative fractions and
          graphic scales can be read aloud as a <b>verbal scale</b>. However,
          representative fractions differ from graphic scales in that they do
          not employ units (e.g., km, miles, etc.). Regardless of whether
          representative fractions or graphic scales are used, the level of
          detail shown is what matters most.
        </Typography>,
      ],
    ],
  },
  {
    type: "content",
    title: "Scale Sizes",
    icon: MapOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          The level of detail on a map is determined by the scale size. In{" "}
          <b>small-scale</b> maps, a lot of ground is covered in a large
          geographic area and at a low level of detail whereas{" "}
          <b>large-scale</b> maps cover small geographic areas with a high level
          of detail. In the figure below, the small-scale map of Victoria
          depicts the entire region, neighborhoods, and major road networks. In
          contrast, the large-scale map of Victoria depicts the downtown core,
          street names, more labels and outline of buildings.
        </Typography>,
      ],
      [
        <Figure
          img={scaleImg}
          title={"Small Scale versus Large Scale Victoria, BC"}
          credit={""}
          key={1}
        />,
      ],
    ],
  },
  {
    type: "interaction",
    title: "Scale Map",
    icon: MouseOutlinedIcon,
    content: [
      [
        <Typography key={0} component="p" variant="h5" sx={theme.content}>
          The view of Victoria, BC below is displayed in small-scale by default.
          The buttons to change scale are on the bottom right of the map. Notice
          how the real-world units and length of the graphic scale (bottom left
          of the map) vary as you move around and zoom in / out of the map.
        </Typography>,
      ],
      [<ScaleMap key={1} />],
    ],
  },
  {
    type: "test",
    title: "Test Your Knowledge",
    icon: SchoolIcon,
    content: [[<Question key={0} questions={scaleQuestions} />]],
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

export default function Projections() {
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
      <Title crumbs={"Projections and Scale"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Projections
            </Typography>
            <Checkbox
              edge="end"
              style={{ color: "#283618", width: "85px" }}
              onChange={handleToggle(0)}
              checked={checked.indexOf(0) !== -1}
              sx={{ marginLeft: "auto" }}
            />
          </div>

          <ContentBuilder topics={projectionTopic} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Scale
            </Typography>
            <Checkbox
              edge="end"
              style={{ color: "#283618", width: "85px" }}
              onChange={handleToggle(1)}
              checked={checked.indexOf(1) !== -1}
              sx={{ marginLeft: "auto" }}
            />
          </div>
          <ContentBuilder topics={scaleTopic} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}
