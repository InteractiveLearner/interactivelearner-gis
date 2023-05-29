/* Authors.jsx is used for displaying a card for each author */
import { DashGrid } from "@didyoumeantoast/dash-components-react";
import React from "react";
import Button from "../Button/Button";
import Card from "../card/Card";
import Container from "../Container/Container";
import "./Authors.css";

export default function Authors(props) {
  return (
    <Container className="authors">
      <h2>Authors</h2>
      <DashGrid colCs="1" colS="1" colM="2" colL="2" colXl="2">
        {props.authors.map((card, index) => (
          <Card key={index}>
            <h5>{card.author}</h5>
            <p>{card.description}</p>

            <div className="card-footer">
              <Button appearance="outline" href={card.url} target="_blank">
                View profile
              </Button>
            </div>
          </Card>
        ))}
      </DashGrid>
    </Container>
  );
}
