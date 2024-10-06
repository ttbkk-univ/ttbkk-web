import { atom } from "recoil";
import { LatLng } from "../../components/Map/MapContent";

export const createPlaceLatLngState = atom<LatLng | undefined>({
  key: "createPlaceLatLngState",
  default: undefined,
});
