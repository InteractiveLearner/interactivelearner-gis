<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { useVisualization } from '../../.vitepress/ai/registry';

const props = defineProps({
    itemId: String,
    title: String,
    zoom: Number,
    mapId: String
});

const mapRef = ref(null);
const actionBarRef = ref(null);
const legendPanelRef = ref(null);
const layersPanelRef = ref(null);

let activeWidget = null;
let actionBarExpanded = false;

const togglePanelVisibility = (widget, isVisible) => {
    if (widget === 'legend') {
        legendPanelRef.value.hidden = !isVisible;
    } else if (widget === 'layers') {
        layersPanelRef.value.hidden = !isVisible;
    }
};

const handleActionBarClick = (event) => {
    const target = event.target;
    if (target.tagName !== 'CALCITE-ACTION') return;

    const nextWidget = target.dataset.actionId;
    if (nextWidget === activeWidget) {
        target.active = false;
        togglePanelVisibility(nextWidget, false);
        activeWidget = null;
    } else {
        if (activeWidget) {
            actionBarRef.value.querySelector(`[data-action-id=${activeWidget}]`).active = false;
            togglePanelVisibility(activeWidget, false);
        }
        target.active = true;
        togglePanelVisibility(nextWidget, true);
        activeWidget = nextWidget;
    }
};

const handleActionBarToggle = () => {
    actionBarExpanded = !actionBarExpanded;
    mapRef.value.padding = { left: actionBarExpanded ? 120 : 49 };
};

const handleArcgisViewReadyChange = () => {
    actionBarRef.value.addEventListener('click', handleActionBarClick);
    actionBarRef.value.addEventListener('calciteActionBarToggle', handleActionBarToggle);
    mapRef.value.padding = { left: 49 };
};

onMounted(async () => {
    await Promise.all([
        import('@esri/calcite-components/dist/components/calcite-shell'),
        import('@esri/calcite-components/dist/components/calcite-navigation'),
        import('@esri/calcite-components/dist/components/calcite-navigation-logo'),
        import('@esri/calcite-components/dist/components/calcite-shell-panel'),
        import('@esri/calcite-components/dist/components/calcite-action-bar'),
        import('@esri/calcite-components/dist/components/calcite-action'),
        import('@esri/calcite-components/dist/components/calcite-panel')
    ]);
    await Promise.all([
        import("@arcgis/map-components/dist/components/arcgis-map"),
        import("@arcgis/map-components/dist/components/arcgis-legend"),
        import("@arcgis/map-components/dist/components/arcgis-layer-list")
    ]);
    mapRef.value.addEventListener('arcgisViewReadyChange', handleArcgisViewReadyChange);
});

useVisualization({
  id: props.mapId, description: props.title,
  controls: { zoom: { type: 'number', minimum: 2, maximum: 18 }, panel: { type: 'string', enum: ['legend', 'layers', 'none'] } },
  ready: () => !!mapRef.value?.view?.ready,
  read: () => ({ zoom: mapRef.value?.view?.zoom, panel: activeWidget }),
  update: c => {
    if (c.zoom !== undefined) mapRef.value.view.zoom = c.zoom;
    if (c.panel) {
      togglePanelVisibility('legend', c.panel === 'legend');
      togglePanelVisibility('layers', c.panel === 'layers');
      activeWidget = c.panel === 'none' ? null : c.panel;
    }
  },
});
onBeforeUnmount(() => {
  actionBarRef.value?.removeEventListener('click', handleActionBarClick);
  actionBarRef.value?.removeEventListener('calciteActionBarToggle', handleActionBarToggle);
});
</script>

<template>
    <calcite-shell class="calcite-mode-dark" content-behind>
        <calcite-navigation slot="header">
            <calcite-navigation-logo slot="logo" :heading="title"></calcite-navigation-logo>
        </calcite-navigation>

        <calcite-shell-panel slot="panel-start" display-mode="float">
            <calcite-action-bar slot="action-bar" ref="actionBarRef">
                <calcite-action data-action-id="legend" icon="legend" text="Legend"></calcite-action>
                <calcite-action data-action-id="layers" icon="layers" text="Layers"></calcite-action>
            </calcite-action-bar>

            <calcite-panel heading="Legend" height-scale="l" data-panel-id="legend" hidden ref="legendPanelRef">
                <arcgis-legend :reference-element="mapId"></arcgis-legend>
            </calcite-panel>

            <calcite-panel heading="Layers" height-scale="l" data-panel-id="layers" hidden ref="layersPanelRef">
                <arcgis-layer-list :reference-element="mapId"></arcgis-layer-list>
            </calcite-panel>
        </calcite-shell-panel>

        <arcgis-map ref="mapRef" :item-id="itemId" :zoom="zoom" :id="mapId"></arcgis-map>
    </calcite-shell>
</template>

<style scoped>
calcite-shell {
    height: 530px;
}
</style>