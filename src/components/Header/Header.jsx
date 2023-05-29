/**
 * Header.jsx displays information at the top of the page.
 * Right now only the site name is there, but eventually the
 * plan is to access grades and progress reports from the <AppBar>
 */
import React from "react";

import {
  DashIcon,
  DashThemeToggle
} from "@didyoumeantoast/dash-components-react";

import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <a href="/">
        <DashIcon icon="globe" />
        <h3>Interactive Learner GIS</h3>
      </a>

      <DashThemeToggle
        theme="light"
        onDashThemeToggleChange={(e) =>
          document
            .querySelector("html")
            .setAttribute("data-theme", e.target.theme)
        }
      />
    </div>
  );
}
