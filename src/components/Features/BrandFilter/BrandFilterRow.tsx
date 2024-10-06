import React, { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { brandFilterCheckedState } from "@/states/brands/brandFilterChecked.ts";
import { Checkbox } from "@mui/material";

interface BrandFilterRowProps {
  brand: {
    id: string;
    name: string;
    visible: boolean;
  };
  applyClusterFilter: (brandHashList: string[], status: boolean) => void;
}

function BrandFilterRow(props: BrandFilterRowProps): React.ReactElement {
  const { brand, applyClusterFilter } = props;
  const [brandFilterChecked, setBrandFilterChecked] = useRecoilState(
    brandFilterCheckedState,
  );

  const filterBrand = (
    event: ChangeEvent<HTMLInputElement>,
    brandName: string,
  ): void => {
    setBrandFilterChecked({
      ...brandFilterChecked,
      ...{ [brand.id]: event.currentTarget.checked },
    });
    applyClusterFilter([brand.id], event.currentTarget.checked);
    if (!window.brands[brand.id]) {
      window.brands[brand.id] = {
        id: brand.id,
        name: brandName,
        markers: [],
        nameOverlays: [],
        visible: event.currentTarget.checked,
      };
    }
    window.brands[brand.id].visible = event.currentTarget.checked;
  };

  return (
    <label style={{ height: 32, fontSize: "small" }}>
      <Checkbox
        checked={brandFilterChecked[brand.id] ?? brandFilterChecked["all"]}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          filterBrand(event, brand.name);
        }}
      />
      {brand.name}
    </label>
  );
}

export default BrandFilterRow;
