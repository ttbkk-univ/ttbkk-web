import React, { useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import L, { Control } from 'leaflet';

function ToolbarControl(): React.ReactElement {
  return (
    <div style={{ position: 'fixed', top: 0, left: 50, zIndex: 400 }}>
      <button>create place</button>
    </div>
  );
}

export default ToolbarControl;
