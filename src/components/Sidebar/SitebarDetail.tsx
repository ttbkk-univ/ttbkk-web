import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { zoomState } from '../../states/maps/zoom';
import { placeMapState } from '../../states/places/placeMap';
import useWindowDimensions from '../../hooks/window';
import { Button } from '@material-ui/core';

function SidebarDetail(): React.ReactElement {
  const [clickedPlace, setClickedPlace] = useRecoilState(clickedPlaceState);
  const zoom = useRecoilValue(zoomState);
  const placeMap = useRecoilValue(placeMapState);
  const { width } = useWindowDimensions();
  const isMobile: boolean = width < 600;
  const position = isMobile
    ? { bottom: '15%', right: '14%', width: '75%' }
    : { top: 50, right: 90, width: 400 };
  return (
    <div
      style={{
        position: 'fixed',
        height: clickedPlace ? (isMobile ? '50%' : '30%') : 90,
        zIndex: 400,
        backgroundColor: 'rgba(30, 60,80,0.8)',
        fontWeight: 'bold',
        color: 'white',
        padding: 6,
        ...position,
      }}
    >
      <div>zoom: {zoom}</div>
      <hr />
      {clickedPlace ? (
        <>
          <div>
            <span>name: {placeMap[clickedPlace].name}</span>
            <br />
            <span>lat: {placeMap[clickedPlace].latitude}</span> /{' '}
            <span>lng: {placeMap[clickedPlace].longitude}</span>
            <br />
            <span>설명: {placeMap[clickedPlace].description}</span>
          </div>
          <div>
            <Button
              variant={'contained'}
              color={'secondary'}
              style={{ position: 'absolute', right: 6, bottom: 10 }}
              onClick={(): void => setClickedPlace(undefined)}
            >
              선택취소
            </Button>
          </div>
        </>
      ) : (
        <div>
          <p>장소 클릭시 정보가 표시됩니다.</p>
        </div>
      )}
    </div>
  );
}

export default SidebarDetail;
