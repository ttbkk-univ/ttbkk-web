import { Button } from '@material-ui/core';
import React from 'react';

interface PlaceFindingWayProps {
  latitude: number;
  longitude: number;
  name: string;
}

function PlaceFindingWayNaver(props: PlaceFindingWayProps): React.ReactElement {
  const { latitude, longitude, name } = props;
  const href: string = `nmap://route/public?dlat=${latitude}&dlng=${longitude}&dname=${name}`;
  // let position: Position | undefined = undefined;
  // // let hrefAlternate: string = '';
  // // navigator?.geolocation?.getCurrentPosition(
  // //   (currentPosition: Position) => {
  // //     position = currentPosition;
  // //     hrefAlternate = isMobile()
  // //       ? `https://m.map.naver.com/route.nhn` +
  // //         '?menu=route' +
  // //         `&ex=${longitude}&ey=${latitude}&ename=${name}` +
  // //         `&sx=${position.coords.latitude}&sy=${position.coords.longitude}` +
  // //         '&pathType=1&showMap=true'
  // //       : 'http://map.naver.com/index.nhn' +
  // //         `?slng=${position.coords.longitude}&slat=${position.coords.latitude}&stext=내위치` +
  // //         `&elng=${longitude}&elat=${latitude}&etext=${name}` +
  // //         '&menu=route' +
  // //         '&pathType=1';
  // //   },
  // //   (err: PositionError) => {
  // //     alert(err.message); // cross origin일때, https로 요청해야함
  // //   },
  // //   { enableHighAccuracy: true, maximumAge: 10000 },
  // // );

  return (
    <Button color={'primary'} variant={'contained'} href={href}>
      길찾기 (네이버)
    </Button>
  );
}

export default PlaceFindingWayNaver;
