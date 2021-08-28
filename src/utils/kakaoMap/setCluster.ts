import { SetterOrUpdater } from 'recoil';
import { IPlace } from '../../states/places/placeMap';

export function setMarkerCluster(
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

  const markers: PlaceMarker[] = [];
  Object.values(newPlaceMap).forEach((place: IPlace) => {
    if (window?.placeMap && window?.placeMap[place.id]) return;
    markers.push(placeToMarker(place));
  });
  window.clusterer =
    window.clusterer ||
    new window.kakao.maps.MarkerClusterer({
      map: window.map,
      averageCenter: true,
      minLevel: 7,
    });
  window.clusterer.addMarkers(markers);
}
