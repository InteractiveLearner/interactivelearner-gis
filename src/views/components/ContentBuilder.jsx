import React from "react";

import {
  Typography,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import { styled } from "@mui/system";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

let theme = createTheme({
  contentHeader: {
    color: "#bc6c25",
  },
});

theme = responsiveFontSizes(theme);

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", position: "right" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ContentBuilder(props) {
  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "0px 20px 20px 20px" }}>
        {props.topics.map((topic, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                <Typography variant="h4" sx={theme.contentHeader}>
                  {topic.title}
                </Typography>
                <topic.icon sx={{ marginLeft: "auto", alignSelf: "center" }} />
              </AccordionSummary>
              <AccordionDetails>
                {topic.content.map((content) => {
                  return content;
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </ThemeProvider>
  );
}
