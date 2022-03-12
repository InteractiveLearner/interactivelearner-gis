import React from "react";

import { Typography, Card, CardContent, CardActionArea } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersHidden: [],
    };

    for (let index = 0; index < this.props.questions.length; index++) {
      this.state.answersHidden.push(
        <QuestionMarkIcon style={{ minWidth: "20px" }} fontSize={"medium"} />
      );
    }
  }

  showAnswer = (index) => {
    let temp = this.state.answersHidden;

    temp[index] = (
      <Typography style={{ whiteSpace: "pre-line" }}>
        {this.props.questions[index].answer}
      </Typography>
    );

    this.setState({ answersHidden: temp });
  };

  render() {
    return (
      <Card
        elevation={3}
        style={{
          padding: "0px 16px 16px 16px",
          margin: "0px 20px 20px 20px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="left"
            color="#7209b7"
            style={{ paddingBottom: "16px" }}
          >
            <SchoolIcon style={{ minWidth: "20px" }} fontSize={"medium"} /> Test
            Your Knowledge
          </Typography>
          {this.props.questions.map((card, index) => (
            <div key={index}>
              <Typography
                gutterBottom
                color="rgba(0, 0, 0, 0.75)"
                component="p"
                variant="h6"
                sx={{ fontWeight: "bold" }}
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
                  <CardContent align="center" style={{ flexGrow: 1 }}>
                    {this.state.answersHidden[index]}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
}
