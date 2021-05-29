import React, { useEffect } from 'react';
import SidebarToggleButton from './SitebarToggleButton';
import SidebarDetail from './SitebarDetail';
import { useRecoilState } from 'recoil';
import { sidebarDisplayState } from '../../states/sidebar/displayToggleButton';
import useWindowDimensions from '../../hooks/window';

function Sidebar(): React.ReactElement {
  const [display, setDisplay] = useRecoilState(sidebarDisplayState);
  const { width } = useWindowDimensions();
  useEffect(() => {
    setDisplay(width > 600);
  }, []);
  return (
    <div>
      <SidebarToggleButton />
      {display ? <SidebarDetail /> : undefined}
    </div>
  );
}

export default Sidebar;
