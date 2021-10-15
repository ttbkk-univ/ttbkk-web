import React, { useEffect, useState } from 'react';
import BrandFilterButton from './BrandFilterButton';
import BrandFilterExpanded from './BrandFilterExpanded';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Brand, brandListState } from '../../../states/brands/brand';
import { brandFilterState } from '../../../states/brands/brandFilter';

function BrandFilter(): React.ReactElement {
  const [hover, setHover] = useState(false);
  const brandList = useRecoilValue(brandListState);
  const setBrandFilter = useSetRecoilState(brandFilterState);

  useEffect(() => {
    const filterData = brandList.map((brand: Brand) => {
      return {
        name: brand.name,
        visible: true,
      };
    });
    setBrandFilter(filterData);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 5, right: 120, zIndex: 400 }}>
        {<BrandFilterButton onMouseOver={(): void => window.brands && setHover(true)} />}
        {hover && <BrandFilterExpanded onMouseLeave={(): void => setHover(false)} />}
      </div>
    </>
  );
}

export default BrandFilter;
