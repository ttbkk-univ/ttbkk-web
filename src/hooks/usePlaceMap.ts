import { postError } from "@/utils/HttpRequestUtil.ts";
import useSupabase from "@/hooks/useSupabase.ts";
import { useQuery } from "@tanstack/react-query";
import { LatLng } from "@/hooks/useMapPosition.ts";

type Props = {
  bottomLeft: LatLng;
  topRight: LatLng;
};

export interface IHashtag {
  hashtag_id: string;
}

export interface IBrand {
  id: string;
  name: string;
  description: string;
  hashtags: IHashtag[];
}

export interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  telephone?: string;
  description?: string;
  name: string;
  hashtags: IHashtag[];
  brand?: IBrand;
}

export default function usePlaceMap(props: Props) {
  const supabaseClient = useSupabase();

  const { topRight, bottomLeft } = props;

  const searchParam = new URLSearchParams();
  searchParam.set(
    "bottom_left",
    `${bottomLeft.latitude},${bottomLeft.longitude}`,
  );
  searchParam.set("top_right", `${topRight.latitude},${topRight.longitude}`);

  return useQuery<{ [key: string]: IPlace }, Error, { [key: string]: IPlace }>({
    queryKey: ["placeMap", searchParam.toString()],
    queryFn: async () => {
      return supabaseClient
        .from("place")
        .select(
          `
            *,
            brand (*),
            place_hashtags (*)
          `,
        )
        .gte("latitude", bottomLeft.latitude)
        .lte("latitude", topRight.latitude)
        .gte("longitude", bottomLeft.longitude)
        .lte("longitude", topRight.longitude)
        .then(({ data, error }) => {
          if (error) {
            postError(error);
            throw new Error(error.message);
          }
          return data;
        })
        .then((data) => {
          const placeMap: { [key: string]: IPlace } = {};
          Object.values(data).forEach((place) => {
            placeMap[place.id] = place;
          });
          return placeMap;
        });
    },
  });
}
