/**
 * Footer.jsx replaces the HTML <footer> tag for one
 * built using Material UI.
 */
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <h4>Interactive Learner GIS</h4>
      <p>
        Source code available on{" "}
        <a
          style={{ color: "inherit" }}
          href="https://github.com/InteractiveLearner/interactivelearner.github.io"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
      <p>Copyright © Interactive Learner GIS 2023</p>
    </div>
  );
}
