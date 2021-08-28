import { LatLng } from '../../components/Map/MapContent';

export function getGeoBound(): [LatLng, LatLng] {
  if (!window.map) throw Error('map is not initialized');
  const bounds = window.map.getBounds();
  const bottomLeft = bounds.getSouthWest();
  const topRight = bounds.getNorthEast();
  return [
    {
      latitude: bottomLeft.getLat(),
      longitude: bottomLeft.getLng(),
    },
    {
      latitude: topRight.getLat(),
      longitude: topRight.getLng(),
    },
  ];
}
