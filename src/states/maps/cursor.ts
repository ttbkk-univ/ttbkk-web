import { atom } from 'recoil';

export const cursorState = atom<'' | 'crosshair'>({
  key: 'cursor',
  default: '',
});
