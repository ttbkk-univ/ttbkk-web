import React, { MouseEventHandler } from 'react';
import { isMobile } from '../../../utils/browser.util';
import BrandFilterRow from './BrandFilterRow';
import { Button, Checkbox } from '@material-ui/core';
import { MdClose } from 'react-icons/all';
import { applyClusterFilter } from '../../../utils/kakaoMap/clusterFilter';
import { brandFilterCheckedState } from '../../../states/brands/brandFilterChecked';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarIsOpenState } from '../../../states/sidebar/siteIsOpen';

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
  setHover: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

function BrandFilterExpanded(props: BrandFilterExpandedProps): React.ReactElement {
  const { onMouseLeave, setHover } = props;
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
    applyClusterFilter(Object.keys(window.brands), e.target.checked);
    Object.keys(window.brands).forEach((brandHash) => {
      window.brands[brandHash].visible = e.target.checked;
    });
  };

  return (
    <>
      {window.brands && (
        <div
          onMouseLeave={onMouseLeave}
          style={{
            zIndex: 401,
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
              <BrandFilterRow key={key} brand={brand} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
