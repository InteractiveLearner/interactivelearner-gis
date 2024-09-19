import { DashList } from "@didyoumeantoast/dash-components-react";
import React from "react";
import Container from "../../components/Container/Container";
import NavListItem from "../../components/NavListItem/NavListItem";
import MainLayout from "../../components/MainLayout/MainLayout";

const cards = [
  {
    title: "Projections",
    description:
      "Discover the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
    icon: "globe2",
  },
  {
    title: "Scale",
    description:
      "Explore how map scale can be used to hide and show details on a map.",
    url: "/scale",
    icon: "zoom-in",
  },
  {
    title: "Spatial data and its types",
    description: "Check out the key elements of spatial data and its types.",
    url: "/spatial-data",
    icon: "activity",
  },
  {
    title: "Visual encoding",
    description: "Learn about the main building blocks of visual encoding / data visualization.",
    url: "/visual",
    icon: "bounding-box",
  },
  {
    title: "Types of maps",
    description:
      "Find out how visual encoding allows geographers to produce thematic maps.",
    url: "/thematic",
    icon: "map",
  },
  {
    title: "Classifying data",
    description:
      "Discover the different classification schemes used in thematic mapping.",
    url: "/classification",
    icon: "pencil",
  },
  {
    title: "Spatial autocorrelation statistics",
    description:
      "Understand how spatial autocorrelation statistics can help you analyze spatial data.",
    url: "/spatial-stats",
    icon: "calculator",
  },
  // {
  //   title: "Relational databases in GIS",
  //   description:
  //     "Learn how relational databases can be used to store and manage spatial data.",
  //   url: "/relational-databases",
  //   icon: "server",
  // },
  // {
  //   title: "WebGIS",
  //   description:
  //     "Explore the world of WebGIS and learn how to create your own web mapping applications.",
  //   url: "/web-gis",
  //   icon: "laptop",
  // },
  // {
  //   title: "GIS and BIM",
  //   description:
  //     "Discover how GIS and BIM can be integrated to create a more comprehensive view of the built environment.",
  //   url: "/gis-bim",
  //   icon: "building",
  // },
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
        <h1>Welcome!</h1>

        <p>
          Whether you're here to learn, refresh your knowledge, or improve your
          map literacy, Interactive Learner GIS is your gateway to a captivating
          journey through geography!
        </p>

        <h2>What would you like to learn today?</h2>

        <DashList scale="l" selectionMode="none">
          {cards.map((card, index) => (
            <NavListItem
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              href={card.url}
            />
          ))}
        </DashList>
      </Container>
    </MainLayout>
  );
}
