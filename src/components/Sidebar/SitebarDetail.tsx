import React from 'react';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { zoomState } from '../../states/maps/zoom';

function SidebarDetail(): React.ReactElement {
  const clickedPlace = useRecoilValue(clickedPlaceState);
  const zoom = useRecoilValue(zoomState);
  return (
    <div>
      {clickedPlace && (
        <div>
          lat: {clickedPlace.lat}
          lng: {clickedPlace.lng}
        </div>
      )}
      <div>zoom: {zoom}</div>
    </div>
  );
}

export default SidebarDetail;
