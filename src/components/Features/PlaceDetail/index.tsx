import React, { useEffect } from 'react';
import PlaceDetailDisplayButton from './PlaceDetailDisplayButton';
import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilState } from 'recoil';
import { placeDetailDisplayState } from '../../../states/sidebar/displayToggleButton';
import useWindowDimensions from '../../../hooks/window';

function PlaceDetail(): React.ReactElement {
  const [display, setDisplay] = useRecoilState(placeDetailDisplayState);
  const { width } = useWindowDimensions();
  useEffect(() => {
    setDisplay(width > 600);
  }, []);
  return (
    <div>
      <PlaceDetailDisplayButton />
      {display ? <PlaceDetailModal /> : undefined}
    </div>
  );
}

export default PlaceDetail;
