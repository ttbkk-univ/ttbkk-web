import React from 'react';
import { Button } from '@mui/material';

interface TelephoneProps {
  telephone: string;
}

function PlaceTelephone(props: TelephoneProps): React.ReactElement {
  const { telephone } = props;
  return (
    <Button color={'primary'} variant={'contained'} href={`tel:${telephone}`}>
      전화걸기
    </Button>
  );
}

export default PlaceTelephone;
