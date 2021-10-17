import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getPlaceCount, getPlaceMap, IPlace, placeMapState } from '../../states/places/placeMap';
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
    map: any;
    clusterer: any;
    placeMap: { [p: string]: IPlace };
    newPlace: any;
    brands: {
      [p: string]: {
        name: string;
        markers: any[]; // PlaceMarker
        visible: true;
      };
    };
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
  const setPlaceMap = useSetRecoilState(placeMapState);

  let debounce: any = null;
  let zoomChanged: boolean = false;
  const debounceTime: number = 500;

  const getAndAddPlace = (): void => {
    const geoBound: [LatLng, LatLng] = getGeoBound();
    getPlaceCount(geoBound).then((count: number) => {
      const limit: number = 200;
      const maxPageNumber = count / limit;
      for (let page = 1; page < maxPageNumber + 1; page++) {
        getPlaceMap(geoBound, page, limit).then((newPlaceMap) => {
          setPlaceMap((prevPlaceMap: { [p: string]: IPlace }) => {
            setMarkerCluster(prevPlaceMap, newPlaceMap, setClickedPlace, setDisplayDetailPlace);
            return { ...prevPlaceMap, ...newPlaceMap };
          });
        });
      }
    });
  };

  const moveEventHandler = (): void => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      getAndAddPlace();
    }, debounceTime);
  };

  useEffect(() => {
    loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        setMap();
        setMapController();
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => {
          zoomChanged = true;
          const currentZoom: number = getZoom();
          setZoom();
          if (currentZoom <= window.map.getLevel()) moveEventHandler();
          zoomChanged = false;
        });

        window.kakao.maps.event.addListener(window.map, 'center_changed', () => {
          setCenter();
          if (!zoomChanged) moveEventHandler();
        });
        window.map.setDraggable(true);
        getAndAddPlace();
        document.onkeydown = (e: KeyboardEvent): void => {
          if (e.key === 'Escape') {
            window.newPlace?.setMap(null);
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
