import { env } from '../../env';
import { get } from '../../utils/HttpRequestUtil';
import { LatLng } from '../../components/Map/MapContent';
import { queryClient } from '../../utils/ReactQuery';

export interface IHashtag {
  name: string;
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

type Page<T> = {
  edges: T[];
  count: number;
};

export async function getPlaceMap(
  bottomLeft: LatLng,
  topRight: LatLng,
): Promise<{
  [key: string]: IPlace;
}> {
  const placeMap: { [key: string]: IPlace } = {};

  const searchParam = new URLSearchParams();
  searchParam.append('bottom_left', `${bottomLeft.latitude},${bottomLeft.longitude}`);
  searchParam.append('top_right', `${topRight.latitude},${topRight.longitude}`);

  const data: Page<IPlace> = await queryClient
    .fetchQuery(
      'places-' + searchParam.toString(),
      () => get<Page<IPlace>>(env.api.host + '/api/places/grid/?' + searchParam.toString()),
      {
        staleTime: 1000 * 30,
      },
    )
    .catch((): Page<IPlace> => {
      return { edges: [], count: 0 };
    });

  Object.values(data.edges).forEach((place) => {
    placeMap[place.id] = place;
  });
  return placeMap;
}
