import { atom } from 'recoil';

export const brandFilterState = atom<{ name: string; visible: boolean }[]>({
  key: 'brandFilter',
  default: [],
});

export const allBrandFilterCheckedState = atom<boolean>({
  key: 'allBrandFilterChecked',
  default: true,
});
