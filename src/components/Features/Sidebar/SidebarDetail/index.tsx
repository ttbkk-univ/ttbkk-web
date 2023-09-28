import React from 'react';
import CreatePlace from './CreatePlace';
import ShareMap from './ShareMap';
// import Profile from './Profile';
import PlaceDetail from './PlaceDetail';

function SidebarDetail(): React.ReactElement {
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
      {/*<Profile />*/}
      <PlaceDetail />
      <ShareMap />
      <CreatePlace />
    </div>
  );
}

export default SidebarDetail;
