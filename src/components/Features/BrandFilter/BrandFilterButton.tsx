import React, { MouseEventHandler } from 'react';
import { Button } from '@material-ui/core';
import { MdLayers } from 'react-icons/all';

interface BrandFilterButtonProps {
  onMouseOver: MouseEventHandler;
}

function BrandFilterButton(props: BrandFilterButtonProps): React.ReactElement {
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
