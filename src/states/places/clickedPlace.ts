import { atom } from 'recoil';
import { LatLng } from 'leaflet';

export const clickedPlaceState = atom<LatLng | undefined>({
  key: 'clickedPlace',
  default: undefined,
});
