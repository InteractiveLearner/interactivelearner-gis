import React, { useEffect, useRef } from "react";
import {
  ArcgisMap,
  ArcgisLayerList,
  ArcgisLegend,
} from "@arcgis/map-components-react";
import {
  CalciteShell,
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
  CalciteNavigation,
  CalciteNavigationLogo,
} from "@esri/calcite-components-react";

const ArcgisCalciteMap = ({ itemId, title, zoom, mapId }) => {
  const mapRef = useRef(null);
  const actionBarRef = useRef(null);
  const legendPanelRef = useRef(null);
  const layersPanelRef = useRef(null);
  
  useEffect(() => {
    const mapElement = mapRef.current;
    const actionBarElement = actionBarRef.current;
    const legendPanelElement = legendPanelRef.current;
    const layersPanelElement = layersPanelRef.current;
  
    let activeWidget = null;
    let actionBarExpanded = false;
  
    const togglePanelVisibility = (widget, isVisible) => {
      if (widget === "legend") {
        legendPanelElement.hidden = !isVisible;
      } else if (widget === "layers") {
        layersPanelElement.hidden = !isVisible;
      }
    };
  
    const handleActionBarClick = ({ target }) => {
      if (target.tagName !== "CALCITE-ACTION") return;
  
      const nextWidget = target.dataset.actionId;
      if (nextWidget === activeWidget) {
        target.active = false;
        togglePanelVisibility(nextWidget, false);
        activeWidget = null;
      } else {
        if (activeWidget) {
          actionBarElement.querySelector(`[data-action-id=${activeWidget}]`).active = false;
          togglePanelVisibility(activeWidget, false);
        }
        target.active = true;
        togglePanelVisibility(nextWidget, true);
        activeWidget = nextWidget;
      }
    };
  
    const handleActionBarToggle = () => {
      actionBarExpanded = !actionBarExpanded;
      mapElement.view.padding = { left: actionBarExpanded ? 150 : 49 };
    };
  
    const handleArcgisViewReadyChange = () => {
      actionBarElement.addEventListener("click", handleActionBarClick);
      actionBarElement.addEventListener("calciteActionBarToggle", handleActionBarToggle);
    };
  
    mapElement.addEventListener("arcgisViewReadyChange", handleArcgisViewReadyChange);
  
    return () => {
      actionBarElement.removeEventListener("click", handleActionBarClick);
      actionBarElement.removeEventListener("calciteActionBarToggle", handleActionBarToggle);
      mapElement.removeEventListener("arcgisViewReadyChange", handleArcgisViewReadyChange);
    };
  }, []);

  return (
    <CalciteShell
      className="calcite-mode-dark"
      style={{ position: "relative", height: "500px" }}
      contentBehind
    >
      <CalciteNavigation slot="header">
        <CalciteNavigationLogo slot="logo" heading={title} />
      </CalciteNavigation>

      <CalciteShellPanel slot="panel-start" display-mode="float">
        <CalciteActionBar slot="action-bar" ref={actionBarRef}>
          <CalciteAction
            dataActionId="legend"
            icon="legend"
            text="Legend"
          ></CalciteAction>
          <CalciteAction
            dataActionId="layers"
            icon="layers"
            text="Layers"
          ></CalciteAction>
        </CalciteActionBar>

        <CalcitePanel
          heading="Legend"
          heightScale="l"
          dataPanelId="legend"
          hidden
          ref={legendPanelRef}
        >
          <ArcgisLegend referenceElement={mapId} />
        </CalcitePanel>

        <CalcitePanel
          heading="Layers"
          heightScale="l"
          dataPanelId="layers"
          hidden
          ref={layersPanelRef}
        >
          <ArcgisLayerList referenceElement={mapId} />
        </CalcitePanel>
      </CalciteShellPanel>

      <ArcgisMap itemId={itemId} id={mapId} ref={mapRef} zoom={zoom} />
    </CalciteShell>
  );
};

export default ArcgisCalciteMap;
