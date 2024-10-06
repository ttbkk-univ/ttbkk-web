import useSupabase from "../hooks/useSupabase.ts";
import { useQuery } from "@tanstack/react-query";
import { IPlace } from "@/hooks/usePlaceMap.ts";

export default function usePlaceDetail(clickedPlaceId: string) {
  const supabaseClient = useSupabase();
  return useQuery<IPlace, Error, IPlace>({
    queryKey: [`place-${clickedPlaceId}`],
    queryFn: async () =>
      await supabaseClient
        .from("place")
        .select(
          `
        *,
        brand (
          *,
          hashtags:brand_hashtags!brand_id (
            hashtag_id
          )
        ),
        hashtags:place_hashtags!place_id (
          hashtag_id
        )
      `,
        )
        .eq("id", clickedPlaceId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }
          return data;
        }),
  });
}
