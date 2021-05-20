import React, { useState } from 'react';
import { Map } from 'leaflet';
import SidebarToggleButton from './SitebarToggleButton';
import SidebarDetail from './SitebarDetail';

interface SidebarProps {
  map?: Map;
}

function Sidebar(props: SidebarProps): React.ReactElement {
  const { map } = props;
  const [display, setDisplay] = useState(false);
  return (
    <div>
      <SidebarToggleButton display={display} setDisplay={setDisplay} />
      {display ? <SidebarDetail map={map} /> : undefined}
    </div>
  );
}

export default Sidebar;
