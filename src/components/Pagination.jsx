/**
 * Pagination.jsx is not ready yet but the plan is to use it
 * for navigating between chapters. 
 */
import React from "react";

import { Link } from "react-router-dom";

import { Button, Box } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Pagination(props) {
  return (
    <Box
      component="span"
      m={1}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        display: "flex",
        margin: "0px 20px 0px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#152403" }}
        to={props.prev}
        component={Link}
        startIcon={
          <ArrowBackIcon
            style={{
              marginBottom: "3px",
            }}
          />
        }
      >
        Previous Page
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#152403" }}
        to={props.next}
        component={Link}
        endIcon={
          <ArrowForwardIcon
            style={{
              marginBottom: "3px",
            }}
          />
        }
      >
        Next Page
      </Button>
    </Box>
  );
}
