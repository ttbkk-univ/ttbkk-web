import React, { useCallback, useEffect, useState } from 'react';
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

  const getMarkerImage = (): any => {
    const imageSrc = '/img/fork.png';
    const imageSize = new window.kakao.maps.Size(20, 60);
    const imageOption = { offset: new window.kakao.maps.Point(10, 60) };
    return new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  };

  const clickEvent = useCallback((e: any): void => {
    const latitude = e.latLng.getLat();
    const longitude = e.latLng.getLng();
    setCreatePlaceLatLng({ latitude, longitude });
    if (!window.newPlace) {
      const markerImage = getMarkerImage();
      window.newPlace = new window.kakao.maps.Marker({
        image: markerImage,
        map: window.map,
        position: new window.kakao.maps.LatLng(latitude, longitude),
      });
    } else {
      window.newPlace.setPosition(new window.kakao.maps.LatLng(latitude, longitude));
    }
    // marker.setMap(window.map);
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
