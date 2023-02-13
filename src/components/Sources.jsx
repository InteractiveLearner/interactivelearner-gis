/**
 * The Sources.jsx is for referencing material used for a chapter.
 */
import React from "react";

import {
  Container,
  Card,
  Typography,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

let theme = createTheme({
  header: {
    color: "#0a0908",
  },
  card: {
    padding: "0px 16px 16px 16px",
    margin: "0px 20px 20px 20px",
    minWidth: "20px",
  },
  container: {
    padding: "0px 20px 20px 20px",
  },
  list: {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "background.paper",
    padding: "0",
    border: 1,
    borderRadius: "5px",
  },
  listItemButton: {
    "&:hover": {
      opacity: "0.8",
    },
  },
  avatar: { background: "transparent" },
});

theme = responsiveFontSizes(theme);

export default function Sources(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={theme.container}>
        <Typography variant="h3" sx={theme.header} gutterBottom>
          Sources
        </Typography>
        <Card elevation={3}>
          <List dense sx={theme.list}>
            {props.sources.map((card, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  borderBottom: index === props.sources.length - 1 ? 0 : 1,
                }}
              >
                <ListItemButton
                  component="a"
                  href={card.url}
                  target="_blank"
                  variant="contained"
                  sx={theme.listItemButton}
                >
                  <ListItemAvatar>
                    <Avatar sx={theme.avatar}>&#128214;</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={card.title} secondary={card.author} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
