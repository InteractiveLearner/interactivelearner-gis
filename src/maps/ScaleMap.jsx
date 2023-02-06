import React from "react";

import { Card } from "@mui/material";

import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
} from "react-leaflet";

import ScaleButton from "./components/ScaleButton.jsx";

export default class Map extends React.Component {
  render() {
    return (
      <Card elevation={3}>
        <MapContainer
          center={[48.42829687325907, -123.3656709938676]}
          zoom={12}
          scrollWheelZoom={true}
          // style={{ minHeight: "50vh", minWidth: "100vw" }}
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
      </Card>
    );
  }
}
