import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';

type Props = {
  map: kakao.maps.Map;
};
function ShareMapButton({ map }: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 70, left: 10 }}>
      <Button
        size={'small'}
        title={'위치 공유'}
        variant={'contained'}
        color={'primary'}
        onClick={(): void => {
          const element = document.createElement('input');
          const center = map.getCenter();
          const searchParam = new URLSearchParams();
          searchParam.append('center', `${center.getLat()},${center.getLng()}`);
          searchParam.append('zoom', map.getLevel().toString());
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
        위치 공유
      </Button>
    </div>
  );
}

export default ShareMapButton;
