// Sourced from: https://openlayers.org/en/latest/examples/raster.html
import React, { useEffect, useRef, useState } from "react";

import GeoTIFF from "ol/source/GeoTIFF.js";
import Map from "ol/Map.js";
import TileLayer from "ol/layer/WebGLTile.js";
import View from "ol/View.js";

import { DashSelect } from "@didyoumeantoast/dash-components-react";

import "ol/ol.css";

const channels = [
  "visible red",
  "visible green",
  "visible blue",
  "near infrared",
];

function MapView({ zoom }) {
  const ref = useRef(null);
  const mapRef = useRef(null);

  const [state, setState] = useState({
    redChannel: "visible red",
    greenChannel: "visible green",
    blueChannel: "visible blue",
  });

  useEffect(() => {
    if (ref.current && !mapRef.current) {
      const layer = new TileLayer({
        style: {
          // R: 1
          // G: 2
          // B: 3
          // NIR: 4
          variables: {
            // Visible green
            red: 2,
            redMax: 3000,
            // NIR
            green: 4,
            greenMax: 5000,
            // Visible blue
            blue: 3,
            blueMax: 3000,
          },
          color: [
            "array",
            ["/", ["band", ["var", "red"]], ["var", "redMax"]],
            ["/", ["band", ["var", "green"]], ["var", "greenMax"]],
            ["/", ["band", ["var", "blue"]], ["var", "blueMax"]],
            1,
          ],
        },
        source: new GeoTIFF({
          normalize: false,
          sources: [
            {
              url: "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif",
            },
          ],
        }),
      });

      mapRef.current = new Map({
        target: ref.current,
        layers: [layer],
        view: new View({
          projection: "EPSG:4326",
          center: [0, 0],
          zoom: zoom,
          maxZoom: 6,
        }),
      });
    }
  }, [ref, mapRef]);

  return (
    <>
      <div style={{ margin: "inherit" }}>
        <p style={{ margin: 5 }}>Red channel</p>
        <div className="projection-type item">
          <div style={{ maxWidth: "200px" }}>
            <DashSelect
              onDashSelectValueChange={(e) =>
                setState({ ...state, type: e.detail })
              }
            >
              {channels.map((type) => (
                <option
                  key={type}
                  value={type}
                  defaultValue={state.redChannel === type}
                >
                  {type}
                </option>
              ))}
            </DashSelect>
          </div>
        </div>
        <p style={{ margin: 5 }}>Green channel</p>
        <div className="projection-type item">
          <div style={{ maxWidth: "200px" }}>
            <DashSelect
              onDashSelectValueChange={(e) =>
                setState({ ...state, type: e.detail })
              }
            >
              {channels.map((type) => (
                <option
                  key={type}
                  value={type}
                  defaultValue={state.blueChannel === type}
                >
                  {type}
                </option>
              ))}
            </DashSelect>
          </div>
        </div>
        <p style={{ margin: 5 }}>Blue channel</p>
        <div className="projection-type item">
          <div style={{ maxWidth: "200px" }}>
            <DashSelect
              onDashSelectValueChange={(e) =>
                setState({ ...state, type: e.detail })
              }
            >
              {channels.map((type) => (
                <option
                  key={type}
                  value={type}
                  defaultValue={state.greenChannel === type}
                >
                  {type}
                </option>
              ))}
            </DashSelect>
          </div>
        </div>
      </div>

      <div ref={ref} style={{ width: "100%", height: "400px" }} />
    </>
  );
}

export default function RasterSourceOL() {
  return <MapView zoom={2} />;
}
