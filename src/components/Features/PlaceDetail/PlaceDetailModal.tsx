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
        top: '5%',
        width: '95%',
        left: '50%',
        transform: 'translateX(-50%)',
      }
    : { top: 50, right: 90, width: 400 };
  return clickedPlace ? (
    <div
      style={{
        overflow: 'auto',
        position: isMobile ? 'absolute' : 'fixed',
        zIndex: 401,
        backgroundColor: 'rgba(30, 60,80,0.8)',
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
        overflowY: 'auto',
        ...position,
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '32px', color: 'rgb(255, 68, 85)' }}>
            {placeMap[clickedPlace].name}
          </div>
          <div
            style={{
              right: 10,
              minWidth: 'max-content',
              flexDirection: 'row-reverse',
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
