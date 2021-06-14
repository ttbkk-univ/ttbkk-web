import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { createPlaceButtonClickedState } from '../../states/buttons/createPlaceButtonState';
import { Button } from '@material-ui/core';
import { MdCancel } from 'react-icons/all';
import { isMobile } from '../utils/is-mobile';

export function CreatePlaceModal(): React.ReactElement {
  const [latLng, setCreatePlaceButtonClicked] = useRecoilState(createPlaceButtonClickedState);

  useEffect(() => {
    console.log(latLng);
  }, [latLng]);

  useEffect(() => {
    function dragElement(element: any): void {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      const body = document.getElementById(element.id + '_body');
      if (!isMobile()) {
        if (body) {
          // if present, the header is where you move the DIV from:
          body.onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e: any): void {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e: any): void {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = element.offsetTop - pos2 + 'px';
          element.style.left = element.offsetLeft - pos1 + 'px';
        }

        function closeDragElement(): void {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    }
    dragElement(document.getElementById('create_place_modal'));
  }, []);

  const style = isMobile()
    ? { bottom: 100, left: 30 }
    : {
        top: '50%',
        left: '50%',
      };

  return (
    <div
      id={'create_place_modal'}
      style={{
        ...style,
        position: 'fixed',
        zIndex: 400,
        visibility: latLng ? 'visible' : 'hidden',
      }}
    >
      <div
        id={'create_place_modal_body'}
        style={{ backgroundColor: 'rgba(30, 60,80,0.8)', height: 300, width: 300 }}
      >
        {latLng?.latitude}, {latLng?.longitude}
        <Button onClick={(): void => setCreatePlaceButtonClicked(undefined)}>
          <MdCancel />
        </Button>
      </div>
    </div>
  );
}
