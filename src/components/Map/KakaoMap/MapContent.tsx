import React, { useEffect } from 'react';
import { env } from '../../../env';
import { useRecoilState, useRecoilValue } from 'recoil';
import { zoomState } from '../../../states/maps/zoom';
import { centerState } from '../../../states/maps/center';
import { placeMapState } from '../../../states/places/placeMap';
import { IPlace } from '../../../places.mock';

declare global {
  interface Window {
    kakao: any;
    map: any;
    clusterer: any;
  }
}

function addScript(type: string, src: string, id: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.async = true;
  script.type = type;
  script.src = src;
  script.id = id;
  document.head.appendChild(script);
  return script;
}

function loadKakaoMap(callback?: (...args: any[]) => any): any {
  const kakaoMapScriptId = 'kakaoMap';
  const isExisting = document.getElementById(kakaoMapScriptId);

  if (!isExisting) {
    const script = addScript(
      'text/javascript',
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakao.mapApiKey}&libraries=services,clusterer&autoload=false`,
      kakaoMapScriptId,
    );
    script.onload = (): void => {
      callback?.();
    };
  }
}

function setMap(center: { latitude: number; longitude: number }, zoom: number): void {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(center.latitude, center.longitude),
    level: zoom,
  };
  window.map = new window.kakao.maps.Map(container, options);
}

function setMapControl(): void {
  const mapTypeControl = new window.kakao.maps.MapTypeControl();
  window.map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
}

function setMarkerCluster(placeMap: { [p: string]: IPlace }): void {
  const markers = Object.values(placeMap).map((place: IPlace) => {
    return new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
    });
  });
  window.clusterer = new window.kakao.maps.MarkerClusterer({
    map: window.map,
    averageCenter: true,
    minLevel: 7,
  });
  window.clusterer.addMarkers(markers);
}

function MapContent(): React.ReactElement {
  const [zoom, setZoom] = useRecoilState(zoomState);
  const center = useRecoilValue(centerState);
  const placeMap = useRecoilValue(placeMapState);

  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        setMap(center, zoom);
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => {
          setZoom(window.map.getLevel());
        });
        setMapControl();
        setMarkerCluster(placeMap);
      });
    });
  }, []);
  return <div id={'map'} style={{ width: '100%', height: '100%' }} />;
}

export default MapContent;
