import useMap from "@/hooks/useMap.ts";

export interface LatLng {
  latitude: number;
  longitude: number;
}

export default function useMapPosition() {
  const map = useMap();
  const getPosition = (): LatLng => {
    // search param 이 있는 경우
    const centerFromSearchParams = new URLSearchParams(
      window.location.search,
    ).get("center");
    if (centerFromSearchParams?.toString().split(",").length) {
      const [lat, lng]: string[] = centerFromSearchParams
        .toString()
        .split(",", 2);
      if (!isNaN(Number(lat)) && !isNaN(Number(lng))) {
        return { latitude: Number(lat), longitude: Number(lng) };
      }
    }

    // localstorage 가 있는 경우
    const centerFromLocalStorage = window.localStorage.getItem("center");
    if (centerFromLocalStorage) {
      const result = JSON.parse(centerFromLocalStorage);
      if (result.latitude && result.longitude) {
        return { latitude: result.latitude, longitude: result.longitude };
      }
    }

    // default
    return { latitude: 37.53026789291489, longitude: 127.12380358542175 };
  };

  const position = getPosition();
  return {
    position,
    setCenter: () => {
      const center = map.getCenter();
      window.localStorage.setItem(
        "center",
        JSON.stringify({
          latitude: center.getLat(),
          longitude: center.getLng(),
        }),
      );
    },
    getGeoBound: (): [LatLng, LatLng] => {
      const bounds = map.getBounds();
      const bottomLeft = bounds.getSouthWest();
      const topRight = bounds.getNorthEast();
      return [
        {
          latitude: bottomLeft.getLat(),
          longitude: bottomLeft.getLng(),
        },
        {
          latitude: topRight.getLat(),
          longitude: topRight.getLng(),
        },
      ];
    },
  };
}
