import React from 'react';
import CreatePlace from './CreatePlace';
import FindMyLocation from './FindMyLocation';
import ShareMap from './ShareMap';

function ButtonControlBar(): React.ReactElement {
  return (
    <div>
      <FindMyLocation />
      <CreatePlace />
      <ShareMap />
    </div>
  );
}

export default ButtonControlBar;
