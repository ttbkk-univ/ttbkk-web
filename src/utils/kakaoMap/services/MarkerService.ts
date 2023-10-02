import { IPlace } from '../../../states/places/placeMap';
import { SetterOrUpdater } from 'recoil';
import { MapService } from './MapService';

export class MarkerService {
  static setMarkerCluster(
    newPlaceMap: { [p: string]: IPlace },
    setClickedPlace: SetterOrUpdater<string | undefined>,
    setSidebarIsOpen: SetterOrUpdater<boolean>,
  ): void {
    class PlaceMarker extends window.kakao.maps.Marker {
      id: string;

      constructor(props) {
        super(props);
        this.id = props.id;
      }
    }

    const placeToMarker = (place: IPlace): PlaceMarker => {
      const marker = new PlaceMarker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        title: place.name,
        clickable: true,
        id: place.id,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setClickedPlace(marker.id);
        setSidebarIsOpen(true);
      });
      return marker;
    };

    window.clusterer =
      window.clusterer ||
      new window.kakao.maps.MarkerClusterer({
        map: window.map,
        averageCenter: true,
        minLevel: MapService.minLevel,
      });

    const markers: PlaceMarker[] = [];
    if (!window.placeMap) window.placeMap = {};
    Object.values(newPlaceMap).forEach((place: IPlace) => {
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

      const nameOverlay = MarkerService.createNameOverlay(place);
      window.brands[brandId].nameOverlays.push(nameOverlay);
      MapService.minLevel > MapService.getZoom() &&
        window.brands[brandId]?.visible &&
        nameOverlay.setMap(window.map);
    });
    window.clusterer.addMarkers(markers);
  }

  static createNameOverlay(place: IPlace) {
    return new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      content: `<div style="user-select: none; pointer-events: none; font-size: 12px; line-height: 12px; padding: 2px; text-align: center; color: white; text-shadow: 0 0 1px #000000, 0 0 1em #000000, 0 0 0.2em #000000"><strong>${
        place.brand?.name || place.name
      }</strong></div>`,
      yAnchor: 0,
      clickable: false,
    });
  }

  static applyClusterFilter(brandHashList: string[], status: boolean): void {
    const markers = [];
    brandHashList.forEach((brandHash: string) => {
      if (window.brands[brandHash]) markers.push(...window.brands[brandHash].markers);
    });
    brandHashList.forEach(
      (brandHash: string) =>
        MapService.minLevel > MapService.getZoom() &&
        window.brands[brandHash]?.nameOverlays.map((nameOverlay) =>
          nameOverlay.setMap(status ? window.map : null),
        ),
    );
    if (status) {
      window.clusterer.addMarkers(markers);
    } else {
      window.clusterer.removeMarkers(markers);
    }
  }
}
