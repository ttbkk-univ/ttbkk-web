import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createPlaceLatLngState } from '../../../states/buttons/createPlaceLatLngState';
import { Button, Input } from '@material-ui/core';
import { MdCancel, MdHelp, MdSend } from 'react-icons/all';
import { isMobile } from '../../../utils/is-mobile';
import { createPlaceModalDisplayState } from '../../../states/buttons/createPlaceModalDisplayState';

function CreatePlaceModal(): React.ReactElement {
  const latLng = useRecoilValue(createPlaceLatLngState);
  const [createPlaceModalDisplay, setCreatePlaceModalDisplay] = useRecoilState(
    createPlaceModalDisplayState,
  );
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceBrand, setNewPlaceBrand] = useState('');
  const [newPlaceDescription, setNewPlaceDescription] = useState('');
  const [newPlaceHashtagList, setNewPlaceHashtagList] = useState<string[]>([]);
  const [newPlaceHashtag, setNewPlaceHashtag] = useState('');

  useEffect(() => {
    latLng && console.log(latLng);
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

  const modalStyle = isMobile()
    ? { bottom: 100, left: 30, height: 500, width: 300 }
    : {
        top: '30%',
        left: '20%',
        width: 300,
      };

  const inputStyle = { paddingLeft: 8, paddingRight: 8, backgroundColor: 'white' };
  const inputTypeStyle = { color: 'white' };

  const onChange = (e: any): void => {
    const { value, name } = e.target;
    if (name === 'name') setNewPlaceName(value);
    if (name === 'brand') setNewPlaceBrand(value);
    if (name === 'description') setNewPlaceDescription(value);
    if (name === 'hashtag') {
      if (value[value.length - 1] === ',') {
        if (value.length === 1) return;
        const newHashtag = value.substr(0, value.length - 1);
        setNewPlaceHashtag('');
        if (newPlaceHashtagList.find((hashtag) => hashtag === newHashtag)) return;
        setNewPlaceHashtagList([...newPlaceHashtagList, newHashtag]);
      } else {
        setNewPlaceHashtag(value);
      }
      console.log(newPlaceHashtagList);
    }
  };

  return (
    <div
      id={'create_place_modal'}
      style={{
        ...modalStyle,
        position: 'fixed',
        zIndex: 400,
        visibility: createPlaceModalDisplay ? 'visible' : 'hidden',
        padding: 8,
        backgroundColor: 'rgba(30, 60, 80, 0.8)',
      }}
    >
      <div
        id={'create_place_modal_body'}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span style={{ color: 'ActiveBorder', fontSize: 20 }}>장소 생성</span>
        <div style={{ flexDirection: 'row-reverse', display: 'flex' }}>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={(): void => setCreatePlaceModalDisplay(false)}
          >
            <MdCancel />
          </Button>
        </div>
      </div>
      <hr />
      <div>
        <div style={{ flexDirection: 'row' }}>
          <div>
            <span style={inputTypeStyle}>이름</span>
            <Input
              style={inputStyle}
              name={'name'}
              placeholder={'신전떡볶이 풍납2동점'}
              type={'text'}
              disableUnderline={true}
              fullWidth={true}
              onChange={onChange}
              value={newPlaceName}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              브랜드 <MdHelp title={'체인점의 경우 입력\nex) 신전떡볶이'} />
            </span>
            <Input
              style={inputStyle}
              name={'brand'}
              placeholder={'신전떡볶이'}
              type={'text'}
              disableUnderline={true}
              fullWidth={true}
              onChange={onChange}
              value={newPlaceBrand}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              태그 <MdHelp title={'메뉴 등 검색에 필요한 해시태그'} />
            </span>
            {newPlaceHashtagList.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {newPlaceHashtagList.map((hashtag) => (
                  <div
                    key={hashtag}
                    style={{
                      display: 'flex',
                      backgroundColor: 'cornflowerblue',
                      marginRight: 4,
                      marginTop: 4,
                      marginBottom: 4,
                      alignItems: 'center',
                      padding: 2,
                    }}
                  >
                    {hashtag}
                    <Button
                      style={{ minWidth: 0, backgroundColor: 'cornflowerblue' }}
                      onClick={(): void => {
                        setNewPlaceHashtagList(
                          newPlaceHashtagList.filter((value: string) => value !== hashtag),
                        );
                      }}
                    >
                      <MdCancel />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <Input
              style={{
                ...inputStyle,
                boxSizing: 'border-box',
              }}
              name={'hashtag'}
              placeholder={'ex) 국물떡볶이, 순대, 오뎅, 송파구, 서울'}
              multiline={true}
              fullWidth={true}
              disableUnderline={true}
              rowsMax={10}
              onChange={onChange}
              value={newPlaceHashtag}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>설명</span>
            <Input
              style={{
                ...inputStyle,
                boxSizing: 'border-box',
              }}
              name={'description'}
              placeholder={'치즈떡볶이 주문시 정량보다 많이 주시는 느낌이라 자주 시켜먹게 되는 곳'}
              multiline={true}
              fullWidth={true}
              disableUnderline={true}
              rowsMax={10}
              onChange={onChange}
              value={newPlaceDescription}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>좌표 (지도 클릭)</span>
            <Input
              style={inputStyle}
              name={'latlng'}
              placeholder={'생성하고싶은 위치를 클릭하세요'}
              disableUnderline={true}
              fullWidth={true}
              disabled={true}
              value={
                latLng?.latitude && `${latLng.latitude.toFixed(6)}, ${latLng.longitude.toFixed(6)}`
              }
            />
          </div>
        </div>
        <div style={{ marginTop: 8, flexDirection: 'row-reverse', display: 'flex' }}>
          <Button variant={'contained'} color={'primary'} onClick={(): void => alert('신청!!')}>
            생성 요청하기 <MdSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaceModal;
