import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";

// define custom elements in the browser, and load the assets from the CDN
defineMapElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });
defineCalciteElements(window, { resourcesUrl: "https://js.arcgis.com/calcite-components/2.10.1/assets" });
