import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createPlaceButtonClickedState } from '../../states/buttons/createPlaceButtonState';
import { Button } from '@material-ui/core';
import { MdCancel } from 'react-icons/all';

export function CreatePlaceModal(): React.ReactElement {
  const [latLng, setCreatePlaceButtonClicked] = useRecoilState(createPlaceButtonClickedState);
  useEffect(() => {
    console.log(latLng);
  }, [latLng]);

  return latLng ? (
    <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 400 }}>
      <div style={{ backgroundColor: 'rgba(30, 60,80,0.8)', height: 300, width: 300 }}>
        {latLng.latitude}, {latLng.longitude}
        <Button onClick={(): void => setCreatePlaceButtonClicked(undefined)}>
          <MdCancel />
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}
