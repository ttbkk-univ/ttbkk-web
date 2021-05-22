import { atom } from 'recoil';

export const centerState = atom<[number, number]>({
  key: 'center',
  default: [37.53026789291489, 127.12380358542175],
});
