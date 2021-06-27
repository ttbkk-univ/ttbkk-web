import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { zoomState } from '../../states/maps/zoom';
import { centerState } from '../../states/maps/center';
import { placeMapState } from '../../states/places/placeMap';
import { setMarkerCluster } from './PlaceCluster';
import { setMapControl } from './MapControl';
import { loadKakaoMap } from './MapLoader';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { placeDetailDisplayState } from '../../states/sidebar/displayToggleButton';

declare global {
  interface Window {
    kakao: any;
    map: any;
    clusterer: any;
    newPlace: any;
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

function MapContent(): React.ReactElement {
  const [zoom, setZoom] = useRecoilState(zoomState);
  const center = useRecoilValue(centerState);
  const placeMap = useRecoilValue(placeMapState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setDisplayDetailPlace = useSetRecoilState(placeDetailDisplayState);

  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        setMap(center, zoom);
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => {
          setZoom(window.map.getLevel());
        });
        window.map.setDraggable(true);
        setMapControl();
        setMarkerCluster(placeMap, setClickedPlace, setDisplayDetailPlace);
      });
    });
  }, []);
  return <div id={'map'} style={{ width: '100%', height: '100%' }} />;
}

export default MapContent;
