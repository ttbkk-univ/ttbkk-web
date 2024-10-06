import { useContext } from "react";
import { KakaoMapContext } from "react-kakao-maps-sdk";

export default function useMap() {
  return useContext(KakaoMapContext);
}
