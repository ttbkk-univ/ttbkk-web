import React from 'react';

function PlaceHashtag(props: { hashtag: string }): React.ReactElement {
  return (
    <span style={{ margin: 3, backgroundColor: 'rgba(150, 202, 140, 0.5)' }} key={props.hashtag}>
      {props.hashtag}
    </span>
  );
}

export default PlaceHashtag;
