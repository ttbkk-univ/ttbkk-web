import React, { useCallback, useEffect } from 'react';
import { MdPlace } from 'react-icons/md';
import { Button } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createPlaceLatLngState } from '../../../states/buttons/createPlaceLatLngState';
import { createPlaceModalDisplayState } from '../../../states/buttons/createPlaceModalDisplayState';

function CreatePlaceButton(): React.ReactElement {
  const setCreatePlaceLatLng = useSetRecoilState(createPlaceLatLngState);
  const [createPlaceModalDisplay, setCreatePlaceModalDisplay] = useRecoilState(
    createPlaceModalDisplayState,
  );

  const clickEvent = useCallback((e: any): void => {
    setCreatePlaceLatLng({
      latitude: e.latLng.getLat(),
      longitude: e.latLng.getLng(),
    });
  }, []);

  useEffect(() => {
    if (!window.kakao || !window.map) return;
    if (createPlaceModalDisplay) {
      window.map.setCursor('crosshair');
      window.kakao.maps.event.addListener(window.map, 'click', clickEvent);
    } else {
      window.map.setCursor('grab');
      window.kakao.maps.event.removeListener(window.map, 'click', clickEvent);
    }
  }, [createPlaceModalDisplay]);

  return (
    <div style={{ position: 'fixed', top: 100, right: 10, zIndex: 400 }}>
      <Button
        variant={'contained'}
        color={createPlaceModalDisplay ? 'secondary' : 'primary'}
        style={{ height: 32, width: 32, padding: 0 }}
        onClick={(): void => setCreatePlaceModalDisplay(!createPlaceModalDisplay)}
      >
        <MdPlace size={20} />
      </Button>
    </div>
  );
}

export default CreatePlaceButton;
