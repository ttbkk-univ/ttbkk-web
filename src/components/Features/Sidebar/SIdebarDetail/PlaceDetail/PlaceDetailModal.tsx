import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';
import { IHashtag, placeMapState } from '../../../../../states/places/placeMap';
import PlaceHashtag from './PlaceHashtag';
import BrandHashtag from './BrandHashtag';
import PlaceAddress from './PlaceAddress';
import PlaceTelephone from './PlaceTelephone';
import PlaceFindingWayNaver from './PlaceFindingWayNaver';
import PlaceFindingWayKakao from './PlaceFindingWayKakao';

function PlaceDetailModal(): React.ReactElement {
  const [clickedPlace] = useRecoilState(clickedPlaceState);
  const placeMap = useRecoilValue(placeMapState);
  const place = clickedPlace ? placeMap[clickedPlace] : undefined;
  return place ? (
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
      <div style={{ fontSize: '32px', color: 'rgb(255, 68, 85)' }}>{place.name}</div>
      <hr />
      {place.address ? <PlaceAddress address={place.address} /> : <></>}
      {place.telephone ? <PlaceTelephone telephone={place.telephone} /> : <></>}
      <div style={{ whiteSpace: 'pre-line' }}>{place.description}</div>
      {place.brand.description ? (
        <>
          <br />
          <div style={{ whiteSpace: 'pre-line' }}>{place.brand.description}</div>
        </>
      ) : (
        <></>
      )}
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {place.brand.hashtags.map((hashtag: IHashtag) => (
          <BrandHashtag hashtag={hashtag} />
        ))}
        {place.hashtags.map((hashtag: IHashtag) => (
          <PlaceHashtag hashtag={hashtag} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PlaceDetailModal;
