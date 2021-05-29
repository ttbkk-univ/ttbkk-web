import React from 'react';
import { useRecoilState } from 'recoil';
import { sidebarDisplayState } from '../../states/sidebar/displayToggleButton';

function SidebarToggleButton(): React.ReactElement {
  const [display, setDisplay] = useRecoilState(sidebarDisplayState);
  return (
    <div>
      <button onClick={(): void => setDisplay(!display)}>{display ? '닫기' : '열기'}</button>
    </div>
  );
}

export default SidebarToggleButton;
