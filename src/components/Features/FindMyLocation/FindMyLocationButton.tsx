import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import { Button } from '@material-ui/core';

function FindMyLocationButton(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', top: 50, right: 10, zIndex: 400 }}>
      <Button
        variant={'contained'}
        color={'primary'}
        style={{ height: 32, width: 32, padding: 0 }}
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
      </Button>
    </div>
  );
}

export default FindMyLocationButton;
