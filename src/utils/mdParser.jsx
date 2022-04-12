import ReactMarkdown from "react-markdown";

import {
  Typography,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme({
  header: {
    color: "#606c38",
    paddingLeft: "16px",
  },
  contentHeader: {
    color: "#bc6c25",
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

export default function mdParser(content) {
  let arr = content.split("\n").map(function (ln) {
    return ln.split("\t");
  });

  return arr.map((c, i) => {
    return (
      <ThemeProvider key={i} theme={theme}>
        <ReactMarkdown
          components={{
            img: (props) => {
              return (
                <img
                  src={require("../assets/images/" + props.src)}
                  alt={props.alt}
                />
              );
            },
            h5: (props) => {
              return (
                <Typography
                  key={0}
                  component="p"
                  variant="h5"
                  sx={theme.contentHeader}
                >
                  {props.children[0]}
                </Typography>
              );
            },
            h3: (props) => {
              return (
                <Typography
                  key={0}
                  component="p"
                  variant="h3"
                  sx={theme.header}
                >
                  {props.children[0]}
                </Typography>
              );
            },
            h2: (props) => {
              return (
                <Typography
                  key={0}
                  component="p"
                  variant="h2"
                  sx={theme.header}
                >
                  {props.children[0]}
                </Typography>
              );
            },
          }}
        >
          {c[0]}
        </ReactMarkdown>
      </ThemeProvider>
    );
  });
}
