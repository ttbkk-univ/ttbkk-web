import React from 'react';
import { IHashtag } from '../../../../../states/places/placeMap';

function BrandHashtag(props: { hashtag: IHashtag }): React.ReactElement {
  return (
    <span style={{ margin: 3, backgroundColor: 'rgba(150, 202, 140, 0.5)' }}>
      {props.hashtag.name}
    </span>
  );
}

export default BrandHashtag;
