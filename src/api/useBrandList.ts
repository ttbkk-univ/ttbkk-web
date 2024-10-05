import useSupabase from '../hooks/useSupabase.ts';
import { useQuery } from '@tanstack/react-query';
import { postError } from '../utils/HttpRequestUtil.ts';
import { Brand } from '../states/brands/brand.ts';

export default function useBrandList() {
  const supabaseClient = useSupabase();
  return useQuery<Brand[], Error, Brand[]>({
    queryKey: ['brand-all'],
    queryFn: async () =>
      await supabaseClient
        .from('brand')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            postError(error).catch(console.error);
            return Promise.reject(error);
          }
          return data;
        }),
  });
}
