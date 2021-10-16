import { SetterOrUpdater } from 'recoil';
import { IPlace } from '../../states/places/placeMap';
import { getMD5 } from '../hash.util';

export function setMarkerCluster(
  placeMap: { [p: string]: IPlace },
  newPlaceMap: { [p: string]: IPlace },
  setClickedPlace: SetterOrUpdater<string | undefined>,
  setDisplayDetailPlace: SetterOrUpdater<boolean>,
): void {
  class PlaceMarker extends window.kakao.maps.Marker {
    id: string;

    constructor(props: any) {
      super(props);
      this.id = props.id;
    }
  }

  const placeToMarker = (place: IPlace): PlaceMarker => {
    const marker = new PlaceMarker({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      title: place.name,
      clickable: true,
      id: place.id,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      setClickedPlace(marker.id);
      setDisplayDetailPlace(true);
    });
    return marker;
  };

  window.clusterer =
    window.clusterer ||
    new window.kakao.maps.MarkerClusterer({
      map: window.map,
      averageCenter: true,
      minLevel: 7,
    });

  const markers: PlaceMarker[] = [];
  Object.values(newPlaceMap).forEach((place: IPlace) => {
    if (placeMap && placeMap[place.id]) return;
    const marker: PlaceMarker = placeToMarker(place);
    const brandHash = getMD5(place.brand.name);
    if (!window.brands) window.brands = {};
    if (!window.brands[brandHash]) {
      window.brands[brandHash] = { name: place.brand.name, markers: [], visible: true };
    }
    window.brands[brandHash].markers.push(marker);
    window.brands[brandHash].visible && markers.push(marker);
  });
  window.clusterer.addMarkers(markers);
}
