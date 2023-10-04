import React, {
  ChangeEventHandler,
  CSSProperties,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createPlaceLatLngState } from '../../../../../states/buttons/createPlaceLatLngState';
import { MdCancel, MdHelp } from 'react-icons/md';
import { isMobile } from '../../../../../utils/BrowserUtil';
import { createPlaceModalDisplayState } from '../../../../../states/buttons/createPlaceModalDisplayState';
import { env } from '../../../../../env';
import { IPlace } from '../../../../../states/places/placeMap';
import { clickedPlaceState } from '../../../../../states/places/clickedPlace';
import { get, post } from '../../../../../utils/HttpRequestUtil';
import { Brand } from '../../../../../states/brands/brand';
import { MarkerService } from '../../../../../utils/kakaoMap/services/MarkerService';
import { Button, createFilterOptions, Input, useAutocomplete } from '@mui/material';
import { ListBox } from '../../../../../styles/CreatePlaceModal/AutoComplete';
import { useQuery } from 'react-query';

type Props = {
  clusterer: kakao.maps.MarkerClusterer;
};

function CreatePlaceModal({ clusterer }: Props): React.ReactElement {
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

  const { isLoading, error, data } = useQuery('brand-all', () =>
    get<Brand[]>(env.api.host + '/api/brands/?search='),
  );

  const brandOptions =
    isLoading || error || !data
      ? []
      : data.map((brand) => ({
          name: brand.name,
          label: brand.name,
          hashtags: brand.hashtags,
          id: brand.id,
          description: brand.description,
        }));

  const {
    getRootProps: getBrandRootProps,
    getInputLabelProps: getBrandInputLabelProps,
    getInputProps: getBrandInputProps,
    getListboxProps: getBrandListboxProps,
    getOptionProps: getBrandOptionProps,
    groupedOptions: groupedBrandOptions,
  } = useAutocomplete<Brand>({
    id: 'brand-autocomplete',
    options: brandOptions,
    // TODO 새로운 브랜드 생길때 `"브랜드" 추가` 형태로 보여주기
    getOptionLabel: (option): string => option.name,
    onChange: (_: React.SyntheticEvent, newValue: null | Brand): void => {
      if (!newValue) return;
      setNewPlaceBrand(newValue.name);
    },
    filterOptions: (options: Brand[], state): Brand[] => {
      const filtered = createFilterOptions<Brand>()(options, state);
      const { inputValue } = state;
      const isExisting = options.some((option) => inputValue === option.name);
      if (inputValue !== '' && !isExisting) {
        filtered.push({ name: inputValue, label: `"${inputValue}" 추가` });
      }
      return filtered;
    },
  });

  useEffect(() => {
    const tagContainer: HTMLElement | null = document.getElementById('tag-container');
    if (tagContainer) tagContainer.scrollTop = tagContainer.scrollHeight;
  }, [newPlaceHashtagList]);

  function dragElement(element: HTMLDivElement): void {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    const body = document.getElementById(element.id + '_body');
    if (!isMobile()) {
      const dragMouseDown = (event: MouseEvent) => {
        // event = event || window.event; TODO 주석처리 문제 없는지 확인
        event.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      };

      if (body) {
        // if present, the header is where you move the DIV from:
        body.onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
      }

      const elementDrag = (event: MouseEvent) => {
        // e = e || window.event; // TODO 주석처리 문제 없는지 확인
        event.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        // set the element's new position:
        element.style.top = element.offsetTop - pos2 + 'px';
        element.style.left = element.offsetLeft - pos1 + 'px';
      };

      const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  }

  useEffect(() => {
    const modalElement = document.getElementById('create_place_modal');
    if (!modalElement) throw new Error('modal element is null');
    dragElement(modalElement as HTMLDivElement);
  }, []);

  const modalStyle = isMobile()
    ? { bottom: 100, left: 30, height: 500, width: 300 }
    : {
        top: '30%',
        right: '10%',
        width: 400,
      };

  const inputStyle: CSSProperties = { paddingLeft: 8, paddingRight: 8, backgroundColor: 'white' };
  const inputTypeStyle = { color: 'white' };

  const nameOnChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { value } = event.target;
    setNewPlaceName(value);
  };

  const descriptionOnChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { value } = event.target;
    setNewPlaceDescription(value);
  };

  const hashtagOnChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { value } = event.target;
    // check regex
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]*$/;
    if (!regex.test(value)) return;
    setNewPlaceHashtag(value);
  };

  const hashtagOnKeyDown: KeyboardEventHandler = (e) => {
    const key = e.key;
    const isBackspace = (key: string): boolean => key === 'Backspace';
    if (isBackspace(key) && newPlaceHashtag === '') {
      setNewPlaceHashtagList(
        newPlaceHashtagList.slice(0, Math.max(newPlaceHashtagList.length - 1, 0)),
      );
    }

    const isCommaOrSpace = (key: string): boolean => key === ',' || key === ' ';
    if (isCommaOrSpace(key)) {
      if (!newPlaceHashtag) return;
      setNewPlaceHashtag('');
      if (newPlaceHashtagList.find((hashtag) => hashtag === newPlaceHashtag)) return;
      setNewPlaceHashtagList([...newPlaceHashtagList, newPlaceHashtag]);
    }
  };

  const resetForm = (closeAfterRequest: boolean): void => {
    closeAfterRequest && setCreatePlaceModalDisplay(false);
    setNewPlaceName('');
    setNewPlaceBrand('');
    setNewPlaceHashtag('');
    setNewPlaceHashtagList([]);
    setNewPlaceDescription('');
    setCreatePlaceLatLng(undefined);
    window.newPlace.setMap(null);
    window.newPlace = null;
  };

  const placeToMarker = (place: IPlace) => {
    class PlaceMarker extends kakao.maps.Marker {
      id: string;

      constructor(props: { id: string } & kakao.maps.MarkerOptions) {
        super(props);
        this.id = props.id;
      }
    }

    const marker = new PlaceMarker({
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
      title: place.name,
      clickable: true,
      id: place.id,
    });
    kakao.maps.event.addListener(marker, 'click', () => {
      setClickedPlace(marker.id);
    });
    return marker;
  };

  const createRequest = (closeAfterRequest: boolean): void => {
    if (!newPlaceName) {
      alert('이름을 입력하세요');
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
    post<IPlace>(env.api.host + '/api/places/', data)
      .then((newPlace) => {
        window.placeMap[newPlace.id] = newPlace;
        const marker = placeToMarker(newPlace);
        const brandId = newPlace.brand?.id || 'no_brand';
        const brandName = newPlace.brand?.name || '로컬';
        if (!window.brands[brandId]) {
          window.brands[brandId] = {
            id: brandId,
            name: brandName,
            markers: [],
            nameOverlays: [MarkerService.createNameOverlay(newPlace)],
            visible: true,
          };
        }
        window.brands[brandId].markers.push(marker);
        window.brands[brandId].visible && clusterer.addMarker(marker);
      })
      .catch((e) => {
        console.error(e);
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
        <span style={{ color: 'white', fontSize: 20 }}>장소 생성 (٭: 필수)</span>
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
              * 이름 <MdHelp title={'매장 이름을 입력해주세요.\n' + 'ex)신전떡볶이 풍납점'} />
            </span>
            <Input
              style={inputStyle}
              name={'name'}
              placeholder={'골목떡볶이'}
              type={'text'}
              disableUnderline={true}
              fullWidth={true}
              required={true}
              onChange={nameOnChange}
              value={newPlaceName}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              * 좌표 (지도 클릭){' '}
              <MdHelp
                title={'지도에서 실제 위치를 클릭하세요.\n' + '생성할 장소의 위치가 표시됩니다.'}
              />
            </span>
            <Input
              style={inputStyle}
              name={'latlng'}
              placeholder={'지도에서 실제 위치를 클릭하세요.'}
              required={true}
              disableUnderline={true}
              fullWidth={true}
              disabled={true}
              value={latLng ? `${latLng.latitude.toFixed(6)}, ${latLng.longitude.toFixed(6)}` : ''}
            />
          </div>
          <div {...getBrandRootProps()}>
            <span {...getBrandInputLabelProps()} style={inputTypeStyle}>
              브랜드{' '}
              <MdHelp
                title={
                  '가맹점이 있는 경우 해당 상호명을 입력해주세요.\n' +
                  '가맹점이 없는 경우 생략하면 됩니다.\n' +
                  'ex) 신전떡볶이'
                }
              />
            </span>
            <Input
              inputProps={getBrandInputProps()}
              style={inputStyle}
              name={'brand'}
              placeholder={'브랜드를 입력하세요 (없다면 공백)'}
              type={'text'}
              disableUnderline={true}
              fullWidth={true}
            />
            {groupedBrandOptions?.length > 0 ? (
              <ListBox {...getBrandListboxProps()}>
                {(groupedBrandOptions as Array<Brand>).map((option, index) => (
                  <li {...getBrandOptionProps({ option, index })}>{option.label}</li>
                ))}
              </ListBox>
            ) : null}
          </div>
          <div>
            <span style={inputTypeStyle}>
              태그{' '}
              <MdHelp
                title={
                  '공백이나 쉼표(,)를 누를때마다 태그가 생성됩니다.\n' +
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
              maxRows={10}
              onChange={hashtagOnChange}
              value={newPlaceHashtag}
              onKeyDown={hashtagOnKeyDown}
            />
          </div>
          <div>
            <span style={inputTypeStyle}>
              설명 <MdHelp title={'가게에 대한 설명을 적어주세요.'} />
            </span>
            <Input
              style={{
                ...inputStyle,
                boxSizing: 'border-box',
              }}
              name={'description'}
              placeholder={'가게에 대한 설명을 적어주세요.'}
              multiline={true}
              fullWidth={true}
              disableUnderline={true}
              maxRows={10}
              onChange={descriptionOnChange}
              value={newPlaceDescription}
            />
          </div>
        </div>
        <div style={{ marginTop: 8, flexDirection: 'row', display: 'flex', float: 'right' }}>
          <Button
            style={{ marginRight: 8 }}
            variant={'contained'}
            color={'primary'}
            onClick={(): void => createRequest(false)}
          >
            생성 후 계속 생성하기
          </Button>
          <Button variant={'contained'} color={'primary'} onClick={(): void => createRequest(true)}>
            생성 후 닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaceModal;
