import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  GeoJSON,
} from "react-leaflet";

import * as features from "../../../data/csds.json";
import * as lfls from "../../../data/lfls.json";
import * as roads from "../../../data/roads.json";

var selected = null;

export default class Map extends React.Component {
  defaultStyle = (feature) => {
    return {
      fillColor: "#54c5d5",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };
  highlightStyle = () => {
    return {
      fillColor: "#78716e",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };
  roadStyle = () => {
    return {
      fillColor: "#78716e",
      weight: 6,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };
  onEachCSD = (csd, layer) => {
    let name = csd.properties["Census subdivision name"];
    let area = csd.properties["Land Area Sq Km"];
    let lfls = csd.properties["LFL_count"];
    let pop = csd.properties["Pop Total 2016"];

    let popupContent = `<div class='info leaflet-control'>`;
    popupContent += `<h2><span>Census Subdivision: ${name}</span></h2>`;
    popupContent += `<h3><span>Land Area (Sq Km): ${area}</span></h3>`;
    popupContent += `<h3><span>Number of Little Free Libraries: ${lfls}</span></h3>`;
    popupContent += `<h3><span>Population: ${pop}</span></h3>`;
    popupContent += `</div>`;

    layer.bindTooltip(popupContent).openTooltip();

    layer.on({ click: this.clicked.bind(this) });
  };
  onEachLibrary = (library, layer) => {
    let name = library.properties.Name;
    // Whoops looks like the file has lon / lat mixed
    let lat = library.properties.Lon;
    let lon = library.properties.Lat;

    let popupContent = `<p><b>Little Free Library: ${name}</b><br />Latitude: ${lat}<br />Longitude: ${lon}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
  };
  onEachRoad = (road, layer) => {
    let name = road.properties.L_STNAME_C;
    let roadclass = road.properties.ROADCLASS;
    let pavedstatus = road.properties.PAVSTATUS;
    let shapelength = road.properties.Shape_Length;

    let popupContent = `<p><b>Name: ${name}</b><br />
                            Road Class: ${roadclass}<br />
                            Paved Status: ${pavedstatus}<br />
                            Road Length: ${shapelength}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
  };
  clicked = (ev) => {
    let oldSelected = selected;
    selected = ev.target;

    // If there is no previously selected feature, style the current selection
    if (oldSelected === null) {
      selected.setStyle(this.highlightStyle(selected.feature));
    }
    // Un-highlight the re-selected feature
    else if (
      oldSelected.feature.properties["Census subdivision name"] ===
      selected.feature.properties["Census subdivision name"]
    ) {
      selected.setStyle(this.defaultStyle(selected.feature));
      selected = null;
    }
    // Un-highlight the old selected feature and highlight the new one
    else if (
      oldSelected.feature.properties["Census subdivision name"] !==
      selected.feature.properties["Census subdivision name"]
    ) {
      oldSelected.setStyle(this.defaultStyle(oldSelected.feature));
      selected.setStyle(this.highlightStyle(selected.feature));
    }
  };
  render() {
    return (
      <MapContainer
        center={[48.62872144016674, -123.43758478519236]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Little Free Libraries">
            <GeoJSON data={lfls} onEachFeature={this.onEachLibrary} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Census Subdivisions">
            <GeoJSON
              style={this.defaultStyle}
              data={features}
              onEachFeature={this.onEachCSD}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Roads">
            <GeoJSON
              style={this.roadStyle}
              data={roads}
              onEachFeature={this.onEachRoad}
            />
          </LayersControl.Overlay>
        </LayersControl>
        <ScaleControl position="bottomleft" />
      </MapContainer>
    );
  }
}
