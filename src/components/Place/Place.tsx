import { useEffect } from 'react';
import { IPlace } from '../../places.mock';
import { useRef } from 'react';
import { Path } from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { placeMapState } from '../../states/places/placeMap';
import PlaceMarker from './PlaceMarker';

function Place(props: IPlace): null {
  const context = useLeafletContext();
  const clickedPlaceId = useRecoilValue(clickedPlaceState);
  const placeMap = useRecoilValue(placeMapState);
  const placeRef = useRef<Path | undefined>();
  const { latitude, longitude } = props;

  useEffect(() => {
    placeRef.current = new PlaceMarker(props.id, [latitude, longitude], {
      color: 'blue',
    });
    const container = context.layerContainer || context.map;
    container.addLayer(placeRef.current);
    return (): void => {
      placeRef.current && container.removeLayer(placeRef.current);
    };
  }, []);

  useEffect(() => {
    const clickedPlace = clickedPlaceId ? placeMap[clickedPlaceId] : undefined;
    if (clickedPlace?.latitude === props.latitude && clickedPlace.longitude === props.longitude) {
      placeRef.current?.setStyle({ color: 'red' });
    } else if (placeRef.current?.options.color === 'red') {
      placeRef.current?.setStyle({ color: 'blue' });
    }
  }, [clickedPlaceId]);

  return null;
}

export default Place;
