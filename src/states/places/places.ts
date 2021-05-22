import { atom } from 'recoil';
import { IPlace, places } from '../../places.mock';

export const placeListState = atom<IPlace[]>({
  key: 'places',
  default: places.map((place: IPlace) => {
    return {
      ...place,
      color: 'blue',
    };
  }),
});
