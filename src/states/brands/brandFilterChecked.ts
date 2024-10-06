import { atom } from "recoil";

export const brandFilterCheckedState = atom<{ [brandName: string]: boolean }>({
  key: "brandFilterCheckedState",
  default: {
    all: true,
  },
});
