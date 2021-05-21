import React, { ReactElement, useMemo, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLng, Map } from 'leaflet';
import { places } from '../places.mock';
import LayerController from './Map/LayerController';
import PlaceList from './Map/Place';
import EventController from './Map/EventController';
import Sidebar from './Sidebar';

function TTBKKMap(): ReactElement {
  const center: [number, number] = [37.53026789291489, 127.12380358542175];
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(13);
  const [clickedPlace, setClickedPlace] = useState<LatLng | undefined>(undefined);

  const mapContainer = useMemo(
    () => (
      <MapContainer
        center={center}
        minZoom={3}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(createdMap: Map): void => setMap(createdMap)}
        maxBounds={[
          [90, 360],
          [-90, -360],
        ]}
      >
        <EventController setZoom={setZoom} />
        <LayerController />
        <PlaceList places={places} setClickedPlace={setClickedPlace} />
      </MapContainer>
    ),
    [],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {map ? <Sidebar zoom={zoom} clickedPlace={clickedPlace} /> : undefined}
      {mapContainer}
    </div>
  );
}

export default TTBKKMap;
