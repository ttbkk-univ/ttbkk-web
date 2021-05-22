import { useEffect } from 'react';
import { IPlace } from '../../places.mock';
import { useRef } from 'react';
import L, { Path } from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../states/places/clickedPlace';

function Place(props: IPlace): null {
  const context = useLeafletContext();
  const clickedPlace = useRecoilValue(clickedPlaceState);
  const placeRef = useRef<Path | undefined>();
  const { latitude, longitude } = props;

  useEffect(() => {
    placeRef.current = new L.CircleMarker([latitude, longitude], { color: 'blue' });
    const container = context.layerContainer || context.map;
    container.addLayer(placeRef.current);
    return (): void => {
      placeRef.current && container.removeLayer(placeRef.current);
    };
  }, []);

  useEffect(() => {
    if (clickedPlace?.lat === props.latitude && clickedPlace.lng === props.longitude) {
      placeRef.current?.setStyle({ color: 'red' });
    } else if (placeRef.current?.options.color === 'red') {
      placeRef.current?.setStyle({ color: 'blue' });
    }
  }, [clickedPlace]);

  return null;
}

export default Place;
