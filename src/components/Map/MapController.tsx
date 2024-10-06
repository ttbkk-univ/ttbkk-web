import { useMap } from "react-kakao-maps-sdk";
import { useEffect } from "react";

export default function MapController() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
  }, [map]);

  return null;
}
