import React from 'react';
import FindMyLocationButton from './FindMyLocationButton';

type Props = {
  map: kakao.maps.Map;
};

function FindMyLocation({ map }: Props): React.ReactElement {
  return <FindMyLocationButton map={map} />;
}

export default FindMyLocation;
