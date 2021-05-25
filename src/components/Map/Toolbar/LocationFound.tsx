import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import { useLeafletContext } from '@react-leaflet/core';

function LocationFoundControl(): React.ReactElement {
  const context = useLeafletContext();

  return (
    <div style={{ position: 'fixed', top: 150, left: 12, zIndex: 400 }}>
      <button
        style={{ height: 30, width: 30 }}
        onClick={(): void =>
          navigator?.geolocation?.getCurrentPosition((position: Position) => {
            context.map.setView([position.coords.latitude, position.coords.longitude], 15);
          })
        }
      >
        <MdMyLocation />
      </button>
    </div>
  );
}

export default LocationFoundControl;
