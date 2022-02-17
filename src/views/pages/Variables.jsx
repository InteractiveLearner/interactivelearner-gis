import React, { useState } from "react";

import { Typography, Container, CardMedia } from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import Sources from "../components/Sources.jsx";
import BreadCrumbs from "../components/BreadCrumbs.jsx";
import EmptyMap from "../components/maps/EmptyMap.jsx";
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

function Variables() {
  const [crumbs, setCrumbs] = useState(["Visual Variables and Types of Maps"]);
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
          Visual Variables
        </Typography>
        <div style={{ padding: "0px 16px 16px 16px" }}>
          Jacques Bertin Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Est ullamcorper eget nulla facilisi etiam dignissim. Interdum
          consectetur libero id faucibus nisl tincidunt eget. Elit pellentesque
          habitant morbi tristique senectus et. Commodo odio aenean sed
          adipiscing diam donec adipiscing tristique. Quisque egestas diam in
          arcu cursus euismod. Lectus nulla at volutpat diam ut venenatis tellus
          in metus. Donec pretium vulputate sapien nec sagittis aliquam
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
        <Typography
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
          style={{ paddingLeft: "16px", paddingTop: "16px" }}
        >
          Types of Maps
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
        <CardMedia
          component="iframe"
          title="isu map"
          style={{ margin: "inherit", width: "97%" }}
          height={500}
          // width: "80%",
          // margin: "auto"
          image="https://isu-ubc.github.io/clinic-mapping-2/"
        />
      </Container>
      <Sources sources={sources} />
    </MainLayout>
  );
}

export default Variables;
