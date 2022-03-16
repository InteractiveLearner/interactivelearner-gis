import React from "react";

import {
  Container,
  Typography,
  Grow,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";

export default function Sources(props) {
  return (
    <Grow in={true} timeout={1000}>
      <Container maxWidth="md" style={{ padding: "10px 0" }}>
        <Typography
          component="h1"
          variant="h3"
          align="left"
          color="#606c38"
          gutterBottom
          style={{ paddingLeft: "16px" }}
        >
          Sources
        </Typography>
        <Card
          elevation={3}
          style={{
            padding: "16px 16px 16px 16px",
            margin: "0px 20px 20px 20px",
          }}
        >
          {props.sources.map((card, index) => (
            <Card
              key={index}
              style={{
                flexDirection: "column",
                height: "100%",
                display: "flex",
                margin: "0px 10px 10px 10px",
              }}
            >
              <CardActionArea
                href={card.url}
                sx={{
                  ".MuiCardActionArea-focusHighlight": {
                    opacity: "0.05",
                  },
                }}
              >
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {card.title}
                  </Typography>
                  <Typography>{card.author}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Card>
        <Grid
          container
          spacing={4}
          style={{ paddingLeft: "16px", paddingTop: "16px" }}
        ></Grid>
      </Container>
    </Grow>
  );
}
