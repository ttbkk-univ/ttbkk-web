import { atom } from 'recoil';

export const zoomState = atom<number>({
  key: 'zoom',
  default: 8,
});
