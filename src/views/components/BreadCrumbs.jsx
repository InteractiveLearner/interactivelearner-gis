import React from "react";

import { Link } from "react-router-dom";

import { Breadcrumbs, Typography } from "@mui/material";

export default function BreadCrumbs(props) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Link underline="hover" color="inherit" to="/">
        Home
      </Link>
      <Typography color="text.primary">{props.crumbs}</Typography>
    </Breadcrumbs>
  );
}
