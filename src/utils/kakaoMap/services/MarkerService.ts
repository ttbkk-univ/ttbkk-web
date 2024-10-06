import { IPlace } from "@/hooks/usePlaceMap.ts";

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
}
