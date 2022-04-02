import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getPlaceMap, IPlace } from '../../states/places/placeMap';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { createPlaceModalDisplayState } from '../../states/buttons/createPlaceModalDisplayState';
import { sidebarIsOpenState } from '../../states/sidebar/siteIsOpen';
import { MapService } from '../../utils/kakaoMap/services/MapService';
import { MarkerService } from '../../utils/kakaoMap/services/MarkerService';

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
        id: string;
        name: string;
        markers: any[]; // PlaceMarker
        nameOverlays: any[]; // CustomOverlay
        visible: boolean;
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
  const setCreatePlaceModalDisplay = useSetRecoilState(createPlaceModalDisplayState);
  const setSidebarIsOpen = useSetRecoilState(sidebarIsOpenState);

  let debounce: any = null;
  let zoomChanged: boolean = false;
  const debounceTime: number = 500;

  const getAndAddPlace = (): void => {
    const geoBound: [LatLng, LatLng] = MapService.getGeoBound();
    const minLat = Math.floor(geoBound[0].latitude);
    const minLon = Math.floor(geoBound[0].longitude);
    const maxLat = Math.ceil(geoBound[1].latitude);
    const maxLon = Math.ceil(geoBound[1].longitude);
    for (let lat = minLat; lat < maxLat; lat++) {
      for (let lon = minLon; lon < maxLon; lon++) {
        getPlaceMap(
          { latitude: lat, longitude: lon },
          { latitude: lat + 1, longitude: lon + 1 },
        ).then((newPlaceMap) => {
          MarkerService.setMarkerCluster(newPlaceMap, setClickedPlace, setSidebarIsOpen);
        });
      }
    }
  };

  const moveEventHandler = (): void => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      getAndAddPlace();
    }, debounceTime);
  };

  useEffect(() => {
    MapService.loadKakaoMap(() => {
      window.kakao.maps.load(() => {
        MapService.setMap();
        MapService.setMapController();
        window.kakao.maps.event.addListener(window.map, 'zoom_changed', () => {
          zoomChanged = true;
          const currentZoom: number = MapService.getZoom();
          // 추가되어있었다면 없애고, 없었으면 추가해주고
          if (MapService.isPassMinLevel()) {
            const visible: boolean = window.map.getLevel() < MapService.minLevel;
            Object.values(window.brands).map((brand) => {
              const isOverlayVisible = brand.visible && visible === brand.visible;
              brand.nameOverlays.map((nameOverlay) =>
                nameOverlay.setMap(isOverlayVisible ? window.map : null),
              );
            });
          }

          MapService.setZoom();
          if (currentZoom <= window.map.getLevel()) moveEventHandler();
          zoomChanged = false;
        });

        window.kakao.maps.event.addListener(window.map, 'center_changed', () => {
          MapService.setCenter();
          if (!zoomChanged) moveEventHandler();
        });
        window.map.setDraggable(true);
        getAndAddPlace();
        document.onkeydown = (e: KeyboardEvent): void => {
          if (e.key === 'Escape') {
            window.newPlace?.setMap(null);
            setClickedPlace(undefined);
            setCreatePlaceModalDisplay(false);
          }
        };
      });
    });
  }, []);

  return <div id={'map'} style={{ width: '100%', height: '100%' }} />;
}

export default MapContent;
