import PlaceHashtag from "./PlaceHashtag";
import BrandHashtag from "./BrandHashtag";
import PlaceAddress from "./PlaceAddress";
import PlaceTelephone from "./PlaceTelephone";
import PlaceFindingWayNaver from "./PlaceFindingWayNaver";
import PlaceFindingWayKakao from "./PlaceFindingWayKakao";
import { PathFindingButtonGroup } from "../../../../../styles/PlaceDetail/PathFindingButtonGroup";
import usePlaceDetail from "../../../../../api/usePlaceDetail.ts";
import { IHashtag } from "@/hooks/usePlaceMap.ts";

type Props = {
  clickedPlaceId: string;
};
function PlaceDetailModal({ clickedPlaceId }: Props) {
  const { isLoading, error, data: place } = usePlaceDetail(clickedPlaceId);

  if (isLoading) return null;
  if (!place || error) return <div>something went wrong</div>;

  return (
    <div
      style={{
        fontWeight: "bold",
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
        overflowY: "auto",
        left: 0,
        top: 100,
      }}
    >
      <div style={{ fontSize: "1.5rem", color: "#000000" }}>{place.name}</div>
      <hr />
      {place.address ? <PlaceAddress address={place.address} /> : null}
      <PathFindingButtonGroup>
        <PlaceFindingWayNaver
          latitude={place.latitude}
          longitude={place.longitude}
          name={place.name}
        />
        <PlaceFindingWayKakao
          latitude={place.latitude}
          longitude={place.longitude}
          name={place.name}
        />
      </PathFindingButtonGroup>
      {place.telephone ? <PlaceTelephone telephone={place.telephone} /> : null}
      <div>
        <div style={{ whiteSpace: "pre-line" }}>{place.description}</div>
        {place.brand?.description ? (
          <>
            <br />
            <div style={{ whiteSpace: "pre-line" }}>
              {place.brand.description}
            </div>
          </>
        ) : null}
      </div>
      <hr />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {place.brand?.hashtags.map((hashtag: IHashtag) => (
          <BrandHashtag
            key={place.brand?.name + hashtag.hashtag_id}
            hashtag={hashtag.hashtag_id}
          />
        ))}
        {place.hashtags?.map((hashtag: IHashtag) => (
          <PlaceHashtag key={hashtag.hashtag_id} hashtag={hashtag.hashtag_id} />
        ))}
      </div>
    </div>
  );
}

export default PlaceDetailModal;
