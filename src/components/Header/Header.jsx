/**
 * Header.jsx displays information at the top of the page.
 * Right now only the site name is there, but eventually the
 * plan is to access grades and progress reports from the <AppBar>
 */
import React, { useState } from "react";

import {
  DashIcon,
  DashThemeToggle
} from "@didyoumeantoast/dash-components-react";

import "./Header.css";

const LocalStorageThemeKey = "__interactive-learner-gis--theme";

export default function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem(LocalStorageThemeKey)
  );

  // NOTE: this is a quick and dirty way of theme management, refactor
  const setHtmlTheme = (theme) => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem(LocalStorageThemeKey, theme);
    setTheme(theme);
  };

  if (theme !== document.querySelector("html").getAttribute("data-theme")) {
    setHtmlTheme(theme ?? "light");
  }

  return (
    <div className="header">
      <a href="/">
        <DashIcon icon="globe2" scale="l" />
        <h3>Interactive Learner GIS</h3>
      </a>

      <DashThemeToggle
        theme={theme}
        onDashThemeToggleChange={(e) => {
          setHtmlTheme(e.target.theme);
        }}
      />
    </div>
  );
}
