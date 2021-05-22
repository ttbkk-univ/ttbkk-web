import React from 'react';
import SidebarToggleButton from './SitebarToggleButton';
import SidebarDetail from './SitebarDetail';
import { useRecoilValue } from 'recoil';
import { sidebarDisplayState } from '../../states/maps/sidebar/displayToggleButton';

function Sidebar(): React.ReactElement {
  const display = useRecoilValue(sidebarDisplayState);
  return (
    <div>
      <SidebarToggleButton />
      {display ? <SidebarDetail /> : undefined}
    </div>
  );
}

export default Sidebar;
