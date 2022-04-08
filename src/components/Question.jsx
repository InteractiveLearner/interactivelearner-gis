import React from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Snackbar,
  SnackbarContent,
  Slide,
} from "@mui/material";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

let theme = createTheme({
  contentHeader: {
    color: "#bc6c25",
  },
  card: {
    padding: "8px 16px 0px 16px",
    margin: "0px 20px 20px 20px",
    border: 1,
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
      open: false,
      solved: 0,
    };

    for (let index = 0; index < this.props.questions.length; index++) {
      this.state.answersHidden.push(<QuestionMarkIcon />);
    }
  }

  showAnswer = (index) => {
    let temp = this.state.answersHidden;
    let score = this.state.solved + 1;

    temp[index] = (
      <Typography variant="body1">
        {this.props.questions[index].answer}
      </Typography>
    );

    this.setState({ answersHidden: temp });

    this.setState({ solved: score });

    if (this.props.questions.length - 1 === this.state.solved) {
      this.setState({ open: true });
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
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
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={() => this.setState({ open: false })}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
        >
          <SnackbarContent
            sx={{ backgroundColor: "#283618" }}
            message="Congratulations on completing Test Your Knowledge!"
          />
        </Snackbar>
      </ThemeProvider>
    );
  }
}
