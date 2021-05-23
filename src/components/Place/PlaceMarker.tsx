import L, { CircleMarkerOptions, LatLngExpression, Path } from 'leaflet';

class PlaceMarker extends L.CircleMarker {
  id: string;

  constructor(id: string, latlng: LatLngExpression, options?: CircleMarkerOptions) {
    super(latlng, options);
    this.id = id;
  }
}

export default PlaceMarker;
