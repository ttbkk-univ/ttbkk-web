import { IHashtag, IPlace } from '../../../../../states/places/placeMap';
import PlaceHashtag from './PlaceHashtag';
import BrandHashtag from './BrandHashtag';
import PlaceAddress from './PlaceAddress';
import PlaceTelephone from './PlaceTelephone';
import PlaceFindingWayNaver from './PlaceFindingWayNaver';
import PlaceFindingWayKakao from './PlaceFindingWayKakao';
import { env } from '../../../../../env';
import { get } from '../../../../../utils/HttpRequestUtil';
import { useQuery } from 'react-query';

type Props = {
  clickedPlace: string;
};
function PlaceDetailModal({ clickedPlace }: Props) {
  const {
    isLoading,
    error,
    data: place,
  } = useQuery(`place-${clickedPlace}`, () =>
    get<IPlace>(env.api.host + `/api/places/${clickedPlace}/`),
  );

  if (isLoading) return null;
  if (error) return <div>something went wrong</div>;

  console.log('place', place);
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
      <div style={{ fontSize: '32px', color: '#000000' }}>{place.name}</div>
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
      {place.brand?.description ? (
        <>
          <br />
          <div style={{ whiteSpace: 'pre-line' }}>{place.brand.description}</div>
        </>
      ) : (
        <></>
      )}
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {place.brand?.hashtags.map((hashtag: IHashtag) => (
          <BrandHashtag key={place!.brand!.name + hashtag.name} hashtag={hashtag} />
        ))}
        {place.hashtags.map((hashtag: IHashtag) => (
          <PlaceHashtag key={hashtag.name} hashtag={hashtag} />
        ))}
      </div>
    </div>
  ) : null;
}

export default PlaceDetailModal;
