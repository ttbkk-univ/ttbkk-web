import React, { useMemo } from 'react';
import { MapContainer } from 'react-leaflet';
import EventController from './Map/EventController';
import Sidebar from './Sidebar';
import { useRecoilValue } from 'recoil';
import { centerState } from '../states/maps/center';
import { zoomState } from '../states/maps/zoom';
import PlaceList from './Place/PlaceList';
import LayerController from './Map/LayerController';
import ToolbarControl from './Map/Toolbar/DrawToolbar';

function TTBKKMap(): React.ReactElement {
  const center = useRecoilValue<[number, number]>(centerState);
  const zoom = useRecoilValue<number>(zoomState);

  const mapContainer = useMemo(
    () => (
      <MapContainer
        center={center}
        minZoom={3}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        maxBounds={[
          [90, 360],
          [-90, -360],
        ]}
      >
        <EventController />
        <LayerController />
        <PlaceList />
      </MapContainer>
    ),
    [],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {mapContainer}
      <Sidebar />
      <ToolbarControl />
    </div>
  );
}

export default TTBKKMap;
