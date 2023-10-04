import React from 'react';
import { Button } from '@mui/material';

interface PlaceFindingWayProps {
  latitude: number;
  longitude: number;
  name: string;
}

function PlaceFindingWayKakao(props: PlaceFindingWayProps): React.ReactElement {
  const { latitude, longitude, name } = props;
  const href: string = `kakaomap://route?ep=${latitude},${longitude}&by=PUBLICTRANSIT`;
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      href={href}
      onClick={(): void => {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const hrefAlternate: string = `https://map.kakao.com/link/to/${name},${latitude},${longitude}/from/내위치,${position.coords.latitude},${position.coords.longitude}`;
              window.open(hrefAlternate, '_blank');
            },
            (err: GeolocationPositionError) => {
              alert(err.message); // cross origin일때, https로 요청해야함
            },
            { enableHighAccuracy: true, maximumAge: 10000 },
          );
          return;
        }, 500);
      }}
    >
      길찾기 (카카오)
    </Button>
  );
}

export default PlaceFindingWayKakao;
