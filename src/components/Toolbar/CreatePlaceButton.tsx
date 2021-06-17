import React, { useEffect } from 'react';
import { MdPlace } from 'react-icons/md';
import { Button } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createPlaceLatLngState } from '../../states/buttons/createPlaceLatLngState';
import { createPlaceButtonClickedState } from '../../states/buttons/createPlaceButtonClickedState';

const events: ((e: any) => void)[] = [];
function CreatePlaceButton(): React.ReactElement {
  const setCreatePlaceLatLng = useSetRecoilState(createPlaceLatLngState);
  const [createPlaceButtonClicked, setCreatePlaceButtonClicked] = useRecoilState(
    createPlaceButtonClickedState,
  );

  const clickEvent = (e: any): void => {
    setCreatePlaceLatLng({
      latitude: e.latLng.getLat(),
      longitude: e.latLng.getLng(),
    });
  };

  useEffect(() => {
    if (createPlaceButtonClicked) {
      events.push(clickEvent);
      window.map.setCursor('crosshair');
      window.kakao.maps.event.addListener(window.map, 'click', clickEvent);
    } else {
      window.map?.setCursor('grab');
      window.kakao?.maps.event.removeListener(window.map, 'click', events.pop());
    }
  }, [createPlaceButtonClicked]);

  return (
    <div style={{ position: 'fixed', top: 100, right: 10, zIndex: 400 }}>
      <Button
        variant={'contained'}
        color={createPlaceButtonClicked ? 'secondary' : 'primary'}
        style={{ height: 32, width: 32, padding: 0 }}
        onClick={(): void => setCreatePlaceButtonClicked(!createPlaceButtonClicked)}
      >
        <MdPlace size={20} />
      </Button>
    </div>
  );
}

export default CreatePlaceButton;
