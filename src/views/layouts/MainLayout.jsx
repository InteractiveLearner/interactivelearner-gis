import React from "react";
import { CssBaseline, Grow } from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";

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
