import React from 'react';
import ShareMapButton from './ShareMapButton';

type Props = {
  map: kakao.maps.Map;
};
function ShareMap({ map }: Props): React.ReactElement {
  return <ShareMapButton map={map} />;
}

export default ShareMap;
