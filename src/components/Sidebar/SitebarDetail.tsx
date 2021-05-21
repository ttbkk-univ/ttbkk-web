import React from 'react';
import { LatLng, Map } from 'leaflet';

interface SidebarDetailProps {
  map?: Map;
  clickedPlace: LatLng | undefined;
  zoom: number;
}

function SidebarDetail(props: SidebarDetailProps): React.ReactElement {
  const { clickedPlace, zoom } = props;
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
