import React from "react";
import { CssBaseline } from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children }) {

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <main >{children}</main>
            <Footer />
        </React.Fragment>
    );
}