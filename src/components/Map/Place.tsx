import React, { Dispatch, SetStateAction } from 'react';
import { CircleMarker, FeatureGroup, Popup } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import { LatLng, LeafletMouseEvent } from 'leaflet';

interface PlaceListProps {
  places: PlaceProps[];
  setClickedPlace: Dispatch<SetStateAction<LatLng | undefined>>;
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
  const { places, setClickedPlace }: PlaceListProps = props;
  return (
    <FeatureGroup
      children={places.map((place: PlaceProps) => {
        return (
          <Place
            longitude={place.longitude}
            latitude={place.latitude}
            name={place.name}
            key={uuidv4()}
          />
        );
      })}
      eventHandlers={{
        click: (e: LeafletMouseEvent): void => {
          setClickedPlace(e.latlng);
        },
      }}
    />
  );
}

export default PlaceList;
