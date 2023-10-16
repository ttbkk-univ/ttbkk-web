import React from 'react';
import { useRecoilState } from 'recoil';
import { sidebarIsOpenState } from '../../../states/sidebar/siteIsOpen';
import OpenSidebarButton from './OpenSidebarButton';
import SidebarDetail from './SidebarDetail';

type Props = {
  map: kakao.maps.Map;
};
function Sidebar({ map }: Props): React.ReactElement {
  const [isOpened] = useRecoilState(sidebarIsOpenState);
  return (
    <div>
      <OpenSidebarButton />
      {isOpened && <SidebarDetail map={map} />}
    </div>
  );
}

export default Sidebar;
