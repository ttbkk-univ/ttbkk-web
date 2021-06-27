import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedPlaceState } from '../../../states/places/clickedPlace';
import { placeMapState } from '../../../states/places/placeMap';
import useWindowDimensions from '../../../hooks/window';
import { Button } from '@material-ui/core';
import { placeDetailDisplayState } from '../../../states/sidebar/displayToggleButton';

function PlaceDetailModal(): React.ReactElement {
  const [clickedPlace, setClickedPlace] = useRecoilState(clickedPlaceState);
  const setDisplay = useSetRecoilState(placeDetailDisplayState);
  const placeMap = useRecoilValue(placeMapState);
  const { width } = useWindowDimensions();
  const isMobile: boolean = width < 600;
  const position = isMobile
    ? {
        top: '20%',
        right: '11%',
        width: '80%',
      }
    : { top: 50, right: 90, width: 400 };
  return clickedPlace ? (
    <div
      style={{
        paddingBottom: 10,
        overflow: 'auto',
        position: 'fixed',
        zIndex: 400,
        backgroundColor: 'rgba(30, 60,80,0.8)',
        fontWeight: 'bold',
        color: 'white',
        padding: 6,
        overflowY: 'auto',
        ...position,
      }}
    >
      <div
        style={{
          right: 10,
          position: 'absolute',
          flexDirection: 'row-reverse',
          display: 'flex',
        }}
      >
        <Button
          variant={'contained'}
          color={'secondary'}
          onClick={(): void => {
            setClickedPlace(undefined);
            setDisplay(false);
          }}
        >
          선택취소
        </Button>
      </div>
      <div>
        <div style={{ fontSize: '32px', color: 'rgb(255, 68, 85)' }}>
          {placeMap[clickedPlace].name}
        </div>
        <hr />
        <div style={{ whiteSpace: 'pre-line' }}>{placeMap[clickedPlace].description}</div>
        <hr />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {placeMap[clickedPlace].hashtags.map((hashtag) => (
            <span
              style={{ margin: 3, backgroundColor: 'rgba(150, 202, 140, 0.5)' }}
              key={hashtag.name}
            >
              {hashtag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PlaceDetailModal;
