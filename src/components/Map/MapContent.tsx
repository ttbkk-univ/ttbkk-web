import {
  LoaderOptions,
  Map,
  MarkerClusterer,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { env } from "@/env.ts";
import Features from "../Features";
import useMapPosition from "@/hooks/useMapPosition.ts";
import MapController from "@/components/Map/MapController.tsx";
import PlaceController from "@/components/Map/PlaceController.tsx";
import MapEventController from "@/components/Map/MapEventController.ts";
import { IPlace } from "@/hooks/usePlaceMap.ts";
import useZoomLevel from "@/hooks/useZoomLevel.ts";

declare global {
  interface Window {
    placeMap: { [p: string]: IPlace };
    newPlace: kakao.maps.Marker | undefined;
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

function MapContent() {
  useKakaoLoader({
    appkey: env.kakao.mapApiKey,
    libraries: ["services", "clusterer"],
    nonce: "ttbkkmap",
    retries: 3,
  } as LoaderOptions);

  const { position } = useMapPosition();
  const { level, minLevel, clusterMinLevel } = useZoomLevel();
  return (
    <Map
      id={"map"}
      style={{ width: "100%", height: "100%" }}
      center={{
        lat: position.latitude,
        lng: position.longitude,
      }}
      level={level}
      minLevel={minLevel}
      draggable={true}
      disableDoubleClickZoom={true}
    >
      <MapEventController />
      <MapController />
      <MarkerClusterer averageCenter={true} minLevel={clusterMinLevel}>
        <PlaceController />
      </MarkerClusterer>
      <Features />
    </Map>
  );
}

export default MapContent;
