import { createHash } from 'crypto';

export function applyClusterFilter(brandNames: string[], status: boolean): void {
  brandNames.forEach((brandName) => {
    const brandHash = createHash('md5').update(brandName).digest('hex');
    if (status) {
      window.clusterer.addMarkers(window.brands[brandHash].markers);
    } else {
      window.clusterer.removeMarkers(window.brands[brandHash].markers);
    }
    window.brands[brandHash].visible = status;
  });
}
