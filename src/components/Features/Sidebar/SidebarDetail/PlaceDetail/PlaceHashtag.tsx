import React from 'react';
import { IHashtag } from '../../../../../states/places/placeMap';

function PlaceHashtag(props: { hashtag: IHashtag }): React.ReactElement {
  return (
    <span
      style={{ margin: 3, backgroundColor: 'rgba(150, 202, 140, 0.5)' }}
      key={props.hashtag.name}
    >
      {props.hashtag.name}
    </span>
  );
}

export default PlaceHashtag;
