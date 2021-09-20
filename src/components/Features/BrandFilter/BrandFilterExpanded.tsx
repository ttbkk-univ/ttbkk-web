import React, { MouseEventHandler } from 'react';
import { Checkbox } from '@material-ui/core';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
}

function BrandFilterExpanded(props: BrandFilterExpandedProps): React.ReactElement {
  const onClick = (e: any, brandName: string): void => {
    console.log(e.target.checked);
    applyClusterFilter([brandName], e.target.checked);
  };

  return (
    <>
      {window.brands && (
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
          {window.brands &&
            Object.entries(window.brands).map(([key, brand]) => (
              <label key={key}>
                <Checkbox
                  defaultChecked={brand.visible}
                  onClick={(e): void => onClick(e, brand.name)}
                />
                {brand.name}
              </label>
            ))}
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
