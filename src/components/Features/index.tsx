import FindMyLocation from "./FindMyLocation";
import Sidebar from "./Sidebar";
import BrandFilter from "./BrandFilter";
// import CreatePlaceModal from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceModal';
// import CreatePlaceButton from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceButton';
import ShareMap from "./Sidebar/SidebarDetail/ShareMap";
import useMapClusterer from "@/hooks/useMapClusterer.ts";
import useMap from "@/hooks/useMap.ts";

function Features() {
  const map = useMap();
  const clusterer = useMapClusterer();

  if (!map || !clusterer) return null;

  return (
    <div style={{ position: "fixed", zIndex: 400 }}>
      <BrandFilter />
      <Sidebar />
      <FindMyLocation />
      <ShareMap />
      {/*<CreatePlaceButton map={map} />*/}
      {/*<CreatePlaceModal clusterer={clusterer} />*/}
    </div>
  );
}

export default Features;
