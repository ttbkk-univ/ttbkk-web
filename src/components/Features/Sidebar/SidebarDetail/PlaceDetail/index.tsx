import PlaceDetailModal from './PlaceDetailModal';
import { useRecoilValue } from 'recoil';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';

function PlaceDetail() {
  const clickedPlaceId = useRecoilValue(clickedPlaceState);
  return clickedPlaceId ? <PlaceDetailModal clickedPlaceId={clickedPlaceId} /> : null;
}

export default PlaceDetail;
