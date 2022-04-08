import React from "react";

import MainLayout from "../layouts/MainLayout";

import { Link } from "react-router-dom";

import img from "../../img/construction.png";
import vizvars from "../../img/vizvars.png";
import projection from "../../img/projection.png";

import {
  Typography,
  CardMedia,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Checkbox
} from "@mui/material";

let theme = createTheme({
  header: {
    color: "#606c38",
  },
});

theme = responsiveFontSizes(theme);

const cards = [
  {
    title: "Projections and Scale",
    description:
      "Discover map scales and the projections that convert curved 3D surfaces to flat 2D surfaces. ",
    url: "/projections",
    img: projection,
    disabled: false,
  },
  {
    title: "Visual Encoding and Types of Maps",
    description:
      "Learn how visual marks and channels allow geographers to produce thematic maps.",
    url: "/visual",
    img: vizvars,
    disabled: false,
  },
  {
    title: "Classification Schemes",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: img,
    disabled: true,
  },
  {
    title: "Spatial Autocorrelation Statistics",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: img,
    disabled: true,
  },
  {
    title: "Lying with Maps",
    description: "Under ongoing development. Come back another time.",
    url: "/",
    img: img,
    disabled: true,
  },
  {
    title: "Resources",
    description: "GIS resources recommended by the developer(s) of the site.",
    url: "/resources",
    img: img,
    disabled: true,
  },
];

export default function Home() {
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
      <ThemeProvider theme={theme}>
        <div>
          <Container maxWidth="sm" style={{ marginTop: "25px" }}>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Geographic Information Science / Systems
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              View any of the topics below to learn about GIS!{" "}
              <b>Disclaimer:</b> The entire site is under ongoing development.
              However, feedback is still welcome.
            </Typography>
          </Container>
        </div>

        <Container maxWidth="md" style={{ padding: "20px" }}>
          <Typography gutterBottom variant="h3" sx={theme.header}>
            Topics
          </Typography>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
              padding: "0",
              border: 1,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;

              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      style={{ color: "#283618" }}
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                      disabled={cards[value].disabled}
                    />
                  }
                  disablePadding
                  sx={{
                    borderBottom: 1,
                  }}
                >
                  <ListItemButton
                    to={cards[value].url}
                    component={Link}
                    variant="contained"
                    disabled={cards[value].disabled}
                    sx={{
                      "&:hover": {
                        opacity: "0.8",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <CardMedia
                        style={{ padding: "56.25%", width: "100px" }} // 16:9 aspect ratio
                        image={cards[value].img}
                        title={cards[value].title + "image"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ padding: "25px" }}
                      id={labelId}
                      primary={cards[value].title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {cards[value].description}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Container>
      </ThemeProvider>
    </MainLayout>
  );
}
