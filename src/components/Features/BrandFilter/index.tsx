import React, { useState } from "react";
import BrandFilterButton from "./BrandFilterButton";
import BrandFilterExpanded from "./BrandFilterExpanded";
import { Brand } from "@/states/brands/brand.ts";
import useBrandList from "../../../api/useBrandList.ts";

function BrandFilter(): React.ReactElement {
  const [hover, setHover] = useState(false);
  const { data: brands, isLoading, error } = useBrandList();

  if (isLoading) return <div>Loading...</div>;
  if (!brands) return <div>Empty brand data</div>;
  if (error) return <div>Error: {error.message}</div>;

  brands.forEach((brand: Brand) => {
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
    <div style={{ position: "fixed", top: 5, right: 120 }}>
      {
        <BrandFilterButton
          onMouseOver={(): void => window.brands && setHover(true)}
        />
      }
      {hover && (
        <BrandFilterExpanded
          onMouseLeave={(): void => setHover(false)}
          setHover={setHover}
        />
      )}
    </div>
  );
}

export default BrandFilter;
