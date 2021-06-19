import { SetterOrUpdater } from 'recoil';
import { IPlace } from '../../states/places/placeMap';

export function setMarkerCluster(
  placeMap: { [p: string]: IPlace },
  setClickedPlace: SetterOrUpdater<string | undefined>,
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
    });
    return marker;
  };

  const markers = Object.values(placeMap).map((place: IPlace) => placeToMarker(place));
  window.clusterer = new window.kakao.maps.MarkerClusterer({
    map: window.map,
    averageCenter: true,
    minLevel: 7,
  });
  window.clusterer.addMarkers(markers);
}
