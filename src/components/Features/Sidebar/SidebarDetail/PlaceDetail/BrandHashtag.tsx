import React from 'react';

function BrandHashtag(props: { hashtag: string }): React.ReactElement {
  return (
    <span style={{ margin: 3, backgroundColor: 'rgba(150, 202, 140, 0.5)' }}>{props.hashtag}</span>
  );
}

export default BrandHashtag;
