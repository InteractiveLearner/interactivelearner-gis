import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import pin from "../../../img/pin.png";
import icon from "../../../img/icon.png";
import pie from "../../../img/pie.png";
import hospital from "../../../img/hospital.png";

let options = [pin, icon, pie, hospital];

let current = 1;

class ScaleButton extends React.Component {
  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("button", "");

        panelDiv.style.borderRadius = "6px";
        panelDiv.style.background = "#283618";
        panelDiv.style.color = "white";
        panelDiv.style.padding = "12px";
        panelDiv.style.cursor = "pointer";

        this.panelDiv = panelDiv;

        panelDiv.innerHTML = this.props.title;

        panelDiv.addEventListener("click", () => {
          if (current === 4) current = 0;

          this.props.data.forEach((layer) => {
            layer.setIcon(
              L.icon({
                iconSize: [38, 38], // size of the icon
                iconUrl: options[current],
                color: "green",
              })
            );
          });

          current += 1;
        });

        return panelDiv;
      },
    });
    return new MapInfo({ position: "bottomright" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.panelDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(ScaleButton);
