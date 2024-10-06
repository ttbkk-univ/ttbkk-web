import React, { ChangeEvent, MouseEventHandler } from "react";
import { isMobile } from "@/utils/BrowserUtil.ts";
import BrandFilterRow from "./BrandFilterRow";
import { MdClose } from "react-icons/md";
import { brandFilterCheckedState } from "@/states/brands/brandFilterChecked.ts";
import { useRecoilState } from "recoil";
import { Button, Checkbox } from "@mui/material";
import useMap from "@/hooks/useMap.ts";
import useMapClusterer from "@/hooks/useMapClusterer.ts";
import useZoomLevel from "@/hooks/useZoomLevel.ts";

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
  setHover: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

function BrandFilterExpanded(
  props: BrandFilterExpandedProps,
): React.ReactElement {
  const map = useMap();
  const mapClusterer = useMapClusterer();
  const { level, clusterMinLevel } = useZoomLevel();

  function applyClusterFilter(brandHashList: string[], status: boolean): void {
    const markers: kakao.maps.Marker[] = [];
    brandHashList.forEach((brandHash: string) => {
      if (window.brands[brandHash])
        markers.push(...window.brands[brandHash].markers);
    });
    brandHashList.forEach(
      (brandHash: string) =>
        clusterMinLevel > level &&
        window.brands[brandHash]?.nameOverlays.map((nameOverlay) =>
          nameOverlay.setMap(status ? map : null),
        ),
    );
    if (status) {
      mapClusterer.addMarkers(markers);
    } else {
      mapClusterer.removeMarkers(markers);
    }
  }

  const { onMouseLeave, setHover } = props;
  const [brandFilterChecked, setBrandFilterChecked] = useRecoilState(
    brandFilterCheckedState,
  );

  const filterAllBrand = (event: ChangeEvent<HTMLInputElement>): void => {
    setBrandFilterChecked(
      Object.fromEntries(
        Object.entries(brandFilterChecked).map(
          ([brandName]: [string, boolean]) => [
            brandName,
            event.currentTarget.checked,
          ],
        ),
      ),
    );
    applyClusterFilter(Object.keys(window.brands), event.currentTarget.checked);
    Object.keys(window.brands).forEach((brandId) => {
      window.brands[brandId].visible = event.currentTarget.checked;
    });
  };

  return (
    <>
      {window.brands && (
        <div
          onMouseLeave={onMouseLeave}
          style={{
            right: 120,
            padding: 12,
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            float: "right",
            backgroundColor: "white",
            minWidth: 200,
          }}
        >
          <div>
            <label key="all" style={{ height: 32, fontSize: "small" }}>
              <Checkbox
                checked={brandFilterChecked["all"]}
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                  filterAllBrand(event)
                }
              />
              전체
            </label>
            {isMobile() && (
              <Button
                style={{ float: "right" }}
                onClick={(): void => setHover(false)}
                variant={"contained"}
                color={"secondary"}
                size={"large"}
              >
                <MdClose />
              </Button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: isMobile() ? 300 : 500,
              overflowY: "scroll",
            }}
          >
            {Object.entries(window.brands).map(([key, brand]) => (
              <BrandFilterRow
                key={key}
                brand={brand}
                applyClusterFilter={applyClusterFilter}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
