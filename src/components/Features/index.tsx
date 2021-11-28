import FindMyLocation from './FindMyLocation';
import React from 'react';
import Sidebar from './Sidebar';
import BrandFilter from './BrandFilter';

function Features(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', zIndex: 400 }}>
      <BrandFilter />
      <Sidebar />
      <FindMyLocation />
    </div>
  );
}

export default Features;
