import React from 'react';
import { useRecoilState } from 'recoil';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { sidebarDisplayState } from '../../states/sidebar/displayToggleButton';

function SidebarToggleButton(): React.ReactElement {
  const [display, setDisplay] = useRecoilState(sidebarDisplayState);
  const size: number = 20;
  return (
    <div>
      <button
        style={{ height: 100, width: 32, padding: 0 }}
        onClick={(): void => setDisplay(!display)}
      >
        {display ? <BsFillCaretRightFill size={size} /> : <BsFillCaretLeftFill size={size} />}
      </button>
    </div>
  );
}

export default SidebarToggleButton;
