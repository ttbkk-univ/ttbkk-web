import { atom } from 'recoil';

export const centerState = atom<{ latitude: number; longitude: number }>({
  key: 'center',
  default: {
    latitude: 37.53026789291489,
    longitude: 127.12380358542175,
  },
});
