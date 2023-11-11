import React from "react";

import MainLayout from "../layouts/MainLayout";

import Authors from "../../components/Authors/Authors.jsx";
import Quiz from "../../components/Quiz/Quiz.jsx";
import Sources from "../../components/Sources/Sources.jsx";
import Title from "../../components/Title/Title.jsx";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

// The MDX Content you wrote for the page
import Content from "../content/Construction.mdx";

// The quiz questions you wrote for the page
import questions from "../questions/Construction.json";

// Source you used to write content for the page
const sources = [
  {
    title: "",
    author: "",
    url: "link here",
  },
];

// Who helped write the page?
const authors = [
  {
    author: "your name here",
    description: "some background about you",
    url: "link to where people can learn more about you",
  },
];

// Rename the function and title
export default function Construction() {
  return (
    <MainLayout>
      <Title name={"Construction"} />
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