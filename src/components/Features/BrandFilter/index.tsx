import React, { useState } from 'react';
import BrandFilterButton from './BrandFilterButton';
import BrandFilterExpanded from './BrandFilterExpanded';
import { Brand } from '../../../states/brands/brand';
import { get } from '../../../utils/HttpRequestUtil';
import { env } from '../../../env';
import { useQuery } from 'react-query';

type Props = {
  map: kakao.maps.Map;
  clusterer: kakao.maps.MarkerClusterer;
};
function BrandFilter({ map, clusterer }: Props): React.ReactElement {
  const [hover, setHover] = useState(false);
  const { isLoading, error, data } = useQuery<Brand[]>('brand-all', () =>
    get<Brand[]>(env.api.host + '/api/brands/?search='),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  if (!data) return <div>Empty brand data</div>;

  data.forEach((brand: Brand) => {
    if (!window.brands) window.brands = {};
    const brandId = brand.id!;
    const brandName = brand.name;
    if (!window.brands[brandId]) {
      window.brands[brandId] = {
        id: brandId,
        name: brandName,
        markers: [],
        nameOverlays: [],
        visible: true,
      };
    }
  });

  return (
    <div style={{ position: 'fixed', top: 5, right: 120 }}>
      {<BrandFilterButton onMouseOver={(): void => window.brands && setHover(true)} />}
      {hover && (
        <BrandFilterExpanded
          onMouseLeave={(): void => setHover(false)}
          setHover={setHover}
          map={map}
          clusterer={clusterer}
        />
      )}
    </div>
  );
}

export default BrandFilter;
