import { selector } from 'recoil';
import axios from 'axios';

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
    const response = await axios.get<IPlace[]>('http://localhost:8000/api/places/');
    Object.values(response.data).forEach((place) => {
      placeMap[place.id] = place;
    });
    return placeMap;
  },
});
