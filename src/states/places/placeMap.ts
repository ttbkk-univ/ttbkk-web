import { env } from '../../env';
import { get } from '../../utils/HttpRequestUtil';
import { LatLng } from '../../components/Map/MapContent';

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
  brand: IBrand;
}

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

  const response = await get<{ edges: IPlace[]; count: number }>(
    env.api.host + '/api/places/grid/?' + searchParam.toString(),
  ).catch(() => {
    return { data: { edges: [], count: 0 } };
  });

  Object.values(response.data.edges).forEach((place) => {
    placeMap[place.id] = place;
  });
  return placeMap;
}

// const places: IPlace[] = [
//   {
//     id: uuidv4(),
//     latitude: 37.529299,
//     longitude: 127.116387,
//     name: '신전떡볶이 풍납점',
//     phone: '0212341234',
//   },
//   {
//     id: uuidv4(),
//     latitude: 37.532261,
//     longitude: 127.121712,
//     name: '셀프하우스',
//   },
//   {
//     id: uuidv4(),
//     latitude: 37.528799,
//     longitude: 127.11747,
//     name: '감탄떡볶이 풍납2동점',
//     phone: '0212341234',
//   },
// ];
//
// export const placeMapState = atom<{ [key: string]: IPlace }>({
//   key: 'places',
//   default: places.reduce((map: { [key: string]: IPlace }, place: IPlace) => {
//     map[place.id] = place;
//     return map;
//   }, {}),
// });
