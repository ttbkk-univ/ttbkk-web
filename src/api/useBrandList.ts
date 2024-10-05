import useSupabase from '../hooks/useSupabase.ts';
import { useQuery } from 'react-query';
import { Brand } from '../states/brands/brand.ts';
import { postError } from '../utils/HttpRequestUtil.ts';

export default function useBrandList() {
  const supabaseClient = useSupabase();
  return useQuery<Brand[]>('brand-all', () =>
    supabaseClient
      .from('brand')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          postError(error).catch(console.error);
          return Promise.reject(error);
        }
        return data;
      }),
  );
}
