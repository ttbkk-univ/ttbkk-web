import FindMyLocation from "./FindMyLocation";
import Sidebar from "./Sidebar";
import BrandFilter from "./BrandFilter";
// import CreatePlaceModal from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceModal';
// import CreatePlaceButton from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceButton';
import ShareMap from "./Sidebar/SidebarDetail/ShareMap";

function Features() {
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
