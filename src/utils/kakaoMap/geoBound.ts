import { LatLng } from '../../components/Map/MapContent';

export function getGeoBound(): [LatLng, LatLng] {
  console.log('??');
  if (!window.map) throw Error('map is not initialized');
  console.log(window.map.getBounds());
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
