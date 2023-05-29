import React from "react";

import MainLayout from "../layouts/MainLayout";

import Authors from "../../components/Authors/Authors.jsx";
import Quiz from "../../components/Quiz/Quiz.jsx";
import Sources from "../../components/Sources/Sources.jsx";
import Title from "../../components/Title/Title.jsx";
import questions from "../questions/VisualEncoding.json";

import Card from "../../components/card/Card";
import Container from "../../components/Container/Container";
import Content from "../content/VisualEncoding.mdx";

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
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

export default function Visual() {
  return (
    <MainLayout>
      <Title name={"Visual Encoding"} />
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
