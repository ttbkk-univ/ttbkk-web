import { postError } from '../../utils/HttpRequestUtil';
import { LatLng } from '../../components/Map/MapContent';
import { SupabaseClient } from '@supabase/supabase-js';

export interface IHashtag {
  hashtag_id: string;
}

export interface IBrand {
  id: string;
  name: string;
  description: string;
  hashtags: IHashtag[];
}

export interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  telephone?: string;
  description?: string;
  name: string;
  hashtags: IHashtag[];
  brand?: IBrand;
}

export async function getPlaceMap(
  supabaseClient: SupabaseClient,
  bottomLeft: LatLng,
  topRight: LatLng,
): Promise<{
  [key: string]: IPlace;
}> {
  const placeMap: { [key: string]: IPlace } = {};

  const searchParam = new URLSearchParams();
  searchParam.set('bottom_left', `${bottomLeft.latitude},${bottomLeft.longitude}`);
  searchParam.set('top_right', `${topRight.latitude},${topRight.longitude}`);

  const data = await supabaseClient
    .from('place')
    .select(
      `
            *,
            brand (*),
            place_hashtags (*)
          `,
    )
    .gte('latitude', bottomLeft.latitude)
    .lte('latitude', topRight.latitude)
    .gte('longitude', bottomLeft.longitude)
    .lte('longitude', topRight.longitude)
    .then(({ data, error }) => {
      if (error) {
        postError(error);
        throw new Error(error.message);
      }
      return data;
    });

  Object.values(data).forEach((place) => {
    placeMap[place.id] = place;
  });
  return placeMap;
}
