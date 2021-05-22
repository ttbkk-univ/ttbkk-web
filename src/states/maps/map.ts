import { atom } from 'recoil';
import { Map } from 'leaflet';

export const mapState = atom<Map | undefined>({
  key: 'map',
  default: undefined,
});
