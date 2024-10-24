// Components for global use
import ProjectionExplorer from "../../components/mapping/ProjectionExplorer.vue";
import ContentFigure from "../../components/ui/ContentFigure.vue";
import Sources from "../../components/ui/Sources.vue";

// Layout
import MyLayout from "./MyLayout.vue";

// CSS
import "./custom.css";

/** @type {import('vitepress').Theme} */
export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component("ProjectionExplorer", ProjectionExplorer);
    app.component("ContentFigure", ContentFigure);
    app.component("Sources", Sources);
  },
};
