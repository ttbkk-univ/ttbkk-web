import React from 'react';
import { useRecoilState } from 'recoil';
import { sidebarIsOpenState } from '../../../states/sidebar/siteIsOpen';
import { MdArrowBack, MdArrowForward } from 'react-icons/all';

function OpenSidebarButton(): React.ReactElement {
  const [isOpened, setIsOpened] = useRecoilState(sidebarIsOpenState);
  return (
    <button
      style={{
        height: 64,
        width: 24,
        top: '25%',
        left: isOpened ? 300 : 0,
        position: 'fixed',
        borderRadius: '0px 10px 10px 0px',
        backgroundColor: 'white',
        border: 'none',
        boxShadow: 'rgb(0 0 0 / 15%) 2px 2px 2px 2px',
        cursor: 'pointer',
      }}
      onClick={(): void => setIsOpened(!isOpened)}
    >
      {isOpened ? <MdArrowBack size={16} /> : <MdArrowForward size={16} />}
    </button>
  );
}

export default OpenSidebarButton;
