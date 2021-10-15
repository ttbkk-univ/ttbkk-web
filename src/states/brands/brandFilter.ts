import { atom } from 'recoil';

export const brandFilterState = atom<{ name: string; visible: boolean }[]>({
  key: 'brandFilter',
  default: [],
});
