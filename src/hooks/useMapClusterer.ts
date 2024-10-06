import { useContext } from "react";
import { KakaoMapMarkerClustererContext } from "react-kakao-maps-sdk";

export default function useMapClusterer() {
  return useContext(KakaoMapMarkerClustererContext);
}
