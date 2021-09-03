import React from 'react';
import { Button } from '@material-ui/core';
import { MdLayers } from 'react-icons/all';

function BrandFilterButton(props: any): React.ReactElement {
  return (
    <Button
      onMouseOver={props.onMouseOver}
      variant={'contained'}
      color={'inherit'}
      style={{
        height: 32,
        width: 32,
        padding: 0,
        float: 'right',
      }}
    >
      <MdLayers size={20} />
    </Button>
  );
}

export default BrandFilterButton;
