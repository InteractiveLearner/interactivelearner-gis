import React from "react";

import parse_georaster from "georaster";

// https://github.com/GeoTIFF/georaster-layer-for-leaflet
import GeoRasterLayer from "georaster-layer-for-leaflet";

import geoblaze from "geoblaze"

import { MapContainer, ScaleControl, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useRef } from "react";

export default function GeoRasterLeaflet() {
  const map = useRef(null);
  useEffect(() => {
    var url_to_geotiff_file =
      "https://geotiff.github.io/georaster-layer-for-leaflet-example/example_4326.tif";

    fetch(url_to_geotiff_file)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        console.log(arrayBuffer)
        parse_georaster(arrayBuffer).then((georaster) => {
          var layer = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.7,
          });

          layer.addTo(map.current);

          map.current.fitBounds(layer.getBounds());

          map.current.on('click', e => {
            const latlng = [e.latlng.lng, e.latlng.lat];
            // results is an array, which each item representing a separate band
            const results = geoblaze.identify(georaster, latlng);
            console.log(results);
          });
        });
      });

  }, []);

  return (
    <MapContainer ref={map} center={[0, 0]} zoom={4} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
}
