import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/pages/Home.jsx";
import Projections from "./views/pages/Projections.jsx";
import Variables from "./views/pages/Variables.jsx";
import Resources from "./views/pages/Resources.jsx";
import NotFound from "./views/pages/NotFound.jsx";
import ScrollToTop from "./views/components/ScrollToTop.jsx";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/projections" element={<Projections />} />
        <Route exact path="/variables" element={<Variables />} />
        <Route exact path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}
