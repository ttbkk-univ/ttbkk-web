import { LatLng } from "@/hooks/useMapPosition.ts";
import usePlaceMap, { IPlace } from "@/hooks/usePlaceMap.ts";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { sidebarIsOpenState } from "@/states/sidebar/siteIsOpen.ts";
import useZoomLevel from "@/hooks/useZoomLevel.ts";
import { clickedPlaceState } from "@/states/places/clickedPlace.ts";
import useMapClusterer from "@/hooks/useMapClusterer.ts";
import useMap from "@/hooks/useMap.ts";

type Props = {
  bottomLeft: LatLng;
  topRight: LatLng;
};

export default function PlaceGrid(props: Props) {
  console.log({ props });
  const map = useMap();
  const mapClusterer = useMapClusterer();
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setSidebarIsOpen = useSetRecoilState(sidebarIsOpenState);
  const { level, clusterMinLevel } = useZoomLevel();
  const { data, isLoading, error } = usePlaceMap({
    bottomLeft: props.bottomLeft,
    topRight: props.topRight,
  });
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
      kakao.maps.event.addListener(marker, "click", () => {
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
      const brandId = place.brand?.id || "no_brand";
      const brandName = place.brand?.name || "로컬";
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
      if (window.brands[brandId]?.visible) {
        markers.push(marker);
      }

      const nameOverlay = createNameOverlay(place);
      window.brands[brandId].nameOverlays.push(nameOverlay);
      if (clusterMinLevel > level && window.brands[brandId]?.visible) {
        nameOverlay.setMap(map);
      }
    });

    if (!mapClusterer) throw new Error("clusterer is not initialized");
    mapClusterer.addMarkers(markers);
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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || error) {
    return <div>Error</div>;
  }

  setMarkerCluster(data, setClickedPlace, setSidebarIsOpen);
  return null;
}
