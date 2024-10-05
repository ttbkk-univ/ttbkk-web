import React from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { getPlaceMap, IPlace } from '../../states/places/placeMap';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { createPlaceModalDisplayState } from '../../states/buttons/createPlaceModalDisplayState';
import { sidebarIsOpenState } from '../../states/sidebar/siteIsOpen';
import { MapService } from '../../utils/kakaoMap/services/MapService';
import { LoaderOptions, Map, MarkerClusterer, useKakaoLoader } from 'react-kakao-maps-sdk';
import { env } from '../../env';
import Features from '../Features';

declare global {
  interface Window {
    placeMap: { [p: string]: IPlace };
    newPlace: any;
    brands: {
      [p: string]: {
        id: string;
        name: string;
        markers: kakao.maps.Marker[]; // PlaceMarker
        nameOverlays: kakao.maps.CustomOverlay[]; // CustomOverlay
        visible: boolean;
      };
    };
  }
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

function MapContent() {
  const [init, setInit] = React.useState<boolean>(false);
  const mapRef = React.useRef<kakao.maps.Map | null>(null);
  const clustererRef = React.useRef<kakao.maps.MarkerClusterer | null>(null);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setCreatePlaceModalDisplay = useSetRecoilState(createPlaceModalDisplayState);
  const setSidebarIsOpen = useSetRecoilState(sidebarIsOpenState);

  useKakaoLoader({
    appkey: env.kakao.mapApiKey,
    libraries: ['services', 'clusterer'],
    nonce: 'ttbkkmap',
    retries: 3,
  } as LoaderOptions);

  let debounce: NodeJS.Timeout;
  let isDebounced = false;
  let zoomChanged: boolean = false;
  const debounceTime: number = 500;

  const getAndAddPlace = (target: kakao.maps.Map): void => {
    const geoBound: [LatLng, LatLng] = MapService.getGeoBound(target);
    const minUnit = 0.25;
    const minLat = Math.floor(geoBound[0].latitude / minUnit) * minUnit;
    const minLon = Math.floor(geoBound[0].longitude / minUnit) * minUnit;
    const maxLat = Math.ceil(geoBound[1].latitude / minUnit) * minUnit;
    const maxLon = Math.ceil(geoBound[1].longitude / minUnit) * minUnit;
    for (let lat = minLat; lat < maxLat; lat++) {
      for (let lon = minLon; lon < maxLon; lon++) {
        getPlaceMap(
          { latitude: lat, longitude: lon },
          { latitude: lat + 1, longitude: lon + 1 },
        ).then((newPlaceMap) => {
          setMarkerCluster(newPlaceMap, setClickedPlace, setSidebarIsOpen);
        });
      }
    }
  };

  function setMarkerCluster(
    newPlaceMap: { [p: string]: IPlace },
    setClickedPlace: SetterOrUpdater<string | undefined>,
    setSidebarIsOpen: SetterOrUpdater<boolean>,
  ): void {
    class PlaceMarker extends kakao.maps.Marker {
      id: string;

      constructor(props: { id: string } & kakao.maps.MarkerOptions) {
        super(props);
        this.id = props.id;
      }
    }

    const placeToMarker = (place: IPlace): PlaceMarker => {
      const marker = new PlaceMarker({
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
        title: place.name,
        clickable: true,
        id: place.id,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        setClickedPlace(marker.id);
        setSidebarIsOpen(true);
      });
      return marker;
    };

    const markers: PlaceMarker[] = [];
    Object.values(newPlaceMap).forEach((place: IPlace) => {
      if (!window.placeMap) window.placeMap = {};
      if (window.placeMap[place.id]) return;
      window.placeMap[place.id] = place;
      const marker: PlaceMarker = placeToMarker(place);
      const brandId = place.brand?.id || 'no_brand';
      const brandName = place.brand?.name || '로컬';
      if (!window.brands) window.brands = {};
      if (!window.brands[brandId]) {
        window.brands[brandId] = {
          id: brandId,
          name: brandName,
          markers: [],
          nameOverlays: [],
          visible: true,
        };
      }
      window.brands[brandId].markers.push(marker);
      window.brands[brandId]?.visible && markers.push(marker);

      const nameOverlay = createNameOverlay(place);
      window.brands[brandId].nameOverlays.push(nameOverlay);
      MapService.clusterMinLevel > MapService.getZoom() &&
        window.brands[brandId]?.visible &&
        nameOverlay.setMap(mapRef.current);
    });

    const clusterer = clustererRef.current;
    if (!clusterer) throw new Error('clusterer is not initialized');
    clusterer.addMarkers(markers);
  }

  function createNameOverlay(place: IPlace) {
    return new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
      content: `<div style="user-select: none; pointer-events: none; font-size: 12px; line-height: 12px; padding: 2px; text-align: center; color: white; text-shadow: 0 0 1px #000000, 0 0 1em #000000, 0 0 0.2em #000000"><strong>${
        place.brand?.name || place.name
      }</strong></div>`,
      yAnchor: 0,
      clickable: false,
    });
  }

  const moveEventHandler = (target: kakao.maps.Map): void => {
    if (!isDebounced) {
      getAndAddPlace(target);
    } else {
      clearTimeout(debounce);
    }
    isDebounced = true;
    debounce = setTimeout(() => {
      isDebounced = false;
    }, debounceTime);
  };

  const onCenterChanged = (target: kakao.maps.Map) => {
    const center = target.getCenter();
    window.localStorage.setItem(
      'center',
      JSON.stringify({
        latitude: center.getLat(),
        longitude: center.getLng(),
      }),
    );
    if (!zoomChanged) moveEventHandler(target);
  };

  const onZoomChanged = (target: kakao.maps.Map) => {
    zoomChanged = true;
    const currentZoom: number = MapService.getZoom();
    // 추가되어있었다면 없애고, 없었으면 추가해주고
    if (MapService.isPassMinLevel(target)) {
      const visible: boolean = target.getLevel() < MapService.clusterMinLevel;
      Object.values(window.brands).map((brand) => {
        const isOverlayVisible = brand.visible && visible === brand.visible;
        brand.nameOverlays.map((nameOverlay) =>
          nameOverlay.setMap(isOverlayVisible ? target : null),
        );
      });
    }

    MapService.setZoom(target);
    if (currentZoom <= target.getLevel()) moveEventHandler(target);
    zoomChanged = false;
  };

  const mapOnCreate = (target: kakao.maps.Map) => {
    if (init || !target) return;

    MapService.setMapController(target);
    getAndAddPlace(target);
    document.onkeydown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        window.newPlace?.setMap(null);
        setClickedPlace(undefined);
        setCreatePlaceModalDisplay(false);
      }
    };
    mapRef.current = target;

    if (isAllRefInitialized()) {
      setInit(true);
    }
  };

  const clustererOnCreate = (target: kakao.maps.MarkerClusterer) => {
    if (init || !target) return;

    clustererRef.current = target;
    if (isAllRefInitialized()) {
      setInit(true);
    }
  };

  const isAllRefInitialized = (): boolean => {
    return !!mapRef.current && !!clustererRef.current;
  };

  const center = MapService.getCenter();
  return (
    <Map
      id={'map'}
      style={{ width: '100%', height: '100%' }}
      center={{
        lat: center.latitude,
        lng: center.longitude,
      }}
      level={MapService.getZoom()}
      onCenterChanged={onCenterChanged}
      onZoomChanged={onZoomChanged}
      onDrag={moveEventHandler}
      draggable={true}
      onCreate={mapOnCreate}
      disableDoubleClickZoom={true}
      minLevel={MapService.minLevel}
    >
      <MarkerClusterer
        averageCenter={true}
        minLevel={MapService.clusterMinLevel}
        ref={clustererRef}
        onCreate={clustererOnCreate}
      />
      {init && <Features map={mapRef.current!} clusterer={clustererRef.current!} />}
    </Map>
  );
}

export default MapContent;
