import { getMD5 } from '../hash.util';

export function applyClusterFilter(brandNames: string[], status: boolean): void {
  const markers: any[] = [];
  console.log(brandNames, status);
  brandNames.forEach((brandName) => {
    const brandHash = getMD5(brandName);
    markers.push(...window.brands[brandHash].markers);
    window.brands[brandHash].visible = status;
  });
  if (status) {
    window.clusterer.addMarkers(markers);
  } else {
    window.clusterer.removeMarkers(markers);
  }
}
