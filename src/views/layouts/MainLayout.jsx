/**
 * The layout for every page. There should be a header,
 * components (children), transition (grow) of components
 * and footer.
 */
import React from "react";

import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";

import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main className="main-layout">{children}</main>
      <Footer />
    </React.Fragment>
  );
}
