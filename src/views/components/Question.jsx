import React from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const theme = createTheme({
  contentHeader: {
    color: "#bc6c25",
    typography: { sm: "h4", xs: "h6" },
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
    typography: { sm: "h5", xs: "subtitle2" },
    paddingTop: "5px",
  },
  answer: {
    typography: { sm: "body1", xs: "body2" },
  },
  icon: {
    verticalAlign: { sm: "middle", xs: "middle" },
    paddingBottom: { sm: "5px", xs: "2.5px" },
    fontSize: { sm: "inherit", xs: "inherit" },
    minWidth: "20px",
  },
});

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
      <Typography sx={theme.answer}>
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
            <Typography align="left" sx={theme.contentHeader}>
              <SchoolIcon sx={theme.icon} /> Test Your Knowledge
            </Typography>
            {this.props.questions.map((card, index) => (
              <div key={index}>
                <Typography
                  gutterBottom
                  component="p"
                  fontWeight="bold"
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
