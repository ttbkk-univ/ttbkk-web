import React, { MouseEventHandler } from 'react';
import { Checkbox } from '@material-ui/core';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';
import { useRecoilState } from 'recoil';
import { allBrandFilterCheckedState } from '../../../states/brands/allBrandFilterChecked';
import { getMD5 } from '../../../utils/hash.util';

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
}

function BrandFilterExpanded(props: BrandFilterExpandedProps): React.ReactElement {
  const [allBrandFilterChecked, setAllBrandFilterChecked] = useRecoilState(
    allBrandFilterCheckedState,
  );

  const filterAllBrand = (e: any): void => {
    setAllBrandFilterChecked(!allBrandFilterChecked);
    applyClusterFilter(Object.keys(window.brands), e.target.checked);
    Object.keys(window.brands).forEach((brandHash) => {
      window.brands[brandHash].visible = e.target.checked;
    });
  };

  const filterBrand = (e: any, brandName: string): void => {
    const brandHash: string = getMD5(brandName);
    applyClusterFilter([brandHash], e.target.checked);
    if (!window.brands[brandHash]) {
      window.brands[brandHash] = {
        name: brandName,
        markers: [],
        visible: e.target.checked,
      };
    }
    window.brands[brandHash].visible = e.target.checked;
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
          <label key="all">
            <Checkbox checked={allBrandFilterChecked} onClick={(e): void => filterAllBrand(e)} />
            전체
          </label>
          {Object.entries(window.brands).map(([key, brand]) => (
            <label key={key}>
              <Checkbox checked={brand.visible} onClick={(e): void => filterBrand(e, brand.name)} />
              {brand.name}
            </label>
          ))}
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
