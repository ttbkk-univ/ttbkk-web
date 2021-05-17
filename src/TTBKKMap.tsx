import L, { LatLng, LeafletMouseEvent, Map } from 'leaflet';
import React, { ReactElement, useState } from 'react';
import { Popup, MapContainer, TileLayer, MapConsumer, CircleMarker } from 'react-leaflet';
import { places } from './places.mock';

function TTBKKMap(): ReactElement {
  const center: [number, number] = [37.505, 127.09];
  const [zoom, setZoom] = useState(13);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 99,
          display: createModalVisible ? 'contents' : 'none',
        }}
      >
        test
      </div>
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
              console.log(e);
              const location: LatLng = e.latlng;
              setCreateModalVisible(!createModalVisible);
              L.popup().setLatLng(location).setContent('만들기').openOn(map);
            });
            setZoom(map.getZoom());
            console.log('set zoom');
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
    </>
  );
}

export default TTBKKMap;
