import React from 'react';
import { useRecoilState } from 'recoil';
import { brandFilterCheckedState } from '../../../states/brands/brandFilterChecked';
import { MarkerService } from '../../../utils/kakaoMap/services/MarkerService';
import { Checkbox } from '@mui/material';

interface BrandFilterRowProps {
  brand: {
    id: string;
    name: string;
    visible: boolean;
  };
  map: kakao.maps.Map;
  clusterer: kakao.maps.MarkerClusterer;
}

function BrandFilterRow(props: BrandFilterRowProps): React.ReactElement {
  const { brand, map, clusterer } = props;
  const [brandFilterChecked, setBrandFilterChecked] = useRecoilState(brandFilterCheckedState);

  const filterBrand = (e: any, brandName: string): void => {
    setBrandFilterChecked({ ...brandFilterChecked, ...{ [brand.id]: e.target.checked } });
    MarkerService.applyClusterFilter([brand.id], e.target.checked, map, clusterer);
    if (!window.brands[brand.id]) {
      window.brands[brand.id] = {
        id: brand.id,
        name: brandName,
        markers: [],
        nameOverlays: [],
        visible: e.target.checked,
      };
    }
    window.brands[brand.id].visible = e.target.checked;
  };

  return (
    <label style={{ height: 32, fontSize: 'small' }}>
      <Checkbox
        checked={brandFilterChecked[brand.id] ?? brandFilterChecked['all']}
        onClick={(e): void => {
          filterBrand(e, brand.name);
        }}
      />
      {brand.name}
    </label>
  );
}

export default BrandFilterRow;
