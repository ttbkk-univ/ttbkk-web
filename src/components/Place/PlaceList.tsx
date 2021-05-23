import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { placeMapState } from '../../states/places/placeMap';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { FeatureGroup } from 'react-leaflet';
import { IPlace } from '../../places.mock';
import { LeafletMouseEvent } from 'leaflet';
import Place from './Place';

function PlaceList(): React.ReactElement {
  const placeMap = useRecoilValue(placeMapState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  console.log(placeMap);
  return (
    <FeatureGroup
      interactive={true}
      bubblingMouseEvents={true}
      eventHandlers={{
        click: (e: LeafletMouseEvent): void => {
          setClickedPlace(e.propagatedFrom.id);
        },
      }}
    >
      {Object.values(placeMap).map((place: IPlace) => (
        <Place {...place} key={place.id} />
      ))}
    </FeatureGroup>
  );
}

export default PlaceList;
