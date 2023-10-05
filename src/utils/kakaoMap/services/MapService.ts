import { LatLng } from '../../../components/Map/MapContent';

export class MapService {
  public static minLevel: number = 1;
  public static defaultLevel: number = 8;
  public static clusterMinLevel: number = 5;

  static setCenter(map: kakao.maps.Map): void {
    const center = map.getCenter();
    window.localStorage.setItem(
      'center',
      JSON.stringify({
        latitude: center.getLat(),
        longitude: center.getLng(),
      }),
    );
  }

  static getCenter(): LatLng {
    // search param 이 있는 경우
    const centerFromSearchParams = new URLSearchParams(window.location.search).get('center');
    if (centerFromSearchParams?.toString().split(',').length) {
      const [lat, lng]: string[] = centerFromSearchParams.toString().split(',', 2);
      if (!isNaN(Number(lat)) && !isNaN(Number(lng))) {
        return { latitude: Number(lat), longitude: Number(lng) };
      }
    }

    // localstorage 가 있는 경우
    const centerFromLocalStorage = window.localStorage.getItem('center');
    if (centerFromLocalStorage) {
      return JSON.parse(centerFromLocalStorage);
    }

    // default
    return { latitude: 37.53026789291489, longitude: 127.12380358542175 };
  }

  static setZoom(map: kakao.maps.Map): void {
    window.localStorage.setItem('zoom', map.getLevel().toString());
    this.setCenter(map);
  }

  static getZoom(): number {
    const zoomFromSearchParams = new URLSearchParams(window.location.search).get('zoom');
    if (zoomFromSearchParams && !isNaN(Number(zoomFromSearchParams))) {
      return Number(zoomFromSearchParams);
    }

    const zoomFromLocalStorage = window.localStorage.getItem('zoom');
    return zoomFromLocalStorage ? Number(zoomFromLocalStorage) : this.defaultLevel;
  }

  static getGeoBound(map: kakao.maps.Map): [LatLng, LatLng] {
    const bounds = map.getBounds();
    const bottomLeft = bounds.getSouthWest();
    const topRight = bounds.getNorthEast();
    return [
      {
        latitude: bottomLeft.getLat(),
        longitude: bottomLeft.getLng(),
      },
      {
        latitude: topRight.getLat(),
        longitude: topRight.getLng(),
      },
    ];
  }

  static setMapController(map: kakao.maps.Map): void {
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
  }

  static isPassMinLevel(map: kakao.maps.Map): boolean {
    const isPrevLevelLargerThanMinLevel = this.getZoom() >= MapService.clusterMinLevel;
    const isCurrentLevelLargerThanMinLevel = map.getLevel() >= MapService.clusterMinLevel;
    return isPrevLevelLargerThanMinLevel !== isCurrentLevelLargerThanMinLevel;
  }
}
