import { Checkbox } from '@material-ui/core';
import React from 'react';
import { getMD5 } from '../../../utils/HashUtil';
import { useRecoilState } from 'recoil';
import { brandFilterCheckedState } from '../../../states/brands/brandFilterChecked';
import { MarkerService } from '../../../utils/kakaoMap/services/MarkerService';

interface BrandFilterRowProps {
  brand: {
    name: string;
    visible: boolean;
  };
}

function BrandFilterRow(props: BrandFilterRowProps): React.ReactElement {
  const { brand } = props;
  const [brandFilterChecked, setBrandFilterChecked] = useRecoilState(brandFilterCheckedState);
  const brandHash: string = getMD5(brand.name);

  const filterBrand = (e: any, brandName: string): void => {
    setBrandFilterChecked({ ...brandFilterChecked, ...{ [brandHash]: e.target.checked } });
    MarkerService.applyClusterFilter([brandHash], e.target.checked);
    if (!window.brands[brandHash]) {
      window.brands[brandHash] = {
        name: brandName,
        markers: [],
        nameOverlays: [],
        visible: e.target.checked,
      };
    }
    window.brands[brandHash].visible = e.target.checked;
  };

  return (
    <label style={{ height: 32, fontSize: 'small' }}>
      <Checkbox
        checked={brandFilterChecked[brandHash] ?? brandFilterChecked['all']}
        onClick={(e): void => {
          filterBrand(e, brand.name);
        }}
      />
      {brand.name}
    </label>
  );
}

export default BrandFilterRow;
