import React from 'react';
import { useRecoilState } from 'recoil';
import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from 'react-icons/bs';
import { placeDetailDisplayState } from '../../../states/sidebar/displayToggleButton';
import { Button } from '@material-ui/core';
import useWindowDimensions from '../../../hooks/window';

function PlaceDetailDisplayButton(): React.ReactElement {
  const [display, setDisplay] = useRecoilState(placeDetailDisplayState);
  const { width } = useWindowDimensions();
  const size: number = 30;

  const isMobile: boolean = width < 600;
  const buttonPosition = isMobile ? { bottom: 20, right: 50 } : { top: 150, right: 10 };
  return (
    <div style={{ position: 'fixed', zIndex: 400, ...buttonPosition }}>
      <Button
        variant={'contained'}
        color={'primary'}
        style={{ height: isMobile ? 50 : 70 }}
        onClick={(): void => setDisplay(!display)}
      >
        {isMobile ? (
          display ? (
            <BsFillCaretDownFill size={size} />
          ) : (
            <BsFillCaretUpFill size={size} />
          )
        ) : display ? (
          <BsFillCaretRightFill size={size} />
        ) : (
          <BsFillCaretLeftFill size={size} />
        )}
      </Button>
    </div>
  );
}

export default PlaceDetailDisplayButton;
