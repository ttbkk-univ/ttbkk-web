import React from 'react';

interface AddressProps {
  address: string;
}

function PlaceAddress(props: AddressProps): React.ReactElement {
  const { address } = props;
  return <p>주소: {address}</p>;
}

export default PlaceAddress;
