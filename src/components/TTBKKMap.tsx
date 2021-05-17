import React, { ReactElement } from 'react';
import { MapContainer } from 'react-leaflet';
import { places } from '../places.mock';
import LayerController from './LayerController';
import PlaceList from './Place';
import EventController from './EventController';

function TTBKKMap(): ReactElement {
  const center: [number, number] = [37.53026789291489, 127.12380358542175];
  const zoom: number = 13;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <EventController />
      <LayerController />
      <PlaceList places={places} />
    </MapContainer>
  );
}

export default TTBKKMap;
