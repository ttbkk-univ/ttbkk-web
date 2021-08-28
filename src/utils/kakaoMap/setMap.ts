import { getZoom } from './zoom';
import { getCenter } from './center';

export function setMap(): void {
  const zoom = getZoom();
  const center = getCenter();
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(center.latitude, center.longitude),
    level: zoom,
  };
  window.map = new window.kakao.maps.Map(container, options);
}
