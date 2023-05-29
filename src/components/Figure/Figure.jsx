/**
 * Figure.jsx is meant to replace the HTML <img> tag to fit
 * within the style of the site. Titles and credits are optional.
 */

import React from "react";

import "./Figure.css";

export default function Footer(props) {
  return (
    <div className="figure">
      <img src={props.img} width="100%" height="100%" />
      <h5>{props.title}</h5>
      {props.credit !== "" && (
        <div className="figure-credit">
          <a
            href={props.url}
            target="_blank"
            style={{
              fontSize: "var(--dash-font-size-1)",
            }}
          >
            {props.credit}
          </a>
        </div>
      )}
    </div>
  );
}
