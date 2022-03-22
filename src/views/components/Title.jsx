import React from "react";

import BreadCrumbs from "../components/BreadCrumbs.jsx";

import { Typography, Grow, Container } from "@mui/material";

export default function Title(props) {
  return (
    <div>
      <Grow in={true} timeout={1000}>
        <Container maxWidth="sm" style={{ marginTop: "25px" }}>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            sx={{ typography: { sm: "h2", xs: "h4" } }}
          >
            {props.crumbs}
          </Typography>
          <BreadCrumbs crumbs={props.crumbs} />
        </Container>
      </Grow>
    </div>
  );
}
