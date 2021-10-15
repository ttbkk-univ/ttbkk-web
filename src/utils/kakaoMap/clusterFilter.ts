import { getMD5 } from '../hash.util';

export function applyClusterFilter(brandNames: string[], status: boolean): void {
  const markers: any[] = [];
  brandNames.forEach((brandName) => {
    const brandHash = getMD5(brandName);
    if (window.brands[brandHash]) {
      markers.push(...window.brands[brandHash].markers);
      window.brands[brandHash].visible = status;
    }
  });
  if (status) {
    window.clusterer.addMarkers(markers);
  } else {
    window.clusterer.removeMarkers(markers);
  }
}
