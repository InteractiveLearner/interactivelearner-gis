// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";

// Initialize web component libraries
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";

defineMapElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });
defineCalciteElements(window, { resourcesUrl: "https://js.arcgis.com/calcite-components/2.10.1/assets" });

// CSS
import "./custom.css";

// Import all components globally
import ProjectionExplorer from '../../components/mapping/ProjectionExplorer.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ProjectionExplorer", ProjectionExplorer);
  },
};
