import { LatLng } from '../../components/Map/MapContent';

export function setCenter(): void {
  const center = window.map.getCenter();
  window.localStorage.setItem(
    'center',
    JSON.stringify({
      latitude: center.getLat(),
      longitude: center.getLng(),
    }),
  );
}

export function getCenter(): LatLng {
  // search param 이 있는 경우
  const centerFromSearchParams = new URLSearchParams(window.location.search).get('center');
  if (centerFromSearchParams?.toString().split(',').length) {
    const [lat, lng]: string[] = centerFromSearchParams?.toString().split(',', 2);
    if (!isNaN(Number(lat)) && !isNaN(Number(lng))) {
      return { latitude: Number(lat), longitude: Number(lng) };
    }
  }

  // localstorage 가 있는 경우
  const centerFromLocalStorage = window.localStorage.getItem('center');
  if (centerFromLocalStorage) {
    return JSON.parse(centerFromLocalStorage);
  }

  // default
  return { latitude: 37.53026789291489, longitude: 127.12380358542175 };
}
