// import { atom } from 'recoil';
import { env } from '../../env';
import { get } from '../../utils/httpRequest.util';
import { GeoBound } from '../../components/Map/MapContent';

export interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
  description?: string;
  name: string;
  hashtags: any[];
}

export async function getPlaceMap([bottomLeft, topRight]: GeoBound): Promise<{
  [key: string]: IPlace;
}> {
  const placeMap: { [key: string]: IPlace } = {};

  const searchParam = new URLSearchParams();
  searchParam.append('bottom_left', `${bottomLeft.latitude},${bottomLeft.longitude}`);
  searchParam.append('top_right', `${topRight.latitude},${topRight.longitude}`);
  const response = await get<IPlace[]>(
    env.api.host + '/api/places/?' + searchParam.toString(),
  ).catch(() => {
    return { data: [] };
  });

  Object.values(response.data).forEach((place) => {
    placeMap[place.id] = place;
  });
  return placeMap;
}

// export const placeMapState = atom<{ [key: string]: IPlace }>({
//   key: 'places',
//   default: {},
// });

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
