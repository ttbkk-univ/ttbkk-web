import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getMD5 } from '../../../utils/hash.util';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';

interface BrandFilterRowProps {
  brand: {
    name: string;
    visible: boolean;
  };
  allBrandFilterChecked: boolean; // all filter 영향받음
}

function BrandFilterRow(props: BrandFilterRowProps): React.ReactElement {
  const { brand, allBrandFilterChecked } = props;
  const brandHash: string = getMD5(brand.name);
  const [checked, setChecked] = useState(allBrandFilterChecked);

  useEffect(() => {
    setChecked(allBrandFilterChecked);
  }, [allBrandFilterChecked]);

  const filterBrand = (e: any, brandName: string): void => {
    setChecked(e.target.checked);
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
    <label style={{ height: 32, fontSize: 'small' }}>
      <Checkbox
        checked={checked}
        onClick={(e): void => {
          filterBrand(e, brand.name);
        }}
      />
      {brand.name}
    </label>
  );
}

export default BrandFilterRow;
