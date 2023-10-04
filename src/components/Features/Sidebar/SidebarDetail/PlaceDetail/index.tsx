import React from 'react';
import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';

function PlaceDetail() {
  const clickedPlace = useRecoilValue(clickedPlaceState);
  return clickedPlace ? <PlaceDetailModal clickedPlace={clickedPlace} /> : null;
}

export default PlaceDetail;
