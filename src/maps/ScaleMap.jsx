import React from "react";

import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
} from "react-leaflet";

import ScaleButton from "./components/ScaleButton.jsx";

export default function Map() {
  return (
    <MapContainer
      center={[48.42829687325907, -123.3656709938676]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <ScaleControl position="bottomleft" />
      <ScaleButton
        title={"Small Scale"}
        center={[48.42829687325907, -123.3656709938676]}
        zoom={12}
      />
      <ScaleButton
        title={"Large Scale"}
        center={[48.42829687325907, -123.3656709938676]}
        zoom={15}
      />
    </MapContainer>
  );
}
