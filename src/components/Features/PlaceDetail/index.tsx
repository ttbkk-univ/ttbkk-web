import React from 'react';
import PlaceDetailDisplayButton from './PlaceDetailDisplayButton';
import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilValue } from 'recoil';
import { placeDetailDisplayState } from '../../../states/sidebar/displayToggleButton';

function PlaceDetail(): React.ReactElement {
  const display = useRecoilValue(placeDetailDisplayState);
  return (
    <div>
      <PlaceDetailDisplayButton />
      {display ? <PlaceDetailModal /> : undefined}
    </div>
  );
}

export default PlaceDetail;
