/**
 * The layout for every page. There should be a header,
 * components (children), transition (grow) of components
 * and footer.
 */
import React from "react";

import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <main className="main-layout">{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  );
}
