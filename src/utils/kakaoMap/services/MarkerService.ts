import { IPlace } from '../../../states/places/placeMap';
import { SetterOrUpdater } from 'recoil';
import { getMD5 } from '../../HashUtil';
import { MapService } from './MapService';

export class MarkerService {
  static setMarkerCluster(
    placeMap: { [p: string]: IPlace },
    newPlaceMap: { [p: string]: IPlace },
    setClickedPlace: SetterOrUpdater<string | undefined>,
    setSidebarIsOpen: SetterOrUpdater<boolean>,
  ): void {
    class PlaceMarker extends window.kakao.maps.Marker {
      id: string;

      constructor(props: any) {
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
    Object.values(newPlaceMap).forEach((place: IPlace) => {
      if (placeMap && placeMap[place.id]) return;
      const marker: PlaceMarker = placeToMarker(place);
      const brandHash = getMD5(place.brand.name);
      if (!window.brands) window.brands = {};
      if (!window.brands[brandHash]) {
        window.brands[brandHash] = {
          name: place.brand.name,
          markers: [],
          nameOverlays: [],
          visible: true,
        };
      }
      window.brands[brandHash].markers.push(marker);
      window.brands[brandHash]?.visible && markers.push(marker);

      const nameOverlay = MarkerService.createNameOverlay(place);
      window.brands[brandHash].nameOverlays.push(nameOverlay);
      MapService.minLevel > MapService.getZoom() &&
        window.brands[brandHash]?.visible &&
        nameOverlay.setMap(window.map);
    });
    window.clusterer.addMarkers(markers);
  }

  static createNameOverlay(place: IPlace): any {
    return new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      content: `<div style="user-select: none; pointer-events: none; transform: translate(0%, 100%); font-size: 14px; padding: 2px; text-align: center; overflow: hidden; color: red; text-shadow: -1px 1px 0 pink, 1px -1px 0 pink, 1px 1px 0 pink, -1px -1px 0 pink">${place.brand.name}</div>`,
      yAnchor: 1,
    });
  }

  static applyClusterFilter(brandHashList: string[], status: boolean): void {
    const markers: any[] = [];
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
