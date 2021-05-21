import React, { useState } from 'react';
import { LatLng } from 'leaflet';
import SidebarToggleButton from './SitebarToggleButton';
import SidebarDetail from './SitebarDetail';

interface SidebarProps {
  zoom: number;
  clickedPlace: LatLng | undefined;
}

function Sidebar(props: SidebarProps): React.ReactElement {
  const { clickedPlace, zoom } = props;
  const [display, setDisplay] = useState(false);
  return (
    <div>
      <SidebarToggleButton display={display} setDisplay={setDisplay} />
      {display ? <SidebarDetail zoom={zoom} clickedPlace={clickedPlace} /> : undefined}
    </div>
  );
}

export default Sidebar;
