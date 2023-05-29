/* Title.jsx is a basic title with some theming */
import React from "react";
import "./Title.css";

export default function Title({ name } = {}) {
  return <h1 className="title">{name}</h1>;
}
