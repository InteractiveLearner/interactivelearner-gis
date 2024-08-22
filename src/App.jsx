import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/app.css";

// Pages
import Home from "./views/pages/Home.jsx";
import NotFound from "./views/pages/NotFound.jsx";
import ContentLayout from "./components/ContentLayout/ContentLayout.jsx";

// Content for pages
import {
  ProjectionContent,
  ScaleContent,
  VisualEncodingContent,
  MapTypesContent,
  SpatialStatisticsContent
} from "./views/content";

import {
  ProjectionQuestions,
  ScaleQuestions,
  VisualEncodingQuestions,
  MapTypesQuestions,
  SpatialStatisticsQuestions
} from "./views/questions";

import {
  ProjectionSources,
  ScaleSources,
  VisualEncodingSources,
  MapTypesSources,
  SpatialStatisticsSources
} from "./views/sources";

import {
  ProjectionAuthors,
  ScaleAuthors,
  VisualEncodingAuthors,
  MapTypesAuthors,
  SpatialStatisticsAuthors
} from "./views/authors";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<NotFound />} />
        <Route
          exact
          path="/projections"
          element={
            <ContentLayout
              title="Projections"
              content={ProjectionContent}
              questions={ProjectionQuestions}
              sources={ProjectionSources}
              authors={ProjectionAuthors}
            />
          }
        />
        <Route
          exact
          path="/scale"
          element={
            <ContentLayout
              title="Scale"
              content={ScaleContent}
              questions={ScaleQuestions}
              sources={ScaleSources}
              authors={ScaleAuthors}
            />
          }
        />
        <Route
          exact
          path="/visual"
          element={
            <ContentLayout
              title="Visual encoding"
              content={VisualEncodingContent}
              questions={VisualEncodingQuestions}
              sources={VisualEncodingSources}
              authors={VisualEncodingAuthors}
            />
          }
        />
        <Route
          exact
          path="/thematic"
          element={
            <ContentLayout
              title="Types of maps"
              content={MapTypesContent}
              questions={MapTypesQuestions}
              sources={MapTypesSources}
              authors={MapTypesAuthors}
            />
          }
        />
        <Route
          exact
          path="/spatial-stats"
          element={
            <ContentLayout
              title="Spatial autocorrelation statistics"
              content={SpatialStatisticsContent}
              questions={SpatialStatisticsQuestions}
              sources={SpatialStatisticsSources}
              authors={SpatialStatisticsAuthors}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
