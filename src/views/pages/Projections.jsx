import React, { useState } from "react";

import ProjectionExplorer from "../components/ProjectionExplorer.jsx";

import MainLayout from "../layouts/MainLayout";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

import { Typography, Container } from "@mui/material";

import Sources from "../components/Sources.jsx";

import EmptyMap from "../components/EmptyMap.jsx";

import "../../styles/map.css";

const sources = [
  {
    title: "Source",
    url: "https://www.google.ca/",
  },
  {
    title: "Source",
    url: "https://www.google.ca/",
  },
  {
    title: "Source",
    url: "https://www.google.ca/",
  },
];

function Projections() {
  const [crumbs, setCrumbs] = useState(["Projections and Scale"]);

  return (
    <MainLayout>
      <div>
        <Container maxWidth="sm" style={{ marginTop: "25px" }}>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {crumbs}
          </Typography>
          <BreadCrumbs crumbs={crumbs} />
        </Container>
      </div>
      <Container maxWidth="md" style={{ padding: "20px 0" }}>
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Projections
        </Typography>
        <div style={{ padding: "0px 16px 16px 16px" }}>
          Get familiar with the UI. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Est ullamcorper eget nulla facilisi etiam dignissim.
          Interdum consectetur libero id faucibus nisl tincidunt eget. Elit
          pellentesque habitant morbi tristique senectus et. Commodo odio aenean
          sed adipiscing diam donec adipiscing tristique. Quisque egestas diam
          in arcu cursus euismod. Lectus nulla at volutpat diam ut venenatis
          tellus in metus. Donec pretium vulputate sapien nec sagittis aliquam
          malesuada bibendum arcu. Vitae auctor eu augue ut lectus arcu. Ipsum
          dolor sit amet consectetur. Pulvinar pellentesque habitant morbi
          tristique senectus et netus et. Odio ut enim blandit volutpat maecenas
          volutpat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a
          scelerisque purus. Tellus rutrum tellus pellentesque eu tincidunt
          tortor aliquam nulla facilisi. Vulputate enim nulla aliquet porttitor.
          Praesent tristique magna sit amet. Consequat mauris nunc congue nisi
          vitae suscipit.
        </div>
        <ProjectionExplorer />
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px", paddingTop: "16px" }}
        >
          Scale
        </Typography>
        <div style={{ padding: "0px 16px 16px 16px" }}>
          Get familiar with the UI. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Est ullamcorper eget nulla facilisi etiam dignissim.
          Interdum consectetur libero id faucibus nisl tincidunt eget. Elit
          pellentesque habitant morbi tristique senectus et. Commodo odio aenean
          sed adipiscing diam donec adipiscing tristique. Quisque egestas diam
          in arcu cursus euismod. Lectus nulla at volutpat diam ut venenatis
          tellus in metus. Donec pretium vulputate sapien nec sagittis aliquam
          malesuada bibendum arcu. Vitae auctor eu augue ut lectus arcu. Ipsum
          dolor sit amet consectetur. Pulvinar pellentesque habitant morbi
          tristique senectus et netus et. Odio ut enim blandit volutpat maecenas
          volutpat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a
          scelerisque purus. Tellus rutrum tellus pellentesque eu tincidunt
          tortor aliquam nulla facilisi. Vulputate enim nulla aliquet porttitor.
          Praesent tristique magna sit amet. Consequat mauris nunc congue nisi
          vitae suscipit.
        </div>
        <EmptyMap />
      </Container>
      <Sources sources={sources} />
    </MainLayout>
  );
}

export default Projections;
