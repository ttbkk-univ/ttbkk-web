import React from 'react';
import { Checkbox } from '@material-ui/core';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';

function BrandFilterExpanded(props: any): React.ReactElement {
  const onClick = (e: any, brandName: string): void => {
    console.log(e.target.checked);
    applyClusterFilter([brandName], e.target.checked);
  };

  return (
    <div
      onMouseLeave={props.onMouseLeave}
      style={{
        zIndex: 401,
        right: 120,
        padding: 12,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        float: 'right',
        backgroundColor: 'white',
      }}
    >
      {Object.entries(window.brands).map(([key, brand]) => (
        <label key={key}>
          <Checkbox defaultChecked={brand.visible} onClick={(e): void => onClick(e, brand.name)} />
          {brand.name}
        </label>
      ))}
    </div>
  );
}

export default BrandFilterExpanded;
