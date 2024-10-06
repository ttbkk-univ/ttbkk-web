import React from "react";

interface AddressProps {
  address: string;
}

function PlaceAddress(props: AddressProps): React.ReactElement {
  const { address } = props;
  return (
    <div style={{ fontSize: "0.8rem", marginBottom: "1rem" }}>{address}</div>
  );
}

export default PlaceAddress;
