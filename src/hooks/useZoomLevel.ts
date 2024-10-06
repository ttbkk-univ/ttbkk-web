import useMap from "@/hooks/useMap.ts";
import useMapPosition from "@/hooks/useMapPosition.ts";

export default function useZoomLevel(): {
  minLevel: number;
  defaultLevel: number;
  clusterMinLevel: number;
  level: number;
  setZoomLevel: () => void;
  getIsPassMinLevel: () => boolean;
} {
  const { setCenter } = useMapPosition();
  const map = useMap();
  const zoomFromLocalStorage = window.localStorage.getItem("zoom");
  const minLevel: number = 1;
  const defaultLevel: number = 8;
  const clusterMinLevel: number = 5;

  const getLevel = () => {
    const zoomFromSearchParams = new URLSearchParams(
      window.location.search,
    ).get("zoom");
    if (zoomFromSearchParams && !isNaN(Number(zoomFromSearchParams))) {
      return Number(zoomFromSearchParams);
    }
    return zoomFromLocalStorage ? Number(zoomFromLocalStorage) : defaultLevel;
  };

  const level = getLevel();

  return {
    minLevel: minLevel,
    defaultLevel: defaultLevel,
    clusterMinLevel: clusterMinLevel,
    level: level,
    setZoomLevel: () => {
      window.localStorage.setItem("zoom", map.getLevel().toString());
      setCenter();
    },
    getIsPassMinLevel: () => {
      const isPrevLevelLargerThanMinLevel = level >= clusterMinLevel;
      const isCurrentLevelLargerThanMinLevel =
        map.getLevel() >= clusterMinLevel;
      return isPrevLevelLargerThanMinLevel !== isCurrentLevelLargerThanMinLevel;
    },
  };
}
