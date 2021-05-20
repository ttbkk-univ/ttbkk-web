import React from 'react';
import { LatLng, Map } from 'leaflet';

interface SidebarProps {
  map?: Map;
}

function SidebarDetail(props: SidebarProps): React.ReactElement {
  const { map } = props;
  const center: LatLng | undefined = map?.getCenter();
  const zoom: number | undefined = map?.getZoom();
  return (
    <div>
      <div>
        lat: {center?.lat}
        lng: {center?.lng}
        alt: {center?.alt}
      </div>
      <div>zoom: {zoom}</div>
    </div>
  );
}

export default SidebarDetail;
