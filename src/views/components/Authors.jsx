import React from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Grow,
} from "@mui/material";

export default function Authors(props) {
  return (
    <Grow in={true} timeout={1000}>
      <Container maxWidth="md" style={{ padding: "10px 0" }}>
        <Typography
          variant="h3"
          align="left"
          color="#606c38"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Authors
        </Typography>
        <Grid
          container
          spacing={4}
          style={{ paddingLeft: "16px" }}
        >
          {props.authors.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                style={{
                  flexDirection: "column",
                  height: "100%",
                  display: "flex",
                  margin: "0px 20px 20px 5px",
                }}
              >
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {card.author}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    style={{ background: "#283618" }}
                    size="small"
                    color="primary"
                    href={card.url}
                    variant="contained"
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grow>
  );
}
