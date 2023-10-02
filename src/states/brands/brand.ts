import { atom } from 'recoil';

export interface Brand {
  id?: string;
  hashtags?: string[];
  name: string;
  label: string;
  description?: string;
}

export const brandListState = atom<Brand[]>({
  key: 'brandList',
  default: [],
});
