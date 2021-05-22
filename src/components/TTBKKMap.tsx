import React, { ReactElement, useMemo } from 'react';
import { MapContainer } from 'react-leaflet';
import LayerController from './Map/LayerController';
import EventController from './Map/EventController';
import Sidebar from './Sidebar';
import { useRecoilValue } from 'recoil';
import { centerState } from '../states/maps/center';
import { zoomState } from '../states/maps/zoom';
import PlaceList from './Map/PlaceList';

function TTBKKMap(): ReactElement {
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
      <Sidebar />
      {mapContainer}
    </div>
  );
}

export default TTBKKMap;
