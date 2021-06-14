import React from 'react';
import { MdPlace } from 'react-icons/md';
import { Button } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { createPlaceButtonClickedState } from '../../states/buttons/createPlaceButtonState';

function CreatePlaceButton(): React.ReactElement {
  const setCreatePlaceButtonClicked = useSetRecoilState(createPlaceButtonClickedState);

  const clickEvent = (e: any): void => {
    setCreatePlaceButtonClicked({
      latitude: e.latLng.getLat(),
      longitude: e.latLng.getLng(),
    });
    window.kakao.maps.event.removeListener(window.map, 'click', clickEvent);
  };

  return (
    <div style={{ position: 'fixed', top: 100, right: 10, zIndex: 400 }}>
      <Button
        variant={'contained'}
        color={'primary'}
        style={{ height: 32, width: 32, padding: 0 }}
        onClick={(): void => {
          window.kakao.maps.event.addListener(window.map, 'click', clickEvent);
        }}
      >
        <MdPlace size={20} />
      </Button>
    </div>
  );
}

export default CreatePlaceButton;
