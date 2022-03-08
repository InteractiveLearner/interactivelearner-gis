import React from "react";

import { Container, Typography, Grow, Card } from "@mui/material";

export default function Sources(props) {
  return (
    <Grow in={true} timeout={1000}>
      <Container maxWidth="md" style={{ padding: "10px 0" }}>
        <Typography
          component="h1"
          variant="h3"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Sources
        </Typography>
        <Card
          elevation={3}
          style={{
            padding: "16px 16px 16px 16px",
            margin: "0px 20px 20px 20px",
          }}
        >
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
        </Card>
      </Container>
    </Grow>
  );
}
