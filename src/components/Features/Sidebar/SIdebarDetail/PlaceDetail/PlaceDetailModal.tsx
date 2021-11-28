import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';
import { IHashtag, placeMapState } from '../../../../../states/places/placeMap';
import PlaceHashtag from './PlaceHashtag';
import BrandHashtag from './BrandHashtag';

function PlaceDetailModal(): React.ReactElement {
  const [clickedPlace] = useRecoilState(clickedPlaceState);
  const placeMap = useRecoilValue(placeMapState);
  return clickedPlace ? (
    <div
      style={{
        fontWeight: 'bold',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
        overflowY: 'auto',
        left: 0,
        top: 100,
      }}
    >
      <div style={{ fontSize: '32px', color: 'rgb(255, 68, 85)' }}>
        {placeMap[clickedPlace].name}
      </div>
      <hr />
      <div style={{ whiteSpace: 'pre-line' }}>{placeMap[clickedPlace].description}</div>
      {placeMap[clickedPlace].brand.description ? (
        <>
          <br />
          <div style={{ whiteSpace: 'pre-line' }}>{placeMap[clickedPlace].brand.description}</div>
        </>
      ) : (
        <></>
      )}
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {placeMap[clickedPlace].brand.hashtags.map((hashtag: IHashtag) => (
          <BrandHashtag hashtag={hashtag} />
        ))}
        {placeMap[clickedPlace].hashtags.map((hashtag: IHashtag) => (
          <PlaceHashtag hashtag={hashtag} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PlaceDetailModal;
