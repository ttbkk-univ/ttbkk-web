import React, { useState } from 'react';
import { MdMyLocation, MdShare } from 'react-icons/md';
import { Button, Snackbar } from '@material-ui/core';
import { IoMdClipboard } from 'react-icons/all';
import { useRecoilValue } from 'recoil';

function ShareMapButton(): React.ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', top: 150, right: 10, zIndex: 400 }}>
      <Button
        title={'위치 공유'}
        variant={'contained'}
        color={'primary'}
        style={{ height: 32, width: 32, padding: 0 }}
        onClick={(): void => {
          const element = document.createElement('input');
          const center = window.map.getCenter();
          const searchParam = new URLSearchParams();
          searchParam.append('center', `${center.getLat()},${center.getLng()}`);
          searchParam.append('zoom', window.map.getLevel());
          element.value =
            window.location.protocol + '//' + window.location.host + '?' + searchParam.toString();
          document.body.appendChild(element);
          element.select();
          document.execCommand('copy');
          document.body.removeChild(element);
          setOpen(true);
        }}
      >
        <Snackbar
          message={'현재 위치가 클립보드에 복사되었습니다!'}
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={(): void => setOpen(false)}
          autoHideDuration={1000}
        />
        <MdShare size={20} />
      </Button>
    </div>
  );
}

export default ShareMapButton;
