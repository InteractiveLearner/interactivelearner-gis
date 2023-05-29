/**
 * The Sources.jsx is for referencing material used for a chapter.
 */
import React from "react";

import Card from "../card/Card";

import { DashList } from "@didyoumeantoast/dash-components-react";

import NavListItem from "../NavListItem/NavListItem";

export default function Sources(props) {
  return (
    <>
      <h2>Sources</h2>
      <Card noPadding>
        <DashList scale="l" selectionMode="none">
          {props.sources.map((card, index) => (
            <NavListItem
              key={index}
              href={card.url}
              title={card.title}
              description={card.author}
              target="_blank"
              icon="journal-bookmark-fill"
            ></NavListItem>
          ))}
        </DashList>
      </Card>
    </>
  );
}
