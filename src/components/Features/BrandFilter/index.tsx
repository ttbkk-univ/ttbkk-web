import React, { useState } from 'react';
import BrandFilterButton from './BrandFilterButton';
import BrandFilterExpanded from './BrandFilterExpanded';

function BrandFilter(): React.ReactElement {
  const [hover, setHover] = useState(false);
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
