import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../states/places/clickedPlace';
import { zoomState } from '../../states/maps/zoom';
import { placeMapState } from '../../states/places/placeMap';

function SidebarDetail(): React.ReactElement {
  const [clickedPlace, setClickedPlace] = useRecoilState(clickedPlaceState);
  const zoom = useRecoilValue(zoomState);
  const placeMap = useRecoilValue(placeMapState);
  return (
    <div
      style={{
        position: 'fixed',
        top: 50,
        right: 55,
        width: 350,
        height: clickedPlace ? '10%' : 90,
        zIndex: 400,
        backgroundColor: 'rgba(30, 60,80,0.8)',
        fontWeight: 'bold',
        color: 'white',
        padding: 6,
      }}
    >
      <div>zoom: {zoom}</div>
      <hr />
      {clickedPlace ? (
        <>
          <div>
            <span>name: {placeMap[clickedPlace].name}</span>
            <br />
            <span>lat: {placeMap[clickedPlace].latitude}</span>
            <br />
            <span>lng: {placeMap[clickedPlace].longitude}</span>
          </div>
          <div>
            <button
              style={{ position: 'absolute', right: 6, bottom: 10 }}
              onClick={(): void => setClickedPlace(undefined)}
            >
              선택취소
            </button>
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
