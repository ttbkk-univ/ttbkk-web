import { atom } from 'recoil';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export const centerState = atom<LatLng>({
  key: 'center',
  default: {
    latitude: 37.53026789291489,
    longitude: 127.12380358542175,
  },
});
