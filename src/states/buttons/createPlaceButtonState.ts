import { atom } from 'recoil';
import { LatLng } from '../maps/center';

export const createPlaceButtonClickedState = atom<LatLng | undefined>({
  key: 'createPlaceButtonClicked',
  default: undefined,
});
