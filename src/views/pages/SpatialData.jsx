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
        <h2>Learn and Interact</h2>

        <Card>
          <Content />
        </Card>

        <h2>Test Your Knowledge</h2>
        <Quiz questions={questions} />
        <Sources sources={sources} />
        <Authors authors={authors} />
      </Container>
    </MainLayout>
  );
}
