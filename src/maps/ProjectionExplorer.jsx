import React, { useEffect, useState } from "react";

import * as d3 from "d3";

import { useD3 } from "../hooks/useD3.jsx";

import { DashSelect } from "@didyoumeantoast/dash-components-react";
import Slider from "../components/Slider/Slider.jsx";
import "../styles/projection.css";

const DefaultProjection = "AzimuthalEqualArea";
const ProjectionTypes = [
  "Azimuthal Equal Area",
  "Azimuthal Equidistant",
  "Albers",
  "Conic Conformal",
  "Conic Equal Area",
  "Conic Equidistant",
  "Equirectangular",
  "Mercator",
  "TransverseMercator",
  // What is transverse mercator for?
];

const Circles = [
  [-135, 0],
  [-90, 0],
  [-45, 0],
  [0, 0],
  [45, 0],
  [90, 0],
  [135, 0],
  [180, 0],
  [0, -70],
  [0, -35],
  [0, 35],
  [0, 70],
  [180, -70],
  [180, -35],
  [180, 35],
  [180, 70],
];

const GeoGenerator = d3.geoPath().projection(DefaultProjection);
const Graticule = d3.geoGraticule();
const GeoCircle = d3.geoCircle().radius(10).precision(1);

export default function ProjectionExplorer() {
  const [geojson, setGeoJson] = useState(null);
  let projection;
  const [state, setState] = useState({
    type: DefaultProjection,
    scale: 120,
    translateX: 450,
    translateY: 250,
    centerLon: 0,
    centerLat: 0,
    rotateLambda: 0.1,
    rotatePhi: 0,
    rotateGamma: 0,
  });

  useEffect(() => {
    d3.json(
      "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
    ).then((json, err) => {
      setGeoJson(json);
    });
  }, []);

  useEffect(() => {
    update();
  }, [state, geojson]);

  function update() {
    if (!geojson) {
      return;
    }

    // Update projection
    projection = d3["geo" + state.type.replace(/\s/g, "")]();
    GeoGenerator.projection(projection);
    projection
      .scale(state.scale)
      .translate([state.translateX, state.translateY])
      .center([state.centerLon, state.centerLat])
      .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma]); // Update world map

    var u = d3.select("g.map").selectAll("path").data(geojson.features);
    u.enter().append("path").merge(u).attr("d", GeoGenerator); // Update projection center

    var projectedCenter = projection([state.centerLon, state.centerLat]);
    d3.select(".projection-center")
      .attr("cx", projectedCenter[0])
      .attr("cy", projectedCenter[1]); // Update graticule

    d3.select(".graticule path").datum(Graticule()).attr("d", GeoGenerator); // Update circles

    u = d3
      .select(".circles")
      .selectAll("path")
      .data(
        Circles.map(function (d) {
          GeoCircle.center(d);
          return GeoCircle();
        })
      );
    u.enter().append("path").merge(u).attr("d", GeoGenerator);
  }

  const ref = useD3(() => {});

  return (
    <>
      <div className="menu" style={{ margin: "inherit" }}>
        <div className="projection-type item">
          <div style={{ maxWidth: "200px" }}>
            <DashSelect
              onDashSelectValueChange={(e) =>
                setState({ ...state, type: e.detail })
              }
            >
              {ProjectionTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  defaultValue={state.type === type}
                >
                  {type}
                </option>
              ))}
            </DashSelect>
          </div>
        </div>
        <div className="slider item">
          <Slider
            label="Scale"
            value={state.scale}
            min={0}
            max={400}
            minLabelWidth={30}
            maxLabelWidth={30}
            onSliderValueChange={(value) => {
              setState({ ...state, scale: value });
            }}
          />
        </div>
        <div className="slider item">
          <Slider
            label="Center - Longitude"
            value={state.centerLon}
            min={-180}
            max={180}
            minLabelWidth={30}
            maxLabelWidth={30}
            onSliderValueChange={(value) => {
              setState({ ...state, centerLon: value });
            }}
          />
        </div>
        <div className="slider item">
          <Slider
            label="Center - Latitude"
            value={state.centerLat}
            min={-90}
            max={90}
            minLabelWidth={30}
            maxLabelWidth={30}
            onSliderValueChange={(value) => {
              setState({ ...state, centerLat: value });
            }}
          />
        </div>
        <svg
          ref={ref}
          width="95%"
          height="500px"
          viewBox="0 0 960 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="graticule">
            <path></path>
          </g>
          <g className="circles"></g>
          <g className="map"></g>
          <circle className="projection-center" r="4"></circle>
        </svg>
      </div>
    </>
  );
}
