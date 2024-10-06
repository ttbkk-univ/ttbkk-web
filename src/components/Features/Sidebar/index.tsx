import React from "react";
import { useRecoilState } from "recoil";
import { sidebarIsOpenState } from "../../../states/sidebar/siteIsOpen";
import OpenSidebarButton from "./OpenSidebarButton";
import SidebarDetail from "./SidebarDetail";

function Sidebar(): React.ReactElement {
  const [isOpened] = useRecoilState(sidebarIsOpenState);
  return (
    <div>
      <OpenSidebarButton />
      {isOpened && <SidebarDetail />}
    </div>
  );
}

export default Sidebar;
