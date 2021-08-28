import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getPlaceMap, IPlace, placeMapState } from '../../states/places/placeMap';
import { setMarkerCluster } from '../../utils/kakaoMap/setCluster';
import { setMapController } from '../../utils/kakaoMap/setMapController';
import { loadKakaoMap } from '../../utils/kakaoMap/loadKakaoMap';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { placeDetailDisplayState } from '../../states/sidebar/displayToggleButton';
import { createPlaceModalDisplayState } from '../../states/buttons/createPlaceModalDisplayState';
import { setZoom } from '../../utils/kakaoMap/zoom';
import { setMap } from '../../utils/kakaoMap/setMap';
import { setCenter } from '../../utils/kakaoMap/center';
import { getGeoBound } from '../../utils/kakaoMap/geoBound';

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
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
  const setPlaceMap = useSetRecoilState(placeMapState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setDisplayDetailPlace = useSetRecoilState(placeDetailDisplayState);
  const setCreatePlaceModalDisplay = useSetRecoilState(createPlaceModalDisplayState);

  let debounce: any = null;
  const debounceTime: number = 300;

  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(async () => {
        setMap();
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', async () => {
          clearTimeout(debounce);
          debounce = setTimeout(async () => {
            setZoom();
            const geoBound: [LatLng, LatLng] = getGeoBound();
            const placeMap: { [p: string]: IPlace } = await getPlaceMap(geoBound);
            setPlaceMap(placeMap);
            setMarkerCluster(placeMap, setClickedPlace, setDisplayDetailPlace);
          }, debounceTime);
        });
        window.kakao.maps.event.addListener(window.map, 'center_changed', async () => {
          clearTimeout(debounce);
          debounce = setTimeout(async () => {
            setCenter();
            const geoBound: [LatLng, LatLng] = getGeoBound();
            const placeMap: { [p: string]: IPlace } = await getPlaceMap(geoBound);
            setPlaceMap(placeMap);
            setMarkerCluster(placeMap, setClickedPlace, setDisplayDetailPlace);
          }, debounceTime);
        });
        window.map.setDraggable(true);
        setMapController();

        const geoBound: [LatLng, LatLng] = getGeoBound();
        const placeMap: { [p: string]: IPlace } = await getPlaceMap(geoBound);
        setPlaceMap(placeMap);

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
