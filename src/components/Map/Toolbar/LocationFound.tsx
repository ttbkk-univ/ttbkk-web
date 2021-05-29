import React from 'react';
import { MdMyLocation } from 'react-icons/md';

function LocationFoundControl(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', top: 150, left: 12, zIndex: 400 }}>
      <button
        style={{ height: 40, width: 40 }}
        onClick={(): void =>
          navigator?.geolocation?.getCurrentPosition((position: Position) => {
            const moveCenter = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            );
            window.map.setCenter(moveCenter);
          })
        }
      >
        <MdMyLocation size={20} />
      </button>
    </div>
  );
}

export default LocationFoundControl;
