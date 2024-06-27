import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./initializers/dash-components";

// import defineCustomElements to register custom elements with the custom elements registry
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";

// Register custom elements
defineMapElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets",
});
defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.10.0/assets",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
