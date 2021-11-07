import FindMyLocation from './FindMyLocation';
import React from 'react';
import Sidebar from './Sidebar';
import BrandFilter from './BrandFilter';

function Features(): React.ReactElement {
  return (
    <>
      <BrandFilter />
      <Sidebar />
      <FindMyLocation />
    </>
  );
}

export default Features;
