import { atom } from "recoil";
import { LatLng } from "@/hooks/useMapPosition.ts";

export const createPlaceLatLngState = atom<LatLng | undefined>({
  key: "createPlaceLatLngState",
  default: undefined,
});
