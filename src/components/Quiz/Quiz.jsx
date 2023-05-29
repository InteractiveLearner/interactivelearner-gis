/**
 * Quiz.jsx is meant to test user knowledge. Eventually, the
 * goal is to have a more complex quiz system to gauge learning.
 */
import React, { useState } from "react";

import "./Quiz.css";

import Button from "../Button/Button";
import Card from "../card/Card";

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
        <div key={index} className="quiz-result-data">
          <span className="quiz-result-data-question-num">Q{index + 1}: </span>
          {selected === answer ? (
            <span className="quiz-correct-answer">Correct</span>
          ) : (
            <span className="quiz-incorrect-answer">
              Incorrect or no answer selected
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <Card className="quiz">
      {showScore ? (
        <>
          <h4>
            You scored {score} out of {props.questions.questions.length}
          </h4>
          <h5>Results:</h5>
          <div className="quiz-results-data">{renderResultsData()}</div>
          <Button
            scale="l"
            appearance="outline"
            onClick={() => {
              setShowScore(false);
              setCurrentQuestion(0);
              setScore(0);
              setActiveStep(0);
              setAnswersSelected(new Array(numQuestions).fill(0));
            }}
          >
            Take the quiz again?
          </Button>
        </>
      ) : (
        <>
          <h4>
            Question {currentQuestion + 1}/{props.questions.questions.length}
          </h4>

          <p>{props.questions.questions[currentQuestion].question}</p>

          <div className="quiz-answers-container">
            {props.questions.questions[currentQuestion].options.map(
              (option) => (
                <Button
                  key={option.key}
                  appearance="outline"
                  onClick={() => {
                    OnOptionSelect(
                      option.key ===
                        props.questions.questions[currentQuestion].correctAnswer
                    );
                    answersSelected[currentQuestion] = option.key;
                    setAnswersSelected(answersSelected);
                  }}
                >
                  {option.answer}
                </Button>
              )
            )}
          </div>
          <div className="quiz-footer">
            <Button scale="l" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              scale="l"
              disabled={activeStep === numQuestions - 1}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
