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
import { cursorState } from '../states/maps/cursor';
import LocationFoundControl from './Map/Toolbar/LocationFound';

function TTBKKMap(): React.ReactElement {
  const center = useRecoilValue<[number, number]>(centerState);
  const zoom = useRecoilValue<number>(zoomState);
  const cursor = useRecoilValue(cursorState);

  const mapContainer = useMemo(
    () => (
      <MapContainer
        center={center}
        minZoom={3}
        zoom={zoom}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        style={{ height: '100%', width: '100%' }}
        maxBounds={[
          [90, 360],
          [-90, -360],
        ]}
      >
        <EventController />
        <LayerController />
        <PlaceList />
        <Sidebar />
        <ToolbarControl />
        <LocationFoundControl />
      </MapContainer>
    ),
    [],
  );

  return <div style={{ height: '100%', width: '100%', cursor }}>{mapContainer}</div>;
}

export default TTBKKMap;
