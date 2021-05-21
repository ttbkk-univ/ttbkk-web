import React, { Dispatch, SetStateAction } from 'react';
import { MapConsumer } from 'react-leaflet';
import { Map } from 'leaflet';

interface EventControllerProps {
  setZoom: Dispatch<SetStateAction<number>>;
}

function EventController(props: EventControllerProps): React.ReactElement {
  const { setZoom } = props;
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
