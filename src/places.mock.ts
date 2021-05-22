import { v4 as uuidv4 } from 'uuid';

export interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export const places: IPlace[] = [
  {
    id: uuidv4(),
    latitude: 37.529299,
    longitude: 127.116387,
    name: '신전떡볶이 풍납점',
  },
  {
    id: uuidv4(),
    latitude: 37.532261,
    longitude: 127.121712,
    name: '셀프하우스',
  },
  {
    id: uuidv4(),
    latitude: 37.528799,
    longitude: 127.11747,
    name: '감탄떡볶이 풍납2동점',
  },
];
