import React from "react";

import MainLayout from "../layouts/MainLayout";

import Authors from "../../components/Authors/Authors.jsx";
import Quiz from "../../components/Quiz/Quiz.jsx";
import Sources from "../../components/Sources/Sources.jsx";
import Title from "../../components/Title/Title.jsx";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

// The MDX Content you wrote for the page
import Content from "../content/SpatialData.mdx";

// The quiz questions you wrote for the page
import questions from "../questions/SpatialData.json";

// Source you used to write content for the page
const sources = [
  {
    title: "Geospatial Analysis 6th Edition, 2021 update",
    author: "spatialanalysisonline.com",
    url: "https://spatialanalysisonline.com/HTML/index.html?tessellations_and_triangulatio.htm",
  },
  {
    title: "6.4 Geometric Primitives",
    author: "PennState College of Earth and Mineral Sciences",
    url: "https://www.e-education.psu.edu/geog160/node/1948",
  },
  {
    title: "The Ultimate List of GIS Formats and Geospatial File Extensions",
    author: "GISGeography",
    url: "https://gisgeography.com/gis-formats/",
  },
  {
    title: "Tessellation",
    author: "Living Textbook",
    url: "https://ltb.itc.utwente.nl/491/concept/79690",
  },
];

// Who helped write the page?
const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

// Rename the function and title
export default function SpatialData() {
  return (
    <MainLayout>
      <Title name={"Spatial data and its types"} />
      <Container maxWidth="lg" style={{ padding: "20px 0 0" }}>
        <h2>Learn and interact</h2>

        <Card>
          <Content />
        </Card>

        <h2>Test your knowledge</h2>
        <Quiz questions={questions} />
        <Sources sources={sources} />
        <Authors authors={authors} />
      </Container>
    </MainLayout>
  );
}
