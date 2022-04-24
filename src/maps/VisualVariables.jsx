import React from "react";

import { Card } from "@mui/material";

import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
  GeoJSON,
} from "react-leaflet";

import L from "leaflet";

import * as features from "../data/Wards.json";
import * as hospitals from "../data/Hospitals.json";
import * as roads from "../data/Highways.json";

import IconButton from "./components/IconButton.jsx";

import pin from "../assets/icons/pin.png";

let pointsCollection = [];

export default class Map extends React.Component {
  defaultStyle = (feature) => {
    return {
      fillColor: "#f1faee",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };
  roadStyle = () => {
    return {
      weight: 4,
      opacity: 1,
      color: "#bb3e03",
      fillOpacity: 0.6,
    };
  };
  onEachWard = (ward, layer) => {
    let name = ward.properties["WARD_NAME_"];
    let num = ward.properties["WARD_NUM"];
    let area = ward.properties["Shape_Area"];

    let popupContent = `<p><b>Ward: ${name}</b><br />
                              Ward Number: ${num}<br />
                              Land Area: ${area}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
  };
  onEachHospital = (hospital, layer) => {
    let name = hospital.properties.NAME;
    let addr = hospital.properties.ADDRESS;

    let popupContent = `<p><b>Hospital: ${name}</b><br />Address: ${addr}<br /></p>`;

    pointsCollection.push(layer);

    layer.setIcon(
      L.icon({
        iconSize: [38, 38], // size of the icon
        iconUrl: pin,
        color: "green",
      })
    );

    layer.bindTooltip(popupContent).openTooltip();
  };
  onEachRoad = (road, layer) => {
    let name = road.properties.TO_RD_NAME;
    let type = road.properties.SUBCLASS;
    let ownership = road.properties.OWNERSHIP;
    let shapeLength = road.properties.Shape_Leng;

    let popupContent = `<p><b>Name: ${name}</b><br />
                            Road Class: ${type}<br />
                            Ownership: ${ownership}<br />
                            Road Length: ${shapeLength}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
  };
  render() {
    return (
      <Card elevation={3}>
        <MapContainer
          center={[45.279716962875604, -75.78658103340784]}
          zoom={9}
          scrollWheelZoom={true}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay checked name="Hospitals">
              <GeoJSON data={hospitals} onEachFeature={this.onEachHospital} />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Wards">
              <GeoJSON
                data={features}
                style={this.defaultStyle}
                onEachFeature={this.onEachWard}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Roads">
              <GeoJSON
                data={roads}
                style={this.roadStyle}
                onEachFeature={this.onEachRoad}
              />
            </LayersControl.Overlay>
          </LayersControl>
          <ScaleControl position="bottomleft" />
          <IconButton
            title={"Change Shape Style"}
            center={[45.279716962875604, -75.78658103340784]}
            zoom={15}
            data={pointsCollection}
          />
        </MapContainer>
      </Card>
    );
  }
}
