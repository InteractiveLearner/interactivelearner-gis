import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let themeMUI = createTheme({
  header: {
    color: "#0a0908",
    paddingLeft: "16px",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
  },
  // Home styles
  homeHeader: {
    color: "#0a0908",
    marginTop: "8px",
  },
  homeCard: {
    padding: "0px 16px 16px 16px",
    margin: "auto",
    border: 1,
  },
  container: {
    padding: "20px",
  },
  list: {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "background.paper",
    padding: "0",
  },
  listItemButton: {
    "&:hover": {
      opacity: "0.8",
    },
    padding: 0,
  },
  avatar: { background: "transparent" },
});

themeMUI = responsiveFontSizes(themeMUI);
