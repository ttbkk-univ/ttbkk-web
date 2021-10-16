export function applyClusterFilter(brandHashList: string[], status: boolean): void {
  const markers: any[] = [];
  brandHashList.forEach((brandHash) => {
    if (window.brands[brandHash]) markers.push(...window.brands[brandHash].markers);
  });
  if (status) {
    window.clusterer.addMarkers(markers);
  } else {
    window.clusterer.removeMarkers(markers);
  }
}
