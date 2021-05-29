import { atom } from 'recoil';

export const sidebarDisplayState = atom<boolean>({
  key: 'sidebarDisplay',
  default: false,
});
