/**
 * The layout for every page. There should be a header,
 * components (children), transition (grow) of components 
 * and footer.
 */
import React from "react";

import { CssBaseline, Grow } from "@mui/material";

import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header.jsx";

export default function MainLayout({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grow in={true} timeout={1000}>
        <main>{children}</main>
      </Grow>
      <Footer />
    </React.Fragment>
  );
}
