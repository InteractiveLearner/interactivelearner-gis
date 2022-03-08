import React from "react";

import BreadCrumbs from "../components/BreadCrumbs.jsx";

import { Typography, Grow, Container } from "@mui/material";

export default function Title(props) {
  return (
    <div>
        <Grow in={true} timeout={1000}>
          <Container maxWidth="sm" style={{ marginTop: "25px" }}>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {props.crumbs}
            </Typography>
            <BreadCrumbs crumbs={props.crumbs} />
          </Container>
        </Grow>
      </div>
  );
}
