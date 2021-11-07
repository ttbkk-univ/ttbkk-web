import React from 'react';
import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';

function PlaceDetail(): React.ReactElement {
  const clickedPlace = useRecoilValue(clickedPlaceState);
  return clickedPlace ? <PlaceDetailModal /> : <></>;
}

export default PlaceDetail;
