import React from "react";

import MainLayout from "../layouts/MainLayout";

import Authors from "../../components/Authors/Authors.jsx";
import Quiz from "../../components/Quiz/Quiz.jsx";
import Sources from "../../components/Sources/Sources.jsx";
import Title from "../../components/Title/Title.jsx";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

import Content from "../content/Scale.mdx";
import questions from "../questions/Scale.json";

const sources = [
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

export default function Scale() {
  return (
    <MainLayout>
      <Title name={"Scale"} />
      <Container>
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
