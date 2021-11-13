import { LatLng } from '../../../components/Map/MapContent';
import { env } from '../../../env';

export class MapService {
  public static minLevel: number = 7;

  static setMap(): void {
    const zoom = this.getZoom();
    const center = this.getCenter();
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(center.latitude, center.longitude),
      level: zoom,
    };
    window.map = new window.kakao.maps.Map(container, options);
  }

  static setCenter(): void {
    const center = window.map.getCenter();
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
      const [lat, lng]: string[] = centerFromSearchParams?.toString().split(',', 2);
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

  static setZoom(): void {
    window.localStorage.setItem('zoom', window.map.getLevel().toString());
    this.setCenter();
  }

  static getZoom(): number {
    const zoomFromSearchParams = new URLSearchParams(window.location.search).get('zoom');
    if (zoomFromSearchParams && !isNaN(Number(zoomFromSearchParams))) {
      return Number(zoomFromSearchParams);
    }

    const zoomFromLocalStorage = window.localStorage.getItem('zoom');
    return zoomFromLocalStorage ? Number(zoomFromLocalStorage) : 8;
  }

  static getGeoBound(): [LatLng, LatLng] {
    if (!window.map) throw Error('map is not initialized');
    const bounds = window.map.getBounds();
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

  static loadKakaoMap(callback?: (...args: any[]) => any): any {
    const kakaoMapScriptId = 'kakaoMap';
    const isExisting = document.getElementById(kakaoMapScriptId);

    if (!isExisting) {
      const script = this.addScript(
        'text/javascript',
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakao.mapApiKey}&libraries=services,clusterer&autoload=false`,
        kakaoMapScriptId,
      );
      script.onload = (): void => {
        callback?.();
      };
    }
  }

  static setMapController(): void {
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    window.map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    const zoomControl = new window.kakao.maps.ZoomControl();
    window.map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
  }

  static isPassMinLevel(): boolean {
    // console.log(this.getZoom(), window.map.getLevel(), MapService.minLevel);
    const isPrevLevelLargerThanMinLevel = this.getZoom() >= MapService.minLevel;
    const isCurrentLevelLargerThanMinLevel = window.map.getLevel() >= MapService.minLevel;
    return isPrevLevelLargerThanMinLevel !== isCurrentLevelLargerThanMinLevel;
  }

  private static addScript(type: string, src: string, id: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = type;
    script.src = src;
    script.id = id;
    document.head.appendChild(script);
    return script;
  }
}
