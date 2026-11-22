import { toRaw } from 'vue';
import { useVisualization, type Control } from './registry';

type MapView = { getZoom(): number; getCenter(): { lat: number; lng: number }; setView(center: number[], zoom: number, options: { animate: boolean }): unknown };

export function useLeafletVisualization(id: string, description: string, getMap: () => MapView | null | undefined,
  extra: { controls?: Record<string, Control>; read?: () => Record<string, unknown>; update?: (changes: Record<string, unknown>) => void } = {}) {
  useVisualization({
    id, description,
    controls: {
      zoom: { type: 'integer', minimum: 2, maximum: 18, description: 'Higher zoom shows a larger map scale and more detail.' },
      latitude: { type: 'number', minimum: -85, maximum: 85 }, longitude: { type: 'number', minimum: -180, maximum: 180 },
      ...extra.controls,
    },
    ready: () => !!getMap(),
    read() {
      const map = getMap();
      return { ...(map ? { zoom: map.getZoom(), latitude: map.getCenter().lat, longitude: map.getCenter().lng } : {}), ...extra.read?.() };
    },
    update(changes) {
      const map = toRaw(getMap())!;
      extra.update?.(changes);
      if (['latitude', 'longitude', 'zoom'].some(key => key in changes)) map.setView([
        changes.latitude as number ?? map.getCenter().lat, changes.longitude as number ?? map.getCenter().lng,
      ], changes.zoom as number ?? map.getZoom(), { animate: false });
    },
  });
}
