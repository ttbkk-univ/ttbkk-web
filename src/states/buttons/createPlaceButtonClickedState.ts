import { atom } from 'recoil';

export const createPlaceButtonClickedState = atom<boolean>({
  key: 'createPlaceButtonClickedState',
  default: false,
});
