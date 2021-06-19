import React from 'react';
import PlaceDetail from './PlaceDetail';
import CreatePlace from './CreatePlace';
import FindMyLocation from './FindMyLocation';

function FeatureList(): React.ReactElement {
  return (
    <div>
      <PlaceDetail />
      <FindMyLocation />
      <CreatePlace />
    </div>
  );
}

export default FeatureList;
