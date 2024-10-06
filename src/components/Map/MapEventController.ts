import { useEffect, useState } from "react";
import useZoomLevel from "@/hooks/useZoomLevel.ts";
import useMap from "@/hooks/useMap.ts";
import { useSetRecoilState } from "recoil";
import { clickedPlaceState } from "@/states/places/clickedPlace.ts";
import { createPlaceModalDisplayState } from "@/states/buttons/createPlaceModalDisplayState.ts";
import { requireLoadState } from "@/states/places/requireLoad.ts";

export default function MapEventController() {
  const map = useMap();
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const setCreatePlaceModalDisplay = useSetRecoilState(
    createPlaceModalDisplayState,
  );
  const setRequireLoad = useSetRecoilState(requireLoadState);
  const { setZoomLevel, clusterMinLevel, getIsPassMinLevel, level } =
    useZoomLevel();
  const [zoomChanged, setZoomChanged] = useState(false);

  let debounce: NodeJS.Timeout;
  let isDebounced = false;
  const debounceTime: number = 500;

  const moveEventHandler = (): void => {
    if (!isDebounced) {
      setRequireLoad(true);
    } else {
      clearTimeout(debounce);
    }
    isDebounced = true;
    debounce = setTimeout(() => {
      isDebounced = false;
    }, debounceTime);
  };

  const onCenterChanged = () => {
    const center = map.getCenter();
    window.localStorage.setItem(
      "center",
      JSON.stringify({
        latitude: center.getLat(),
        longitude: center.getLng(),
      }),
    );
    if (!zoomChanged) moveEventHandler();
  };

  const onZoomChanged = () => {
    setZoomChanged(true);
    // 추가되어있었다면 없애고, 없었으면 추가해주고
    if (getIsPassMinLevel()) {
      const visible: boolean = map.getLevel() < clusterMinLevel;
      Object.values(window.brands).map((brand) => {
        const isOverlayVisible = brand.visible && visible === brand.visible;
        brand.nameOverlays.map((nameOverlay) =>
          nameOverlay.setMap(isOverlayVisible ? map : null),
        );
      });
    }

    setZoomLevel();
    if (level <= map.getLevel()) moveEventHandler();
    setZoomChanged(false);
  };

  useEffect(() => {
    if (!map) return;

    // useKakaoEvent(map, "bounds_changed", onBoundsChanged);
    kakao.maps.event.addListener(map, "center_changed", onCenterChanged);
    // useKakaoEvent(map, "click", onClick);
    // useKakaoEvent(map, "dblclick", onDoubleClick);
    kakao.maps.event.addListener(map, "drag", moveEventHandler);
    // useKakaoEvent(map, "dragstart", onDragStart);
    // useKakaoEvent(map, "dragend", onDragEnd);
    // useKakaoEvent(map, "idle", onIdle);
    // useKakaoEvent(map, "maptypeid_changed", onMaptypeidChanged);
    // useKakaoEvent(map, "mousemove", onMouseMove);
    // useKakaoEvent(map, "rightclick", onRightClick);
    // useKakaoEvent(map, "tilesloaded", onTileLoaded);
    kakao.maps.event.addListener(map, "zoom_changed", onZoomChanged);
    // useKakaoEvent(map, "zoom_start", onZoomStart);

    document.onkeydown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        window.newPlace?.setMap(null);
        setClickedPlace(undefined);
        setCreatePlaceModalDisplay(false);
      }
    };
  }, []);

  return null;
}
