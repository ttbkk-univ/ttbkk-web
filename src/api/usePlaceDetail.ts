import useSupabase from '../hooks/useSupabase.ts';
import { useQuery } from 'react-query';
import { IPlace } from '../states/places/placeMap.ts';

export default function usePlaceDetail(clickedPlaceId: string) {
  const supabaseClient = useSupabase();
  return useQuery(`place-${clickedPlaceId}`, () =>
    supabaseClient
      .from('place')
      .select(
        `
        *,
        brand (
          *,
          hashtags:brand_hashtags!brand_id (
            hashtag_id
          )
        ),
        hashtags:place_hashtags!place_id (
          hashtag_id
        )
      `,
      )
      .eq('id', clickedPlaceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return Promise.reject(error);
        }
        return data as IPlace;
      }),
  );
}
