import { ResponsiveGeoMap } from "@nivo/geo";
import { useState, useEffect, useRef } from "react";

import * as data from "../data/world_countries.json";

export default function ProjectionExplorer() {
  const [colors, setColors] = useState({});
  const ref = useRef(null);

  const wrapperAdded = (ref) => {
    const style = getComputedStyle(ref.current);

    setColors({
      fillColor: style.getPropertyValue("--dash-success"),
      graticuleLineColor: "#666666"
    });
  };

  useEffect(() => {
    wrapperAdded(ref);

  }, [ref]);

  return (
    <div style={{ height: "80vh", width: "90vw" }} ref={ref}>
      <ResponsiveGeoMap
        features={data.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        projectionScale={40}
        fillColor={colors.fillColor}
        borderWidth={0.5}
        borderColor="#333333"
        enableGraticule={true}
        graticuleLineColor={colors.graticuleLineColor}
      />
    </div>
  );
}
