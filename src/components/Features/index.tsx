import FindMyLocation from './FindMyLocation';
import React from 'react';
import Sidebar from './Sidebar';
import BrandFilter from './BrandFilter';
import CreatePlaceModal from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceModal';
import CreatePlaceButton from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceButton';

function Features(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', zIndex: 400 }}>
      <CreatePlaceButton />
      <CreatePlaceModal />
      <BrandFilter />
      <Sidebar />
      <FindMyLocation />
    </div>
  );
}

export default Features;
