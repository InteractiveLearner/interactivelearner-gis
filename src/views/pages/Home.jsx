import { DashList } from "@didyoumeantoast/dash-components-react";
import React from "react";
import Card from "../../components/card/Card";
import Container from "../../components/Container/Container";
import NavListItem from "../../components/NavListItem/NavListItem";
import MainLayout from "../layouts/MainLayout";

const cards = [
  {
    title: "Projections",
    description:
      "Discover the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
  },
  {
    title: "Scale",
    description:
      "Explore how map scale can be used to hide and show details on a map.",

    url: "/scale",
  },
  {
    title: "Visual encoding",
    description: "Learn about the main building blocks of visual encoding.",

    url: "/visual",
  },
  {
    title: "Types of maps",
    description:
      "Find out how visual encoding allows geographers to produce thematic maps.",

    url: "/thematic",
  },
  // {
  //   title: "Resources",
  //   description: "GIS resources recommended by the contributors of the site.",
  //   url: "/resources",
  // },
];

export default function Home() {
  return (
    <MainLayout>
      <Container>
        <Card>
          <h1>Welcome!</h1>

          <p>
            The goal of Interactive Learner GIS is to give readers a fun
            environment to develop, refresh or improve their map literacy. The
            content of this website aims to follow a standard geography
            curriculum. Map scale, projections, coordinate systems, spatial
            analysis, relational databases, thematic maps, and spatial
            statistics are some common courses you'd find in such a cirriculum.
          </p>

          <h2>What would you like to learn today?</h2>

          <DashList scale="l" selectionMode="none">
            {cards.map((card, index) => (
              <NavListItem
                key={index}
                icon="mortarboard"
                title={card.title}
                description={card.description}
                href={card.url}
              />
            ))}
          </DashList>
        </Card>
      </Container>
    </MainLayout>
  );
}
