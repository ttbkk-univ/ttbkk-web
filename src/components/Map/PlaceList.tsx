import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { placeListState } from '../../states/places/places';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { FeatureGroup } from 'react-leaflet';
import { IPlace } from '../../places.mock';
import { LeafletMouseEvent } from 'leaflet';
import Place from './Place';

function PlaceList(): React.ReactElement {
  const places = useRecoilValue(placeListState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);

  return (
    <FeatureGroup
      interactive={true}
      bubblingMouseEvents={true}
      children={places.map((place: IPlace) => (
        <Place {...place} key={place.id} />
      ))}
      eventHandlers={{
        click: (e: LeafletMouseEvent): void => {
          setClickedPlace(e.latlng);
        },
      }}
    />
  );
}

export default PlaceList;
