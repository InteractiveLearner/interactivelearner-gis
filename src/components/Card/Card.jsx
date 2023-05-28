import React from "react";
import "./Card.css";

export default function Card({ children } = {}) {
  return <div className="card">{children}</div>;
}
