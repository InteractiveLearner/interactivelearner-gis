// Web components for global use
import { defineCustomElements } from "@esri/calcite-components/dist/esm/loader";
// CDN hosted assets
defineCustomElements(globalThis, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.13.2/assets"
});

// Vue components for global use
import ProjectionExplorer from "../../components/mapping/ProjectionExplorer.vue";
import ScaleMap from "../../components/mapping/ScaleMap.vue";
import ContentFigure from "../../components/ui/ContentFigure.vue";
import Sources from "../../components/ui/Sources.vue";
import Quiz from "../../components/ui/Quiz.vue";

// Layout
import MyLayout from "./MyLayout.vue";

// CSS
import "./custom.css";

/** @type {import('vitepress').Theme} */
export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component("ProjectionExplorer", ProjectionExplorer);
    app.component("ScaleMap", ScaleMap);
    app.component("ContentFigure", ContentFigure);
    app.component("Quiz", Quiz);
    app.component("Sources", Sources);
  },
};
