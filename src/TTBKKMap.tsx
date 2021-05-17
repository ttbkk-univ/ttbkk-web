import L, { LeafletMouseEvent, Map } from 'leaflet';
import React, { ReactElement } from 'react';
import { Popup, MapContainer, TileLayer, MapConsumer, CircleMarker } from 'react-leaflet';
import { places } from './places.mock';

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
      <MapConsumer>
        {(map: Map): null => {
          map.on('click', (e: LeafletMouseEvent) => {
            L.popup().setLatLng(e.latlng).setContent('만들기').openOn(map);
          });
          return null;
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div>
        {places.map((place: { lng: number; name: string; lat: number }) => {
          return (
            <>
              <CircleMarker center={[place.lat, place.lng]}>
                <Popup>{place.name}</Popup>
              </CircleMarker>
            </>
          );
        })}
      </div>
    </MapContainer>
  );
}

export default TTBKKMap;
