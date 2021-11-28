import React, { useEffect, useState } from 'react';
import BrandFilterButton from './BrandFilterButton';
import BrandFilterExpanded from './BrandFilterExpanded';
import { useSetRecoilState } from 'recoil';
import { Brand, brandListState } from '../../../states/brands/brand';
import { getMD5 } from '../../../utils/HashUtil';
import { AxiosResponse } from 'axios';
import { get } from '../../../utils/HttpRequestUtil';
import { env } from '../../../env';

function BrandFilter(): React.ReactElement {
  const [hover, setHover] = useState(false);
  const setBrandList = useSetRecoilState(brandListState);

  useEffect(() => {
    (async (): Promise<void> => {
      const response: AxiosResponse<Brand[]> = await get(env.api.host + '/api/brands/?search=');
      setBrandList(response.data);
      response.data.forEach((brand: Brand) => {
        const brandHash: string = getMD5(brand.name);
        if (!window.brands) window.brands = {};
        if (!window.brands[brandHash]) {
          window.brands[brandHash] = {
            name: brand.name,
            markers: [],
            nameOverlays: [],
            visible: true,
          };
        }
      });
    })();
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 5, right: 120 }}>
        {<BrandFilterButton onMouseOver={(): void => window.brands && setHover(true)} />}
        {hover && (
          <BrandFilterExpanded onMouseLeave={(): void => setHover(false)} setHover={setHover} />
        )}
      </div>
    </>
  );
}

export default BrandFilter;
