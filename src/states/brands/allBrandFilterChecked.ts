import { atom } from 'recoil';

export const allBrandFilterCheckedState = atom<boolean>({
  key: 'allBrandFilterChecked',
  default: true,
});
