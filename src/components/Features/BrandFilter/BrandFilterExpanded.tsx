import React, { MouseEventHandler } from 'react';
import { Checkbox } from '@material-ui/core';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';
import { useRecoilState } from 'recoil';
import { allBrandFilterCheckedState, brandFilterState } from '../../../states/brands/brandFilter';

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
}

function BrandFilterExpanded(props: BrandFilterExpandedProps): React.ReactElement {
  const [allBrandFilterChecked, setAllBrandFilterChecked] = useRecoilState(
    allBrandFilterCheckedState,
  );
  const [brandFilter, setBrandFilter] = useRecoilState(brandFilterState);

  const filterAllBrand = (e: any): void => {
    setAllBrandFilterChecked(!allBrandFilterChecked);
    applyClusterFilter(
      brandFilter.map((brand) => brand.name),
      e.target.checked,
    );
    setBrandFilter(
      brandFilter.map((brand) => {
        return {
          visible: e.target.checked,
          name: brand.name,
        };
      }),
    );
  };

  const filterBrand = (e: any, brandName: string): void => {
    applyClusterFilter([brandName], e.target.checked);
    setBrandFilter(
      brandFilter.map((brand) => {
        if (brand.name !== brandName) return brand;
        return {
          visible: e.target.checked,
          name: brand.name,
        };
      }),
    );
  };

  return (
    <>
      {brandFilter && (
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
          {brandFilter &&
            Object.entries(brandFilter).map(([key, brand]) => (
              <label key={key}>
                <Checkbox
                  checked={brand.visible}
                  onClick={(e): void => filterBrand(e, brand.name)}
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
