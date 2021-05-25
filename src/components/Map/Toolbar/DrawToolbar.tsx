import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { cursorState } from '../../../states/maps/cursor';

function ToolbarControl(): React.ReactElement {
  const setCursor = useSetRecoilState(cursorState);
  return (
    <div style={{ position: 'fixed', top: 100, left: 12, zIndex: 400 }}>
      <button style={{ height: 30, width: 30 }} onClick={(): void => setCursor('crosshair')}>
        <FaMapMarkerAlt />
      </button>
    </div>
  );
}

export default ToolbarControl;
