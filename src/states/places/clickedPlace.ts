import { atom } from "recoil";

export const clickedPlaceState = atom<string | undefined>({
  key: "clickedPlace",
  default: undefined,
});
