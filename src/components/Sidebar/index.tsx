import React from 'react';
import SidebarToggleButton from './SitebarToggleButton';
import SidebarDetail from './SitebarDetail';
import { useRecoilValue } from 'recoil';
import { sidebarDisplayState } from '../../states/maps/sidebar/displayToggleButton';

function Sidebar(): React.ReactElement {
  const display = useRecoilValue(sidebarDisplayState);
  return (
    <div style={{ position: 'fixed', top: 80, right: 10, zIndex: 400 }}>
      <SidebarToggleButton />
      {display ? <SidebarDetail /> : undefined}
    </div>
  );
}

export default Sidebar;
