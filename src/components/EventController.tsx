import React from 'react';
import { MapConsumer } from 'react-leaflet';
import L, { LeafletMouseEvent, Map } from 'leaflet';

function EventController(): React.ReactElement {
  return (
    <MapConsumer>
      {(map: Map): null => {
        map.on('click', (e: LeafletMouseEvent) => {
          L.popup().setLatLng(e.latlng).setContent('만들기').openOn(map);
        });
        return null;
      }}
    </MapConsumer>
  );
}

export default EventController;
