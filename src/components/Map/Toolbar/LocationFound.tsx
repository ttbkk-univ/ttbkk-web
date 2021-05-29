import React from 'react';
import { MdMyLocation } from 'react-icons/md';

function LocationFoundControl(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', bottom: 220, right: 3, zIndex: 400 }}>
      <button
        style={{ height: 32, width: 32, padding: 0, backgroundColor: 'white' }}
        onClick={(): void =>
          navigator?.geolocation?.getCurrentPosition(
            (position: Position) => {
              const moveCenter = new window.kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude,
              );
              window.map.setCenter(moveCenter);
            },
            (err: PositionError) => {
              alert(err.message); // cross origin일때, https로 요청해야함
            },
            { enableHighAccuracy: true, maximumAge: 10000 },
          )
        }
      >
        <MdMyLocation size={20} />
      </button>
    </div>
  );
}

export default LocationFoundControl;
