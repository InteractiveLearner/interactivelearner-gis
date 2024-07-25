// ArcgisMapIframe.jsx
import React from "react";

const ArcgisMapIframe = ({ itemId, title, zoom }) => (
  <iframe
    style={{ width: "100%", height: "500px", border: "none" }}
    srcDoc={`
      <!DOCTYPE html>
      <html lang='en'>
      <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>${title}</title>
        <style>
          html,
          body {
            background-color: var(--calcite-ui-foreground-2);
            padding: 0;
            margin: 0;
            width: 100vw;
            height: 100vh;
          }
          arcgis-map {
            padding: 0;
            margin: 0;
            min-width: 0;
            width: 100%;
            height: 600px;
            display: block;
          }
          calcite-shell {
            position: relative;
          }
        </style>
        <script type="module" src="https://js.arcgis.com/calcite-components/2.10.1/calcite.esm.js"></script>
        <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/2.10.1/calcite.css" />
        <link rel='stylesheet' href='https://js.arcgis.com/4.30/esri/themes/dark/main.css'>
        <script src='https://js.arcgis.com/4.30/'></script>
        <script type='module' src='https://js.arcgis.com/map-components/4.30/arcgis-map-components.esm.js'></script>
      </head>
      <body>
        <calcite-shell class="calcite-mode-dark">
            <calcite-navigation slot="header">
                <calcite-navigation-logo slot="logo" heading='${title}' />
            </calcite-navigation>
            <arcgis-map item-id='${itemId}' zoom='${zoom}'>
            <arcgis-expand position='top-right'>
                <arcgis-layer-list></arcgis-layer-list>
            </arcgis-expand>
            <arcgis-legend position='bottom-left'></arcgis-legend>
            </arcgis-map>
        </calcite-shell >
      </body>
      </html>
    `}
  ></iframe>
);

export default ArcgisMapIframe;
