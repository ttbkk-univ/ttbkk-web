import React from 'react';
import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilValue } from 'recoil';
import { placeDetailDisplayState } from '../../../states/sidebar/displayToggleButton';
import { clickedPlaceState } from '../../../states/places/clickedPlace';

function PlaceDetail(): React.ReactElement {
  const display = useRecoilValue(placeDetailDisplayState);
  const clickedPlace = useRecoilValue(clickedPlaceState);
  return display && clickedPlace ? <PlaceDetailModal /> : <></>;
}

export default PlaceDetail;
