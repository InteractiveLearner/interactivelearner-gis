import React from "react";

import {
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";

let theme = createTheme({
  header: {
    color: "#606c38",
  },
  card: {
    padding: "0px 16px 16px 16px",
    margin: "0px 20px 20px 20px",
    minWidth: "20px",
  },
});

theme = responsiveFontSizes(theme);

export default function Sources(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ padding: "20px" }}>
        <Typography variant="h3" sx={theme.header} gutterBottom>
          Sources
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
          {props.sources.map((card, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: 1,
              }}
            >
              <ListItemButton
                component="a"
                href={card.url}
                variant="contained"
                sx={{
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
              >
                <ListItemAvatar>
                  <LanguageIcon />
                </ListItemAvatar>
                <ListItemText primary={card.title} secondary={card.author} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}
