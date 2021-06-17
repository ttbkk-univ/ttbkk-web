import { atom } from 'recoil';
import { LatLng } from '../maps/center';

export const createPlaceLatLngState = atom<LatLng | undefined>({
  key: 'createPlaceLatLngState',
  default: undefined,
});
