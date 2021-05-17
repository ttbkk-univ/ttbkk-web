import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';

interface PlaceListProps {
  places: PlaceProps[];
}

interface PlaceProps {
  longitude: number;
  latitude: number;
  name: string;
}

function Place(props: PlaceProps): React.ReactElement {
  const { latitude, longitude, name } = props;
  return (
    <CircleMarker center={[latitude, longitude]}>
      <Popup>{name}</Popup>
    </CircleMarker>
  );
}

function PlaceList(props: PlaceListProps): React.ReactElement {
  const { places }: PlaceListProps = props;
  return (
    <div>
      {places.map((place: PlaceProps) => {
        return <Place longitude={place.longitude} latitude={place.latitude} name={place.name} />;
      })}
    </div>
  );
}

export default PlaceList;
