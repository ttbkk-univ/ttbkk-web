import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createPlaceLatLngState } from '../../../../../states/buttons/createPlaceLatLngState';
import { Button, CircularProgress, Input, TextField } from '@material-ui/core';
import { MdCancel, MdHelp, MdSend } from 'react-icons/md';
import { isMobile } from '../../../../../utils/BrowserUtil';
import { createPlaceModalDisplayState } from '../../../../../states/buttons/createPlaceModalDisplayState';
import { AxiosResponse } from 'axios';
import { env } from '../../../../../env';
import { IPlace } from '../../../../../states/places/placeMap';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get, post } from '../../../../../utils/HttpRequestUtil';
import { Brand } from '../../../../../states/brands/brand';
import { MarkerService } from '../../../../../utils/kakaoMap/services/MarkerService';

function CreatePlaceModal(): React.ReactElement {
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const [latLng, setCreatePlaceLatLng] = useRecoilState(createPlaceLatLngState);
  const [createPlaceModalDisplay, setCreatePlaceModalDisplay] = useRecoilState(
    createPlaceModalDisplayState,
  );
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceBrand, setNewPlaceBrand] = useState('');
  const [newPlaceDescription, setNewPlaceDescription] = useState('');
  const [newPlaceHashtagList, setNewPlaceHashtagList] = useState<string[]>([]);
  const [newPlaceHashtag, setNewPlaceHashtag] = useState('');

  const [brandOpen, setBrandOpen] = useState(false);
  const [brandOptions, setBrandOptions] = useState<Brand[] | undefined>(undefined);
  const brandLoading: boolean = brandOpen && !brandOptions;
  const [autoCompleteKey, setAutoCompleteKey] = useState(new Date().getTime());

  useEffect(() => {
    let active: boolean = true;
    if (!brandLoading) return undefined;

    (async (): Promise<void> => {
      const response: AxiosResponse<Brand[]> = await get(env.api.host + '/api/brands/?search=');
      if (active) setBrandOptions(response.data);
    })();

    return (): void => {
      active = false;
    };
  }, [brandLoading]);

  useEffect(() => {
    if (!brandOpen) setBrandOptions(undefined);
  }, [brandOpen]);

  useEffect(() => {
    const tagContainer: HTMLElement | null = document.getElementById('tag-container');
    if (tagContainer) tagContainer.scrollTop = tagContainer.scrollHeight;
  }, [newPlaceHashtagList]);

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
        right: '10%',
        width: 400,
      };

  const inputStyle = { paddingLeft: 8, paddingRight: 8, backgroundColor: 'white' };
  const inputTypeStyle = { color: 'white' };

  const onChange = (e: any): void => {
    const { value, name } = e.target;
    if (name === 'name') setNewPlaceName(value);
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
    }
  };

  const onBrandSelectOrChange = (e: any): void => {
    const { value } = e.target;
    setNewPlaceBrand(value);
  };

  const resetForm = (closeAfterRequest: boolean): void => {
    closeAfterRequest && setCreatePlaceModalDisplay(false);
    setNewPlaceName('');
    setNewPlaceBrand('');
    setNewPlaceHashtag('');
    setNewPlaceHashtagList([]);
    setNewPlaceDescription('');
    setAutoCompleteKey(new Date().getTime());
    setCreatePlaceLatLng(undefined);
    window.newPlace.setMap(null);
    window.newPlace = null;
  };

  const placeToMarker = (place: IPlace): any => {
    class PlaceMarker extends window.kakao.maps.Marker {
      id: string;

      constructor(props: any) {
        super(props);
        this.id = props.id;
      }
    }

    const marker = new PlaceMarker({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      title: place.name,
      clickable: true,
      id: place.id,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      setClickedPlace(marker.id);
    });
    return marker;
  };

  const createRequest = (closeAfterRequest: boolean): void => {
    if (!newPlaceName) {
      alert('이름을 입력하세요');
      return;
    }
    if (!newPlaceBrand) {
      alert("브랜드를 입력하세요 (없다면 '로컬'이라고 입력)");
      return;
    }
    if (!latLng) {
      alert('지도에서 매장 위치를 클릭하세요');
      return;
    }

    const data = {
      name: newPlaceName,
      description: newPlaceDescription,
      latitude: latLng?.latitude,
      longitude: latLng?.longitude,
      brand_name: newPlaceBrand,
      hashtags: newPlaceHashtagList,
    };
    post(env.api.host + '/api/places/', data)
      .then((res: AxiosResponse) => {
        const newPlace: IPlace = res.data;
        window.placeMap[newPlace.id] = newPlace;
        const marker = placeToMarker(newPlace);
        if (!window.brands[newPlace.brand.id]) {
          window.brands[newPlace.brand.id] = {
            id: newPlace.brand.id,
            name: newPlace.brand.name,
            markers: [],
            nameOverlays: MarkerService.createNameOverlay(newPlace),
            visible: true,
          };
        }
        window.brands[newPlace.brand.id].markers.push(marker);
        window.brands[newPlace.brand.id].visible && window.clusterer.addMarker(marker);
      })
      .catch((e) => {
        console.log(e);
        alert('서버 문제로 생성에 요청에 실패했습니다');
      })
      .then(() => resetForm(closeAfterRequest));
  };

  return (
    <div
      id={'create_place_modal'}
      style={{
        ...modalStyle,
        position: 'fixed',
        visibility: createPlaceModalDisplay ? 'visible' : 'hidden',
        padding: 8,
        backgroundColor: 'rgba(30, 60, 80, 0.8)',
      }}
    >
      <div
        id={'create_place_modal_body'}
        style={{ display: 'flex', justifyContent: 'space-between', cursor: 'grab' }}
      >
        <span style={{ color: 'ActiveBorder', fontSize: 20 }}>장소 생성</span>
        <div style={{ flexDirection: 'row-reverse', display: 'flex' }}>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={(): void => {
              setCreatePlaceModalDisplay(false);
              window.newPlace?.setMap(null);
            }}
          >
            <MdCancel />
          </Button>
        </div>
      </div>
      <hr />
      <div>
        <div style={{ flexDirection: 'row' }}>
          <div>
            <span style={inputTypeStyle}>
              이름 <MdHelp title={'매장 이름을 입력해주세요.\n' + 'ex)신전떡볶이 풍납점'} />
            </span>
            <Input
              style={inputStyle}
              name={'name'}
              placeholder={'신전떡볶이 풍납점'}
              type={'text'}
              disableUnderline={true}
              fullWidth={true}
              onChange={onChange}
              value={newPlaceName}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              브랜드{' '}
              <MdHelp
                title={
                  '가맹점이 있는 경우 해당 상호명을 입력해주세요.\n' +
                  "가맹점이 없는 경우 '로컬'이라고 입력하면 됩니다.\n" +
                  'ex) 신전떡볶이\n' +
                  'ex) 로컬'
                }
              />
            </span>
            <Autocomplete
              key={autoCompleteKey}
              style={inputStyle}
              open={brandOpen}
              onOpen={(): void => setBrandOpen(true)}
              onClose={(): void => setBrandOpen(false)}
              onSelect={onBrandSelectOrChange}
              getOptionSelected={(option: Brand, value: Brand): boolean =>
                option.name === value.name
              }
              freeSolo={true}
              getOptionLabel={(option: Brand): string => option?.name || newPlaceBrand}
              options={brandOptions || []}
              loading={brandLoading}
              renderInput={(params): JSX.Element => (
                <TextField
                  {...params}
                  onChange={onBrandSelectOrChange}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    placeholder: '신전떡볶이',
                    endAdornment: (
                      <React.Fragment>
                        {brandLoading ? <CircularProgress color={'inherit'} size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              태그{' '}
              <MdHelp
                title={
                  '쉼표(,)를 누를때마다 태그가 생성됩니다.\n' +
                  '생성된 태그는 검색 등에 활용될 예정입니다.\n' +
                  'ex)서울,송파구,풍납동,국물떡볶이,순대,오뎅,송파구,서울'
                }
              />
            </span>
            {newPlaceHashtagList.length ? (
              <div
                id={'tag-container'}
                style={{ display: 'flex', flexWrap: 'wrap', overflow: 'auto', maxHeight: 150 }}
              >
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
              placeholder={'ex) 국물떡볶이,순대,오뎅,송파구,서울'}
              multiline={true}
              fullWidth={true}
              disableUnderline={true}
              rowsMax={10}
              onChange={onChange}
              value={newPlaceHashtag}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              설명{' '}
              <MdHelp
                title={
                  '가게에 대한 설명을 적어주세요.\n' +
                  '자세하게 적어주시면 서비스 품질 개선에 도움이 됩니다.'
                }
              />
            </span>
            <Input
              style={{
                ...inputStyle,
                boxSizing: 'border-box',
              }}
              name={'description'}
              placeholder={
                '가게에 대한 설명을 적어주세요.\n' +
                '자세하게 적어주시면 서비스 품질 개선에 도움이 됩니다.'
              }
              multiline={true}
              fullWidth={true}
              disableUnderline={true}
              rowsMax={10}
              onChange={onChange}
              value={newPlaceDescription}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              좌표 (지도 클릭){' '}
              <MdHelp
                title={'지도에서 실제 위치를 클릭하세요.\n' + '생성할 장소의 위치가 표시됩니다.'}
              />
            </span>
            <Input
              style={inputStyle}
              name={'latlng'}
              placeholder={'지도에서 실제 위치를 클릭하세요.'}
              disableUnderline={true}
              fullWidth={true}
              disabled={true}
              value={latLng ? `${latLng.latitude.toFixed(6)}, ${latLng.longitude.toFixed(6)}` : ''}
            />
          </div>
        </div>
        <div style={{ marginTop: 8, flexDirection: 'row-reverse', display: 'flex' }}>
          <Button variant={'contained'} color={'primary'} onClick={(): void => createRequest(true)}>
            생성 후 닫기 <MdSend />
          </Button>
          <Button
            style={{ marginRight: 8 }}
            variant={'contained'}
            color={'primary'}
            onClick={(): void => createRequest(false)}
          >
            생성 후 계속 작성하기 <MdSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaceModal;
