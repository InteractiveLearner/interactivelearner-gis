/**
 * Figure.jsx is meant to replace the HTML <img> tag to fit
 * within the style of the site. Titles and credits are optional.
 */

import React from "react";
import Card from "../card/Card";

export default function Footer(props) {
  return (
    <Card>
      <img src={props.img} width="100%" height="100%" />
      <h5>{props.title}</h5>
      {props.credit !== "" && (
        <a
          href={props.url}
          target="_blank"
          style={{
            fontSize: "var(--dash-font-size-1)",
          }}
        >
          {props.credit}
        </a>
      )}
    </Card>
  );
}
