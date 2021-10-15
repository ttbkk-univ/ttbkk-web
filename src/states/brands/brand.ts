import { selector } from 'recoil';
import axios from 'axios';
import { env } from '../../env';

export interface Brand {
  id: string;
  hashtags: string[];
  name: string;
  description?: string;
}

export const brandListState = selector<Brand[]>({
  key: 'brandList',
  get: async () => {
    const res = await axios.get(`${env.api.host}/api/brands/`);
    return res.data;
  },
});
