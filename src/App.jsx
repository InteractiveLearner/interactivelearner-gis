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
  SpatialDataContent,
  VisualEncodingContent,
  MapTypesContent,
  ClassificationContent,
  SpatialStatisticsContent,
} from "./views/content";

import {
  ProjectionQuestions,
  ScaleQuestions,
  SpatialDataQuestions,
  VisualEncodingQuestions,
  MapTypesQuestions,
  ClassificationQuestions,
  SpatialStatisticsQuestions,
} from "./views/questions";

import {
  ProjectionSources,
  ScaleSources,
  SpatialDataSources,
  VisualEncodingSources,
  MapTypesSources,
  ClassificationSources,
  SpatialStatisticsSources,
} from "./views/sources";

import {
  ProjectionAuthors,
  ScaleAuthors,
  SpatialDataAuthors,
  VisualEncodingAuthors,
  MapTypesAuthors,
  ClassificationAuthors,
  SpatialStatisticsAuthors,
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
          path="/spatial-data"
          element={
            <ContentLayout
              title="Spatial data and its types"
              content={SpatialDataContent}
              questions={SpatialDataQuestions}
              sources={SpatialDataSources}
              authors={SpatialDataAuthors}
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
          path="/classification"
          element={
            <ContentLayout
              title="Classifying data"
              content={ClassificationContent}
              questions={ClassificationQuestions}
              sources={ClassificationSources}
              authors={ClassificationAuthors}
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
