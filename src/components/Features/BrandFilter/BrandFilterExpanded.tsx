import React, { MouseEventHandler } from 'react';
import { isMobile } from '../../../utils/BrowserUtil';
import BrandFilterRow from './BrandFilterRow';
import { MdClose } from 'react-icons/md';
import { brandFilterCheckedState } from '../../../states/brands/brandFilterChecked';
import { useRecoilState } from 'recoil';
import { MarkerService } from '../../../utils/kakaoMap/services/MarkerService';
import { Button, Checkbox } from '@mui/material';

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
  setHover: (value: ((prevState: boolean) => boolean) | boolean) => void;
  map: kakao.maps.Map;
}

function BrandFilterExpanded(props: BrandFilterExpandedProps): React.ReactElement {
  const { onMouseLeave, setHover, map } = props;
  const [brandFilterChecked, setBrandFilterChecked] = useRecoilState(brandFilterCheckedState);

  const filterAllBrand = (e: any): void => {
    setBrandFilterChecked(
      Object.fromEntries(
        Object.entries(brandFilterChecked).map(([brandName]: [string, boolean]) => [
          brandName,
          e.target.checked,
        ]),
      ),
    );
    MarkerService.applyClusterFilter(Object.keys(window.brands), e.target.checked, map);
    Object.keys(window.brands).forEach((brandId) => {
      window.brands[brandId].visible = e.target.checked;
    });
  };

  return (
    <>
      {window.brands && (
        <div
          onMouseLeave={onMouseLeave}
          style={{
            right: 120,
            padding: 12,
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            float: 'right',
            backgroundColor: 'white',
            minWidth: 200,
          }}
        >
          <div>
            <label key="all" style={{ height: 32, fontSize: 'small' }}>
              <Checkbox
                checked={brandFilterChecked['all']}
                onClick={(e): void => filterAllBrand(e)}
              />
              전체
            </label>
            {isMobile() && (
              <Button
                style={{ float: 'right' }}
                onClick={(): void => setHover(false)}
                variant={'contained'}
                color={'secondary'}
                size={'large'}
              >
                <MdClose />
              </Button>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: isMobile() ? 300 : 500,
              overflowY: 'scroll',
            }}
          >
            {Object.entries(window.brands).map(([key, brand]) => (
              <BrandFilterRow key={key} brand={brand} map={map} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
