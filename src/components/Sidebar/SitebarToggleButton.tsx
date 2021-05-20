import React, { Dispatch, SetStateAction } from 'react';

interface SidebarToggleButtonProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}

function SidebarToggleButton(props: SidebarToggleButtonProps): React.ReactElement {
  const { display, setDisplay } = props;
  return (
    <div>
      <button onClick={(): void => setDisplay(!display)}>{display ? '닫기' : '열기'}</button>
    </div>
  );
}

export default SidebarToggleButton;
