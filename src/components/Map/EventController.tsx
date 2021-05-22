import React from 'react';
import { MapConsumer } from 'react-leaflet';
import { Map } from 'leaflet';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { zoomState } from '../../states/maps/zoom';

function EventController(): React.ReactElement {
  const setZoom: SetterOrUpdater<number> = useSetRecoilState<number>(zoomState);
  return (
    <MapConsumer>
      {(map: Map): null => {
        map.on('zoomend', () => setZoom(map.getZoom()));
        return null;
      }}
    </MapConsumer>
  );
}

export default EventController;
