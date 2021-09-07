import { getMD5 } from '../hash.util';

export function applyClusterFilter(brandNames: string[], status: boolean): void {
  brandNames.forEach((brandName) => {
    const brandHash = getMD5(brandName);
    if (status) {
      window.clusterer.addMarkers(window.brands[brandHash].markers);
    } else {
      window.clusterer.removeMarkers(window.brands[brandHash].markers);
    }
    window.brands[brandHash].visible = status;
  });
}
