import React from 'react';
import ShareMap from './ShareMap';
import PlaceDetail from './PlaceDetail';
import CreatePlaceButton from './CreatePlace/CreatePlaceButton';
import Profile from './Profile';

type Props = {
  map: kakao.maps.Map;
};
function SidebarDetail({ map }: Props): React.ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'white',
        height: '100%',
        width: 300,
        boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 2px 0px',
      }}
    >
      <Profile />
      <PlaceDetail />
      <ShareMap map={map} />
      <CreatePlaceButton map={map} />
    </div>
  );
}

export default SidebarDetail;
