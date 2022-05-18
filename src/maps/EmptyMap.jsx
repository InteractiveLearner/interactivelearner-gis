/**
 * EmptyMap.jsx is meant as a template so you can build
 * your own React Leaflet map into the site
 */
import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ScaleControl,
} from "react-leaflet";

export default class Map extends React.Component {
  render() {
    return (
      <MapContainer
        center={[48.4284, -123.7656]}
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
        </LayersControl>
        <ScaleControl position="bottomleft" />
      </MapContainer>
    );
  }
}
