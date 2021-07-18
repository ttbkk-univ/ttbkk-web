import React from 'react';
import PlaceDetail from './PlaceDetail';
import CreatePlace from './CreatePlace';
import FindMyLocation from './FindMyLocation';
import ShareMap from './ShareMap';

function FeatureList(): React.ReactElement {
  return (
    <div>
      <PlaceDetail />
      <FindMyLocation />
      <CreatePlace />
      <ShareMap />
    </div>
  );
}

export default FeatureList;
