/**
 * Footer.jsx replaces the HTML <footer> tag for one
 * built using Material UI.
 */
import {
  DashButton,
  DashDropdown,
  DashIconButton,
  DashList,
  DashListItem,
  DashTooltip
} from "@didyoumeantoast/dash-components-react";
import React, { useEffect, useState } from "react";
import { MediaSizes } from "../../constants";
import Button from "../Button/Button";
import Card from "../Card/Card";
import "./Quiz.css";

/**
 * QuestionState is an enum for the state of a question.
 */
const QuestionState = Object.freeze({
  UNANSWERED: "unanswered",
  CORRECT: "correct",
  INCORRECT: "incorrect",
});

/**
 * Creates an array of questions for the quiz's state.
 * @param {*} questions - The questions to create the quiz from.
 * @returns An array of questions for the quiz's state.
 */
function createQuizQuestions(questions) {
  return questions.map((question) => ({
    question: question.question,
    correctAnswer: question.correctAnswer,
    currentAnswer: undefined,
    options: question.options,
    status: QuestionState.UNANSWERED,
  }));
}

/**
 * Gets the status of a question option.
 * @param {*} question - The question to get the status of.
 * @param {Number} key - The key of the question option to get the status of.
 * @returns The status of the question option.
 */
function questionOptionStatus(question, key) {
  if (
    question.status === QuestionState.UNANSWERED ||
    question.currentAnswer !== key
  ) {
    return undefined;
  }

  return question.status === QuestionState.CORRECT ? "success" : "error";
}

export default function Quiz({ questions } = {}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(
    createQuizQuestions(questions.questions)
  );

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [resetBtn, setResetBtn] = useState(null);
  const [questionDropdown, setQuestionDropdown] = useState(null);

  const question = quizQuestions[currentQuestionIndex];
  const hasAnswered = quizQuestions.some(
    (q) => q.status !== QuestionState.UNANSWERED
  );
  const allAnswered = quizQuestions.every(
    (q) => q.status !== QuestionState.UNANSWERED
  );

  /**
   * Watches for the window to resize and updates the isMobile state.
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MediaSizes.MOBILE);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Updates the current question's answer.
   * @param {Number} key - The key of the question option to update the answer to.
   */
  const updateCurrentAnswer = (key) => {
    if (question.currentAnswer === key) {
      return;
    }

    quizQuestions[currentQuestionIndex].status = QuestionState.UNANSWERED;
    quizQuestions[currentQuestionIndex].currentAnswer = key;
    setQuizQuestions([...quizQuestions]);
  };

  /**
   * Moves to the next question
   */
  const nextQuestion = () => {
    setCurrentQuestionIndex(
      Math.min(currentQuestionIndex + 1, quizQuestions.length - 1)
    );
  };

  /**
   * Finishes the quiz.
   */
  const finish = () => {
    if (!allAnswered) {
      return;
    }

    setIsQuizFinished(true);
  };

  /**
   * Checks the current question's answer and updates the question's status.
   */
  const checkAnswer = () => {
    quizQuestions[currentQuestionIndex].status =
      question.currentAnswer === question.correctAnswer
        ? QuestionState.CORRECT
        : QuestionState.INCORRECT;
    setQuizQuestions([...quizQuestions]);
  };

  /**
   * Resets the quiz.
   */
  const reset = () => {
    if (!hasAnswered) {
      return;
    }

    setIsQuizFinished(false);
    setQuizQuestions(createQuizQuestions(questions.questions));
    setCurrentQuestionIndex(0);
  };

  return (
    <Card className="quiz">
      {isQuizFinished ? (
        <h5>
          {quizQuestions.every((q) => q.status === QuestionState.CORRECT) ? (
            <>Congratulations, you got all questions correct! </>
          ) : (
            <>
              You got{" "}
              {quizQuestions.reduce(
                (correct, question) =>
                  correct + (question.status === QuestionState.CORRECT ? 1 : 0),
                0
              )}{" "}
              out of {quizQuestions.length} correct
            </>
          )}
        </h5>
      ) : (
        <>
          <h5 className="quiz-question-header">{question.question}</h5>

          <div className="quiz-options">
            {question.options.map(({ answer, key }) => (
              <Button
                className="quiz-option"
                key={answer + key}
                onClick={() => updateCurrentAnswer(key)}
                appearance={
                  question.currentAnswer === key &&
                  question.status === QuestionState.UNANSWERED
                    ? "solid"
                    : "outline"
                }
                status={questionOptionStatus(question, key)}
              >
                {answer}
              </Button>
            ))}
          </div>
        </>
      )}
      <div className="quiz-footer">
        {isMobile ? (
          <DashDropdown
            ref={(e) => setQuestionDropdown(e)}
            placement="bottom-end"
            autoClose={true}
          >
            <DashButton slot="dropdown-trigger" appearance="outline">
              Q{currentQuestionIndex + 1}
            </DashButton>

            <DashList
              selectionMode="single"
              disableDeselect={true}
              maxItems={6}
            >
              {quizQuestions.map((_, index) => (
                <DashListItem
                  key={index}
                  selected={currentQuestionIndex === index}
                  onDashListItemSelectedChanged={() => {
                    setCurrentQuestionIndex(index);
                    questionDropdown.close();
                  }}
                >
                  Question {index + 1}
                </DashListItem>
              ))}
            </DashList>
          </DashDropdown>
        ) : (
          <span className="quiz-indicator-wrapper">
            <DashIconButton
              ref={setResetBtn}
              className="quiz-reset"
              scale="s"
              icon="arrow-clockwise"
              disabled={!hasAnswered ? true : undefined}
              onClick={reset}
            />
            <DashTooltip
              target={resetBtn}
              enabled={hasAnswered}
              offsetX={5}
              text="Start over"
              placementStrategy="fixed"
              placement="right"
            />
            {quizQuestions.map((_, index) => (
              <Button
                className="quiz-progress"
                key={index}
                scale="s"
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <div
                  className={
                    "quiz-question-indicator" +
                    (currentQuestionIndex === index && !isQuizFinished
                      ? " active"
                      : "") +
                    (" " + quizQuestions[index].status)
                  }
                ></div>
              </Button>
            ))}
          </span>
        )}

        <span>
          {isQuizFinished ? (
            <Button appearance="outline" onClick={reset}>
              Start over?
            </Button>
          ) : (
            <>
              <Button
                appearance="outline"
                disabled={!question.currentAnswer ? true : undefined}
                onClick={checkAnswer}
              >
                Check
              </Button>

              {allAnswered ||
              currentQuestionIndex === quizQuestions.length - 1 ? (
                <Button
                  appearance="outline"
                  disabled={!allAnswered ? true : undefined}
                  onClick={finish}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  appearance="outline"
                  disabled={
                    question.status === QuestionState.UNANSWERED
                      ? true
                      : undefined
                  }
                  onClick={nextQuestion}
                >
                  Next
                </Button>
              )}
            </>
          )}
        </span>
      </div>
    </Card>
  );
}
