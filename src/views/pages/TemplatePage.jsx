import React from "react";

import {
  Typography,
  Container,
  CardMedia,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Checkbox,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import SchoolIcon from "@mui/icons-material/School";

import MainLayout from "../layouts/MainLayout";

import Title from "../../components/Title.jsx";
import ContentBuilder from "../../components/ContentBuilder.jsx";
import Figure from "../../components/Figure.jsx";
import Question from "../../components/Question.jsx";
import Sources from "../../components/Sources.jsx";
import Authors from "../../components/Authors.jsx";

import "../../styles/map.css";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
  },
  cardContent: {
    padding: "0px 0px 8px 0px",
  },
  content: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "0px 0px 16px 0px",
  },
  contentBullets: {
    color: "rgba(0, 0, 0, 0.75)",
    padding: "0px 0px 16px 0px",
  },
});

theme = responsiveFontSizes(theme);

const Questions = [
  {
    question: "Q",
    answer: "A",
  },
];

const Topic = [
  {
    type: "content",
    title: "Content",
    icon: MapOutlinedIcon,
    content: [],
  },
  {
    type: "content",
    title: "Content",
    icon: MapOutlinedIcon,
    content: [],
  },
  {
    type: "interaction",
    title: "Interaction",
    icon: MouseOutlinedIcon,
    content: [],
  },
  {
    type: "test",
    title: "Test Your Knowledge",
    icon: SchoolIcon,
    content: [[<Question key={0} questions={Questions} />]],
  },
];

const sources = [
  {
    title: "Source",
    author: "Google",
    url: "https://www.google.ca/",
  },
  {
    title: "Source",
    author: "Google",
    url: "https://www.google.ca/",
  },
  {
    title: "Source",
    author: "Google",
    url: "https://www.google.ca/",
  },
];

const authors = [
  {
    author: "Omar Kawach",
    description: "Developer of Interactive Learner GIS",
    url: "https://github.com/omarkawach",
  },
];

function Resources() {
  const [checked, setChecked] = React.useState([-1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <MainLayout>
      <Title crumbs={"Template Page"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ padding: "20px 0px 0px 0px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography gutterBottom variant="h3" sx={theme.header}>
              Title
            </Typography>
            <Checkbox
              edge="end"
              style={{ color: "#283618", width: "85px" }}
              onChange={handleToggle(0)}
              checked={checked.indexOf(0) !== -1}
              sx={{ marginLeft: "auto" }}
            />
          </div>
          <ContentBuilder topics={Topic} />
        </Container>
      </ThemeProvider>
      <Sources sources={sources} />
      <Authors authors={authors} />
    </MainLayout>
  );
}

export default Resources;
