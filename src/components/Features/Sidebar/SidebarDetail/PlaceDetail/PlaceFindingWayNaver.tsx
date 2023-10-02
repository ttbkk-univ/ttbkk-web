import React from 'react';
import { Button } from '@mui/material';

interface PlaceFindingWayProps {
  latitude: number;
  longitude: number;
  name: string;
}

function PlaceFindingWayNaver(props: PlaceFindingWayProps): React.ReactElement {
  const { latitude, longitude, name } = props;
  const href: string = `nmap://route/public?dlat=${latitude}&dlng=${longitude}&dname=${name}`;

  return (
    <Button
      color={'primary'}
      variant={'contained'}
      href={href}
      onClick={(): void => {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(
            (position: Position) => {
              const hrefAlternate: string =
                'http://map.naver.com/index.nhn?' +
                `elng=${longitude}&elat=${latitude}&etext=${name}` +
                `&slng=${position.coords.longitude}&slat=${position.coords.latitude}&stext=내위치` +
                '&menu=route&pathType=1';
              window.open(hrefAlternate, '_blank');
            },
            (err: PositionError) => {
              alert(err.message); // cross origin일때, https로 요청해야함
            },
            { enableHighAccuracy: true, maximumAge: 10000 },
          );
          return;
        }, 500);
      }}
    >
      길찾기 (네이버)
    </Button>
  );
}

export default PlaceFindingWayNaver;
