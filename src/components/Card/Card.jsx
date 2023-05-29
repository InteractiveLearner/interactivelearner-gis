import React from "react";
import "./Card.css";

export default function Card({ children, className } = {}) {
  return <div className={"card " + (className ?? "")}>{children}</div>;
}
