import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';
import { IHashtag, IPlace } from '../../../../../states/places/placeMap';
import PlaceHashtag from './PlaceHashtag';
import BrandHashtag from './BrandHashtag';
import PlaceAddress from './PlaceAddress';
import PlaceTelephone from './PlaceTelephone';
import PlaceFindingWayNaver from './PlaceFindingWayNaver';
import PlaceFindingWayKakao from './PlaceFindingWayKakao';
import axios from 'axios';
import { env } from '../../../../../env';

function PlaceDetailModal(): React.ReactElement {
  const [clickedPlace] = useRecoilState(clickedPlaceState);
  const [place, setPlace] = useState<IPlace | undefined>(undefined);

  useEffect(() => {
    axios.get(`${env.api.host}/api/places/${clickedPlace}/`).then((res) => {
      setPlace(res.data);
    });
  }, [clickedPlace]);

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
      <p
        style={{
          width: '100%',
        }}
      >
        <PlaceFindingWayNaver
          latitude={place.latitude}
          longitude={place.longitude}
          name={place.name}
        />
        <PlaceFindingWayKakao
          latitude={place.latitude}
          longitude={place.longitude}
          name={place.name}
        />
      </p>
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
