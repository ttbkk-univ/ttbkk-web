import React, { useEffect, useState } from 'react';
import BrandFilterButton from './BrandFilterButton';
import BrandFilterExpanded from './BrandFilterExpanded';
import { useRecoilValue } from 'recoil';
import { Brand, brandListState } from '../../../states/brands/brand';
import { getMD5 } from '../../../utils/hash.util';

function BrandFilter(): React.ReactElement {
  const [hover, setHover] = useState(false);

  const brandList = useRecoilValue(brandListState);

  useEffect(() => {
    brandList.forEach((brand: Brand) => {
      const brandHash: string = getMD5(brand.name);
      if (!window.brands) window.brands = {};
      if (!window.brands[brandHash]) {
        window.brands[brandHash] = {
          name: brand.name,
          markers: [],
          visible: true,
        };
      }
    });
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
