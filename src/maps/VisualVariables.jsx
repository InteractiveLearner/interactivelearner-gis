import React from "react";

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

export default function Map() {
  const defaultStyle = (feature) => {
    return {
      fillColor: "#f1faee",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };
  
  const roadStyle = () => {
    return {
      weight: 4,
      opacity: 1,
      color: "#bb3e03",
      fillOpacity: 0.6,
    };
  };

  const onEachWard = (ward, layer) => {
    let name = ward.properties["WARD_NAME_"];
    let num = ward.properties["WARD_NUM"];
    let area = ward.properties["Shape_Area"];

    let popupContent = `<p><b>Ward: ${name}</b><br />
                              Ward Number: ${num}<br />
                              Land Area: ${area}</p>`;

    layer.bindTooltip(popupContent).openTooltip();
  };

  const onEachHospital = (hospital, layer) => {
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

  const onEachRoad = (road, layer) => {
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

  return (
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
          <GeoJSON data={hospitals} onEachFeature={onEachHospital} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Wards">
          <GeoJSON
            data={features}
            style={defaultStyle}
            onEachFeature={onEachWard}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Roads">
          <GeoJSON data={roads} style={roadStyle} onEachFeature={onEachRoad} />
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
  );
}
