import React from 'react';
import { MdMyLocation } from 'react-icons/md';

function FindMyLocationButton(): React.ReactElement {
  return (
    <button
      title={'내 위치'}
      style={{
        border: 'none',
        height: 32,
        width: 32,
        padding: 0,
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 215,
        right: 3,
        zIndex: 399,
        borderRadius: 3,
        cursor: 'pointer',
        boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 2px 0px',
      }}
      onClick={(): void =>
        navigator?.geolocation?.getCurrentPosition(
          (position: Position) => {
            const moveCenter = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            );
            window.map.setCenter(moveCenter);
            window.map.setLevel(6);
          },
          (err: PositionError) => {
            alert(err.message); // cross origin일때, https로 요청해야함
          },
          { enableHighAccuracy: true, maximumAge: 10000 },
        )
      }
    >
      <MdMyLocation size={16} />
    </button>
  );
}

export default FindMyLocationButton;
