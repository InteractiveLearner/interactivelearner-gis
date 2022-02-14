import React from "react";
import { Public } from "@mui/icons-material";
import { Switch, Route, Link, IndexRoute } from "react-router-dom";

import Projections from "./pages/Projections.jsx";

import {
  Typography,
  Button,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Box,
} from "@mui/material";

const cards = [
  { title: "Projections", url: "/projections", component: Projections },
  { title: "Visual Variables", url: "/variables" },
  { title: "Basic and Thematic Maps", url: "/thematic" },
  { title: "Spatial Statistics", url: "statistics"},
  { title: "Lying with Maps", url: "/lying" },
];

export default function App() {
  return (
    <>
      {/* https://www.youtube.com/watch?v=Xoz31I1FuiY */}
      {/* https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/album/Album.tsx */}
      {/* https://www.youtube.com/watch?v=rIoflwHFd6o&list=PLcCp4mjO-z9_4Wak3Uq8dEWC6H1fbSNgL */}
      <CssBaseline />
      {/* Header */}
      <AppBar position="relative">
        <Toolbar>
          <Public /> 
          <Typography variant="h6"> GIS - Interactive Learner</Typography>
        </Toolbar>
      </AppBar>
      {/* Home page */}
      <main>
        <div>
          {/* TODO: Figure out alternative to makeStyles */}
          <Container maxWidth="sm" style={{ marginTop: "25px" }}>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Home
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Purpose of this website...
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md" style={{ padding: "20px 0" }}>
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              // Space on device
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  style={{
                    flexDirection: "column",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <CardMedia
                    style={{ padding: "56.25%" }} // 16:9 aspect ratio
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5">
                      {card.title}
                    </Typography>
                    <Typography>Content Description</Typography>
                  </CardContent>
                  <CardActions>
                    {/* React Router */}
                    <Link component={Projections} to="/projections">
                    <Button
                      size="small"
                      color="primary"
                      href={card.url}
                      //to={card.url}
                      // component={<Link to={card.url}/>}
                      //variant="contained"
                    >
                      View
                    </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box
        sx={{ backgroundColor: "background.paper", p: 6 }}
        component="footer"
      >
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </>
  );
}
