import { atom } from 'recoil';
import { IPlace, places } from '../../places.mock';

export const placeMapState = atom<{ [key: string]: IPlace }>({
  key: 'places',
  default: places.reduce((map: { [key: string]: IPlace }, place: IPlace) => {
    map[place.id] = place;
    return map;
  }, {}),
});
