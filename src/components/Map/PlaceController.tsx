import { useRecoilState } from "recoil";
import useMapClusterer from "@/hooks/useMapClusterer.ts";
import useMap from "@/hooks/useMap.ts";
import { requireLoadState } from "@/states/places/requireLoad.ts";
import { useEffect, useState } from "react";
import PlaceGrid from "@/components/Map/PlaceGrid.tsx";
import useMapPosition, { LatLng } from "@/hooks/useMapPosition.ts";

export default function PlaceController() {
  const map = useMap();
  const mapClusterer = useMapClusterer();
  const [requireLoad, setRequireLoad] = useRecoilState(requireLoadState);
  const [placeGridList, setPlaceGridList] = useState<
    { bottomLeft: LatLng; topRight: LatLng }[]
  >([]);
  const { getGeoBound } = useMapPosition();

  useEffect(() => {
    if (!map || !mapClusterer || !requireLoad) return;

    const geoBound: [LatLng, LatLng] = getGeoBound();
    const minUnit = 0.25;
    const minLat = Math.floor(geoBound[0].latitude / minUnit) * minUnit;
    const minLon = Math.floor(geoBound[0].longitude / minUnit) * minUnit;
    const maxLat = Math.ceil(geoBound[1].latitude / minUnit) * minUnit;
    const maxLon = Math.ceil(geoBound[1].longitude / minUnit) * minUnit;

    console.log({ minLat, minLon, maxLat, maxLon });
    const newPlaceGridList = [];
    for (let lat = minLat; lat < maxLat; lat++) {
      for (let lon = minLon; lon < maxLon; lon++) {
        const bottomLeft = { latitude: lat, longitude: lon };
        const topRight = { latitude: lat + 1, longitude: lon + 1 };
        newPlaceGridList.push({ topRight, bottomLeft });
      }
    }
    setPlaceGridList(newPlaceGridList);

    setRequireLoad(false);
  }, [requireLoad, map, mapClusterer]);

  return (
    <>
      {placeGridList.map((placeGrid) => (
        <PlaceGrid
          key={`${placeGrid.topRight.latitude},${placeGrid.topRight.longitude}`}
          bottomLeft={placeGrid.bottomLeft}
          topRight={placeGrid.topRight}
        />
      ))}
    </>
  );
}
