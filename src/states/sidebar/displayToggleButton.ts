import { atom } from 'recoil';

export const placeDetailDisplayState = atom<boolean>({
  key: 'placeDetailDisplayState',
  default: false,
});
