import { atom } from 'recoil';

export const createPlaceModalDisplayState = atom<boolean>({
  key: 'createPlaceModalDisplayState',
  default: false,
});
