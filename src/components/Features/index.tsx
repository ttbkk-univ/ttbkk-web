import FindMyLocation from './FindMyLocation';
import Sidebar from './Sidebar';
import BrandFilter from './BrandFilter';
import CreatePlaceModal from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceModal';
import CreatePlaceButton from './Sidebar/SidebarDetail/CreatePlace/CreatePlaceButton';

type Props = {
  map: kakao.maps.Map;
};
function Features({ map }: Props) {
  return (
    <div style={{ position: 'fixed', zIndex: 400 }}>
      <BrandFilter map={map} />
      <Sidebar map={map} />
      <FindMyLocation map={map} />
      <CreatePlaceButton map={map} />
      <CreatePlaceModal />
    </div>
  );
}

export default Features;
