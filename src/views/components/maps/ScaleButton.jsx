import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class ScaleButton extends React.Component {
  panelDiv;

  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("button", "");
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

// https://codesandbox.io/s/react-leaflet-description-button-o66nb?file=/src/Description.js
// https://github.com/omarkawach/Info-Viz/blob/main/src/components/Map.js
