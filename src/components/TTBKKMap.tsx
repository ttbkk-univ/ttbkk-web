import React, { ReactElement, useMemo, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { Map } from 'leaflet';
import { places } from '../places.mock';
import LayerController from './Map/LayerController';
import PlaceList from './Map/Place';
import EventController from './Map/EventController';
import Sidebar from './Sidebar';

function TTBKKMap(): ReactElement {
  const center: [number, number] = [37.53026789291489, 127.12380358542175];
  const zoom: number = 13;
  const [map, setMap] = useState<Map | undefined>(undefined);

  const mapContainer = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{
          height: '100%',
          width: '100%',
        }}
        whenCreated={(createdMap: Map): void => setMap(createdMap)}
      >
        <EventController />
        <LayerController />
        <PlaceList places={places} />
      </MapContainer>
    ),
    [],
  );

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {map ? <Sidebar map={map} /> : undefined}
      {mapContainer}
    </div>
  );
}

export default TTBKKMap;
