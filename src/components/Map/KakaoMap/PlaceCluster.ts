import { IPlace } from '../../../places.mock';
import { SetterOrUpdater } from 'recoil';

export function setMarkerCluster(
  placeMap: { [p: string]: IPlace },
  setClickedPlace: SetterOrUpdater<string | undefined>,
): void {
  class Place extends window.kakao.maps.Marker {
    id: string;

    constructor(props: any) {
      super(props);
      this.id = props.id;
    }
  }

  const markers = Object.values(placeMap).map((place: IPlace) => {
    const marker = new Place({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      title: place.name,
      clickable: true,
      id: place.id,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      console.log(marker.id);
      setClickedPlace(marker.id);
    });
    return marker;
  });
  window.clusterer = new window.kakao.maps.MarkerClusterer({
    map: window.map,
    averageCenter: true,
    minLevel: 7,
  });
  window.clusterer.addMarkers(markers);
}
