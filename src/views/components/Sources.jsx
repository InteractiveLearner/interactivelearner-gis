import React from "react";

import { Container, Typography } from "@mui/material";

export default function Sources(props) {
  return (
    <Container maxWidth="md" style={{ padding: "10px 0" }}>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        color="textPrimary"
        gutterBottom
        style={{ paddingLeft: "16px" }}
      >
        Sources
      </Typography>
      {props.sources.map((source, index) => (
        <div align="left" key={index} style={{ padding: "0 16px 0  16px" }}>
          {source.title}
          {": "}
          <a
            style={{ color: "inherit" }}
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </div>
      ))}
    </Container>
  );
}
