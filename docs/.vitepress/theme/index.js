// Initialize web component libraries
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";

defineMapElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets",
});
defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.10.1/assets",
});

// Components for global use
import ProjectionExplorer from "../../components/mapping/ProjectionExplorer.vue";

// Layout
import MyLayout from "./MyLayout.vue";

// CSS
import "./custom.css";

/** @type {import('vitepress').Theme} */
export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component("ProjectionExplorer", ProjectionExplorer);
  },
};
