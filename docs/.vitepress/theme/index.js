// Vue components for global use
import ProjectionExplorer from "../../components/mapping/ProjectionExplorer.vue";
import ScaleMap from "../../components/mapping/ScaleMap.vue";
import VisualVariables from "../../components/mapping/VisualVariables.vue";
import RasterUHI from "../../components/mapping/RasterUHI.vue";
import ReferenceMap from "../../components/mapping/ReferenceMap.vue";
import ArcgisCalciteMap from "../../components/mapping/ArcgisCalciteMap.vue";
import LeafletMarker from "../../components/mapping/LeafletMarker.vue";
import BasicArcgisMap from "../../components/mapping/BasicArcgisMap.vue";
import ClassifiedMap from "../../components/mapping/ClassifiedMap.vue";
import VectorAndRaster from '../../components/mapping/VectorAndRaster.vue';
import MisleadingProjection from "../../components/mapping/MisleadingProjection.vue";
import MisleadingTheme from "../../components/mapping/MisleadingTheme.vue";
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
    app.component("VisualVariables", VisualVariables);
    app.component("ReferenceMap", ReferenceMap);
    app.component("RasterUHI", RasterUHI);
    app.component("ArcgisCalciteMap", ArcgisCalciteMap);
    app.component("LeafletMarker", LeafletMarker);
    app.component("BasicArcgisMap", BasicArcgisMap);
    app.component("ClassifiedMap", ClassifiedMap);
    app.component("VectorAndRaster", VectorAndRaster);
    app.component("MisleadingProjection", MisleadingProjection);
    app.component("MisleadingTheme", MisleadingTheme);
    app.component("ContentFigure", ContentFigure);
    app.component("Quiz", Quiz);
    app.component("Sources", Sources);
  },
};
