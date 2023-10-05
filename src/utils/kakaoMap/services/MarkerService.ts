import { IPlace } from '../../../states/places/placeMap';
import { MapService } from './MapService';

export class MarkerService {
  static createNameOverlay(place: IPlace) {
    return new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
      content: `<div style="user-select: none; pointer-events: none; font-size: 12px; line-height: 12px; padding: 2px; text-align: center; color: white; text-shadow: 0 0 1px #000000, 0 0 1em #000000, 0 0 0.2em #000000"><strong>${
        place.brand?.name || place.name
      }</strong></div>`,
      yAnchor: 0,
      clickable: false,
    });
  }

  static applyClusterFilter(
    brandHashList: string[],
    status: boolean,
    map: kakao.maps.Map,
    clusterer: kakao.maps.MarkerClusterer,
  ): void {
    const markers: kakao.maps.Marker[] = [];
    brandHashList.forEach((brandHash: string) => {
      if (window.brands[brandHash]) markers.push(...window.brands[brandHash].markers);
    });
    brandHashList.forEach(
      (brandHash: string) =>
        MapService.clusterMinLevel > MapService.getZoom() &&
        window.brands[brandHash]?.nameOverlays.map((nameOverlay) =>
          nameOverlay.setMap(status ? map : null),
        ),
    );
    if (status) {
      clusterer.addMarkers(markers);
    } else {
      clusterer.removeMarkers(markers);
    }
  }
}
