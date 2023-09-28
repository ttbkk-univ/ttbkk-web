import React from 'react';
import CreatePlaceButton from './CreatePlaceButton';
import CreatePlaceModal from './CreatePlaceModal';

function CreatePlace(): React.ReactElement {
  return (
    <div>
      <CreatePlaceButton />
      <CreatePlaceModal />
    </div>
  );
}

export default CreatePlace;
