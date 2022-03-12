import React, { useState } from "react";

import { Typography, Container, Card, CardContent, Grow } from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";

import MainLayout from "../layouts/MainLayout";

import Title from "../components/Title.jsx";
import Figure from "../components/Figure.jsx";
import Question from "../components/Question.jsx";
import Pagination from "../components/Pagination.jsx";
import Sources from "../components/Sources.jsx";
import Authors from "../components/Authors.jsx";
import ScaleMap from "../components/maps/ScaleMap.jsx";
import ProjectionExplorer from "../components/maps/ProjectionExplorer.jsx";

import surfaces from "../../img/projection_surfaces.png";
import scaleImg from "../../img/scale.png";

import "../../styles/map.css";

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

// Images: https://gisgeography.com/map-projections/

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

const figures = [
  {
    img: surfaces,
    title: "Cylinder, Cone, and Plane",
    credit: "Credit: PennState licensed under CC BY-ND 2.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
  {
    img: scaleImg,
    title: "Small Scale versus Large Scale Victoria, BC",
    credit: "",
    url: "",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner",
    url: "https://github.com/omarkawach",
  },
];

function Projections() {
  const [crumbs, setCrumbs] = useState(["Projections and Scale"]);

  return (
    <MainLayout>
      <Title crumbs={crumbs} />
      <Grow in={true} timeout={1000}>
        <Container maxWidth="md" style={{ padding: "20px 0 0" }}>
          <Typography
            variant="h3"
            align="left"
            color="#457B9D"
            gutterBottom
            style={{ paddingLeft: "16px" }}
          >
            Projections
          </Typography>
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#0096c7"
                style={{ paddingBottom: "16px" }}
              >
                <MapOutlinedIcon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Projection Types
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                When it comes to presenting maps to readers, geographers must
                choose a projection that is appropriate for the map's purpose
                and location. Projections transform three-dimensional curved
                surfaces to two-dimensional flat surfaces. Consequently, such
                transformations cause distortion to the maps. The following are
                the 4 types in which the relationship between features on a map
                may be distorted or preserved:
              </Typography>

              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="ol"
                variant="h5"
                style={{ padding: "16px 0px 0px 0px" }}
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
              </Typography>
            </CardContent>
          </Card>
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#0096c7"
                style={{ paddingBottom: "16px" }}
              >
                <MapOutlinedIcon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Projection Techniques
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                The projection techniques, which affect the <b>longitude</b>{" "}
                (vertical lines) and <b>latitude</b> (horizontal lines) on a
                map, are another significant factor to consider. The following
                are the 3 primary projection techniques:
              </Typography>

              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="ol"
                variant="h5"
                style={{ padding: "16px 0px 0px 0px" }}
              >
                <ol>
                  <li>
                    <b>Cylindrical</b>
                  </li>
                  <ul>
                    <li>
                      Longitude lines appear straight, equally spaced, and
                      parallel
                    </li>
                    <li>
                      Latitude lines appear straight, and sometimes not
                      consistently equally spaced
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
                      Increasingly distorted from the centre point (typically
                      the South or North Pole as the centre point)
                    </li>
                    <li>
                      Longitude lines appear equally spaced and straight which
                      become increasingly radiant
                    </li>
                    <li>
                      Latitude lines appear as equally spaced centric circles
                    </li>
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
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#E63946"
                style={{ paddingBottom: "16px" }}
              >
                <MouseOutlinedIcon // Replace with mouse icon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Interaction - Projection Explorer
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                Try out the projection explorer below now that you've learned
                about projection types and techniques.
              </Typography>
            </CardContent>
          </Card>
          <ProjectionExplorer />
          <Question questions={projectionQuestions} />
          <Typography
            variant="h3"
            align="left"
            color="#457B9D"
            gutterBottom
            style={{ paddingLeft: "16px", paddingTop: "16px" }}
          >
            Scale
          </Typography>
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#0096c7"
                style={{ paddingBottom: "16px" }}
              >
                <MapOutlinedIcon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Scale Types
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                As we've seen with projections, mapping isn't a perfect
                depiction of reality. When you use your favourite navigation
                service to look up locations or directions (e.g., Google Maps,
                Apple Maps, Bing Maps, etc. ), the real-world features you see
                cannot be drawn to their proper scale. These navigation
                services, on the other hand, use a <b>graphic scale</b> to
                indicate the measurable relationship between the map and the
                area being examined. Similarly, GIS tools such as QGIS and
                ArcGIS Pro portray this relationship using representative
                fractions (<b>ratio scale</b>). Verbally, both representative
                fractions and graphic scales can be read as a{" "}
                <b>verbal scale</b>. Representative fractions, on the other
                hand, differ from graphic scales in that they do not employ
                units (e.g., km, miles, etc.). Regardless of whether
                representative fractions or graphic scales are used, the level
                of detail shown is what matters most.
              </Typography>
            </CardContent>
          </Card>
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#0096c7"
                style={{ paddingBottom: "16px" }}
              >
                <MapOutlinedIcon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Scale Sizes
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                The level of detail on a map is determined by the scale size. In{" "}
                <b>small-scale</b> maps, a lot of ground is covered in a large
                geographic area and at a low level of detail. On the other hand,{" "}
                <b>large-scale</b> maps cover small geographic areas with a high
                level of detail.
                {/* TODO: Add side by side screenshot of small scale vs large scale */}
              </Typography>
            </CardContent>
          </Card>
          <Figure
            img={figures[1].img}
            title={figures[1].title}
            credit={figures[1].credit}
          />
          <Card
            elevation={3}
            style={{
              padding: "0px 16px 16px 16px",
              margin: "0px 20px 20px 20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="left"
                color="#E63946"
                style={{ paddingBottom: "16px" }}
              >
                <MouseOutlinedIcon
                  style={{ minWidth: "20px" }}
                  fontSize={"medium"}
                />{" "}
                Interaction - Scale Map
              </Typography>
              <Typography
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h5"
              >
                The map of Victoria, BC below is displayed in small-scale by
                default. If you click the large-scale bottom-right button on the
                map, you will get a detailed view of downtown Victoria. As a
                result, you lose sight of the names of municipalities but gain
                sight of street names and buildings. Notice how the real-world
                units and length of the graphic scale (bottom left of the map)
                vary as you interact with the map.
              </Typography>
            </CardContent>
          </Card>
          <ScaleMap />
          <Question questions={scaleQuestions} />
          <Pagination prev={"/"} next={"/variables"} />
        </Container>
      </Grow>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}

export default Projections;
