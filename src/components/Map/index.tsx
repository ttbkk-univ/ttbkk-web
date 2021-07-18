import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { placeMapState } from '../../states/places/placeMap';
import { setMarkerCluster } from './PlaceCluster';
import { setMapControl } from './MapControl';
import { loadKakaoMap } from './MapLoader';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { placeDetailDisplayState } from '../../states/sidebar/displayToggleButton';
import { createPlaceModalDisplayState } from '../../states/buttons/createPlaceModalDisplayState';

declare global {
  interface Window {
    kakao: any;
    map: any;
    clusterer: any;
    newPlace: any;
  }
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

function getZoom(): number {
  const zoomFromSearchParams = new URLSearchParams(window.location.search).get('zoom');
  if (zoomFromSearchParams && !isNaN(Number(zoomFromSearchParams))) {
    return Number(zoomFromSearchParams);
  }

  const zoomFromLocalStorage = window.localStorage.getItem('zoom');
  return zoomFromLocalStorage ? Number(zoomFromLocalStorage) : 8;
}

function getCenter(): LatLng {
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

function setMap(): void {
  const zoom = getZoom();
  const center = getCenter();
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(center.latitude, center.longitude),
    level: zoom,
  };
  window.map = new window.kakao.maps.Map(container, options);
}

function setZoom(): void {
  window.localStorage.setItem('zoom', window.map.getLevel().toString());
  setCenter();
}

function setCenter(): void {
  const center = window.map.getCenter();
  window.localStorage.setItem(
    'center',
    JSON.stringify({
      latitude: center.getLat(),
      longitude: center.getLng(),
    }),
  );
}

function MapContent(): React.ReactElement {
  const placeMap = useRecoilValue(placeMapState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setDisplayDetailPlace = useSetRecoilState(placeDetailDisplayState);
  const setCreatePlaceModalDisplay = useSetRecoilState(createPlaceModalDisplayState);
  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        setMap();
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => setZoom());
        window.kakao.maps.event.addListener(window.map, 'center_changed', () => setCenter());
        window.map.setDraggable(true);
        setMapControl();
        setMarkerCluster(placeMap, setClickedPlace, setDisplayDetailPlace);
        document.onkeydown = (e: KeyboardEvent): void => {
          if (e.key === 'Escape') {
            window.newPlace.setMap(null);
            setClickedPlace(undefined);
            setDisplayDetailPlace(false);
            setCreatePlaceModalDisplay(false);
          }
        };
      });
    });
  }, []);
  return <div id={'map'} style={{ width: '100%', height: '100%' }} />;
}

export default MapContent;
