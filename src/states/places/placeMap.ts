import { selector } from 'recoil';
import axios from 'axios';
import { env } from '../../env';

export interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
  description?: string;
  name: string;
  phone?: string;
}

export const placeMapState = selector<{ [key: string]: IPlace }>({
  key: 'places',
  get: async () => {
    const placeMap: { [key: string]: IPlace } = {};
    console.log(env.api.host);
    const response = await axios.get<IPlace[]>(env.api.host + '/api/places/');
    Object.values(response.data).forEach((place) => {
      placeMap[place.id] = place;
    });
    return placeMap;
  },
});

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
