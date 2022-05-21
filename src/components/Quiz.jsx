/**
 * Quiz.jsx is meant to test user knowledge. Eventually, the
 * goal is to have a more complex quiz system to gauge learning.
 */
import React, { useState } from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  // Snackbar,
  // SnackbarContent,
  // Slide,
} from "@mui/material";

// import Confetti from "react-dom-confetti";

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
  confetti: {
    position: "relative",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
});

theme = responsiveFontSizes(theme);

// const config = {
//   angle: 90,
//   spread: 360,
//   startVelocity: 40,
//   elementCount: 70,
//   dragFriction: 0.12,
//   duration: 3000,
//   stagger: 3,
//   colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
// };

export default function Quiz(props) {
  const numQuestions = props.questions.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [answersSelected, setAnswersSelected] = useState(
    new Array(numQuestions).fill(0)
  );

  const OnOptionSelect = (correctOptionSelected) => {
    if (correctOptionSelected) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < numQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }

    setActiveStep(currentQuestion + 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentQuestion(currentQuestion - 1);
  };

  const renderResultsData = () => {
    return answersSelected.map((selected, index) => {
      let answer = props.questions.questions[index].correctAnswer;
      return (
        <Typography
          key={index}
          gutterBottom
          component="p"
          variant="body1"
          sx={theme.content}
        >
          Q{index + 1}:{" "}
          {selected === answer ? (
            <span style={{ color: "green" }}>Correct</span>
          ) : (
            <span style={{ color: "red" }}>Incorrect or no answer selected</span>
          )}
        </Typography>
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <div style={theme.confetti}>
          <Confetti active={this.state.celebrate} config={config} />
        </div> */}
      <Card elevation={3} sx={theme.card}>
        <CardContent>
          {showScore ? (
            <>
              <Typography
                gutterBottom
                component="p"
                fontWeight="bold"
                variant="body1"
                sx={theme.content}
              >
                You scored {score} out of {props.questions.questions.length}
              </Typography>
              <Typography
                gutterBottom
                component="p"
                fontWeight="bold"
                variant="body1"
                sx={theme.content}
              >
                Results:
              </Typography>
              {renderResultsData()}
              <Button
                style={{ background: "#283618", marginTop: "10px" }}
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowScore(false);
                  setCurrentQuestion(0);
                  setScore(0);
                  setActiveStep(0);
                }}
                variant="contained"
              >
                Take the quiz again?
              </Button>
            </>
          ) : (
            <>
              <Typography
                gutterBottom
                component="p"
                fontWeight="bold"
                variant="body1"
                sx={theme.content}
              >
                Question {currentQuestion + 1}/
                {props.questions.questions.length}
              </Typography>

              <Typography
                gutterBottom
                component="p"
                variant="body1"
                sx={theme.cardContent}
              >
                {props.questions.questions[currentQuestion].question}
              </Typography>

              {props.questions.questions[currentQuestion].options.map(
                (option) => (
                  <div key={option.key} style={{ paddingBottom: "10px" }}>
                    <Card elevation={3}>
                      <CardActionArea
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          OnOptionSelect(
                            option.key ===
                              props.questions.questions[currentQuestion]
                                .correctAnswer
                          );
                          answersSelected[currentQuestion] = option.key;
                          setAnswersSelected(answersSelected);
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
                          {option.answer}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                )
              )}
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                color="inherit"
                disabled={activeStep === numQuestions - 1}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={() => this.setState({ open: false })}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
        >
          <SnackbarContent
            sx={{ backgroundColor: "#283618" }}
            message="Congratulations on completing Test Your Knowledge!"
          />
        </Snackbar> */}
    </ThemeProvider>
  );
}
