import React, { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createPlaceLatLngState } from "../../../../../states/buttons/createPlaceLatLngState";
import { createPlaceModalDisplayState } from "../../../../../states/buttons/createPlaceModalDisplayState";
import { Button } from "@mui/material";

type Props = {
  map: kakao.maps.Map;
};

function CreatePlaceButton({ map }: Props): React.ReactElement {
  const setCreatePlaceLatLng = useSetRecoilState(createPlaceLatLngState);
  const [createPlaceModalDisplay, setCreatePlaceModalDisplay] = useRecoilState(
    createPlaceModalDisplayState,
  );

  const getMarkerImage = () => {
    const imageSrc = "/img/fork.png";
    const imageSize = new kakao.maps.Size(20, 60);
    const imageOption = { offset: new kakao.maps.Point(10, 60) };
    return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  };

  const clickEvent = useCallback(
    (event: kakao.maps.event.MouseEvent): void => {
      const latitude = event.latLng.getLat();
      const longitude = event.latLng.getLng();
      setCreatePlaceLatLng({ latitude, longitude });
      if (!window.newPlace) {
        const markerImage = getMarkerImage();
        window.newPlace = new kakao.maps.Marker({
          image: markerImage,
          map: map,
          position: new kakao.maps.LatLng(latitude, longitude),
        });
      } else {
        window.newPlace.setPosition(new kakao.maps.LatLng(latitude, longitude));
      }
      // marker.setMap(map);
    },
    [map, setCreatePlaceLatLng],
  );

  useEffect(() => {
    if (!kakao || !map) return;
    if (createPlaceModalDisplay) {
      map.setCursor("crosshair");
      kakao.maps.event.addListener(map, "click", clickEvent);
    } else {
      map.setCursor("grab");
      kakao.maps.event.removeListener(map, "click", clickEvent);
    }
  }, [map, clickEvent, createPlaceModalDisplay]);

  return (
    <div style={{ position: "fixed", bottom: 30, left: 10 }}>
      <Button
        size={"small"}
        title={"새로운 장소 추가"}
        variant={"contained"}
        color={createPlaceModalDisplay ? "secondary" : "primary"}
        onClick={(): void => {
          // 생성모달 열거나 닫을때, 지도에 선택한 마커 아이콘도 같이 생성하거나 없애준다
          if (window.newPlace) {
            window.newPlace.setMap(createPlaceModalDisplay ? null : map);
          }
          setCreatePlaceModalDisplay(!createPlaceModalDisplay);
        }}
      >
        새로운 장소 추가
      </Button>
    </div>
  );
}

export default CreatePlaceButton;
