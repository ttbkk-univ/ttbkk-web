export function setMapController(): void {
  const mapTypeControl = new window.kakao.maps.MapTypeControl();
  window.map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
  const zoomControl = new window.kakao.maps.ZoomControl();
  window.map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
}
