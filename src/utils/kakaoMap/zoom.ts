import { setCenter } from './center';

export function setZoom(): void {
  window.localStorage.setItem('zoom', window.map.getLevel().toString());
  setCenter();
}

export function getZoom(): number {
  const zoomFromSearchParams = new URLSearchParams(window.location.search).get('zoom');
  if (zoomFromSearchParams && !isNaN(Number(zoomFromSearchParams))) {
    return Number(zoomFromSearchParams);
  }

  const zoomFromLocalStorage = window.localStorage.getItem('zoom');
  return zoomFromLocalStorage ? Number(zoomFromLocalStorage) : 8;
}
