import React from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

let theme = createTheme({
  contentHeader: {
    color: "#bc6c25",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
  },
  cardContent: {
    padding: "8px 0px 8px 0px",
  },
  content: {
    color: "rgba(0, 0, 0, 1)",
    paddingTop: "5px",
  },
  icon: {
    verticalAlign: "middle",
    paddingBottom: "5px",
    fontSize: "inherit",
  },
});

theme = responsiveFontSizes(theme);

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersHidden: [],
    };

    for (let index = 0; index < this.props.questions.length; index++) {
      this.state.answersHidden.push(<QuestionMarkIcon />);
    }
  }

  showAnswer = (index) => {
    let temp = this.state.answersHidden;

    temp[index] = (
      <Typography variant="body1">
        {this.props.questions[index].answer}
      </Typography>
    );

    this.setState({ answersHidden: temp });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Card elevation={3} sx={theme.card}>
          <CardContent sx={theme.cardContent}>
            <Typography align="left" variant="h4" sx={theme.contentHeader}>
              <SchoolIcon sx={theme.icon} /> Test Your Knowledge
            </Typography>
            {this.props.questions.map((card, index) => (
              <div key={index}>
                <Typography
                  gutterBottom
                  component="p"
                  fontWeight="bold"
                  variant="body1"
                  sx={theme.content}
                >
                  {card.question}
                </Typography>
                <Card elevation={3}>
                  <CardActionArea
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      this.showAnswer(index);
                    }}
                    sx={{
                      ".MuiCardActionArea-focusHighlight": {
                        opacity: "0.025",
                      },
                    }}
                  >
                    <CardContent
                      sx={theme.cardContent}
                      align="center"
                      style={{ flexGrow: 1 }}
                    >
                      {this.state.answersHidden[index]}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
      </ThemeProvider>
    );
  }
}
