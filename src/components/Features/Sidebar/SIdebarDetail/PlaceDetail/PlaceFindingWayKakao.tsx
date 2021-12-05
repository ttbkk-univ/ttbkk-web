import { Button } from '@material-ui/core';
import React from 'react';

interface PlaceFindingWayProps {
  latitude: number;
  longitude: number;
  name: string;
}

function PlaceFindingWayKakao(props: PlaceFindingWayProps): React.ReactElement {
  const { latitude, longitude } = props;
  const href: string = `kakaomap://route?ep=${latitude},${longitude}&by=PUBLICTRANSIT`;
  // const hrefAlternate: string = `https://map.kakao.com/link/to/${name},${latitude},${longitude}`;
  return (
    <Button color={'primary'} variant={'contained'} href={href}>
      길찾기 (카카오)
    </Button>
  );
}

export default PlaceFindingWayKakao;
