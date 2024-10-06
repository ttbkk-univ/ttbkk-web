import { atom } from "recoil";

export const requireLoadState = atom<boolean>({
  key: "requireLoad",
  default: true,
});
