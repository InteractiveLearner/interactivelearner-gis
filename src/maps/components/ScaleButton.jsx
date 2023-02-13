/**
 * ScaleButton.jsx for changing zoom levels on a map
 */
import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class ScaleButton extends React.Component {
  panelDiv;

  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("button", "");

        panelDiv.style.borderRadius = "6px";
        panelDiv.style.background = "#0a0908";
        panelDiv.style.color = "white";
        panelDiv.style.padding = "8px";
        panelDiv.style.cursor = "pointer";

        this.panelDiv = panelDiv;

        panelDiv.innerHTML = this.props.title;

        panelDiv.addEventListener("click", () => {
          map.setView(this.props.center, this.props.zoom);
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
