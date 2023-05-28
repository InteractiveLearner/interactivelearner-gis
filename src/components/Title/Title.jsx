/* Title.jsx is a basic title with some theming */
import React from "react";
import Container from "../Container/Container.jsx";
import "./Title.css";

export default function Title({ name } = {}) {
  return (
    <Container>
      <h1 className="title">{name}</h1>
    </Container>
  );
}
