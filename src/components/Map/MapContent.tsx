import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getPlaceMap, IPlace } from '../../states/places/placeMap';
import { setMarkerCluster } from '../../utils/kakaoMap/setCluster';
import { setMapController } from '../../utils/kakaoMap/setMapController';
import { loadKakaoMap } from '../../utils/kakaoMap/loadKakaoMap';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { placeDetailDisplayState } from '../../states/sidebar/displayToggleButton';
import { createPlaceModalDisplayState } from '../../states/buttons/createPlaceModalDisplayState';
import { getZoom, setZoom } from '../../utils/kakaoMap/zoom';
import { setMap } from '../../utils/kakaoMap/setMap';
import { setCenter } from '../../utils/kakaoMap/center';
import { getGeoBound } from '../../utils/kakaoMap/geoBound';

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
    placeMap: { [p: string]: IPlace };
    map: any;
    clusterer: any;
    newPlace: any;
  }
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export type GeoBound = [LatLng, LatLng];

function MapContent(): React.ReactElement {
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setDisplayDetailPlace = useSetRecoilState(placeDetailDisplayState);
  const setCreatePlaceModalDisplay = useSetRecoilState(createPlaceModalDisplayState);

  let debounce: any = null;
  let zoomChanged: boolean = false;
  const debounceTime: number = 500;

  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        setMap();
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => {
          zoomChanged = true;
          if (getZoom() > window.map.getLevel()) {
            setZoom();
            zoomChanged = false;
            return;
          }
          setZoom();
          clearTimeout(debounce);
          debounce = setTimeout(() => {
            const geoBound: [LatLng, LatLng] = getGeoBound();
            getPlaceMap(geoBound).then((newPlaceMap: { [p: string]: IPlace }) => {
              setMarkerCluster(newPlaceMap, setClickedPlace, setDisplayDetailPlace);
              window.placeMap = { ...window.placeMap, ...newPlaceMap };
            });
          }, debounceTime);
          zoomChanged = false;
        });
        window.kakao.maps.event.addListener(window.map, 'center_changed', () => {
          if (zoomChanged) return;
          clearTimeout(debounce);
          debounce = setTimeout(() => {
            setCenter();
            const geoBound: [LatLng, LatLng] = getGeoBound();
            getPlaceMap(geoBound).then(async (newPlaceMap: { [p: string]: IPlace }) => {
              setMarkerCluster(newPlaceMap, setClickedPlace, setDisplayDetailPlace);
              window.placeMap = { ...window.placeMap, ...newPlaceMap };
            });
          }, debounceTime);
        });
        window.map.setDraggable(true);
        setMapController();

        const geoBound: [LatLng, LatLng] = getGeoBound();
        getPlaceMap(geoBound).then((newPlaceMap: { [p: string]: IPlace }) => {
          setMarkerCluster(newPlaceMap, setClickedPlace, setDisplayDetailPlace);
          window.placeMap = newPlaceMap;
        });
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
