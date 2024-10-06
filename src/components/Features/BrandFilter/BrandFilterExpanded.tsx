import React, { ChangeEvent, MouseEventHandler } from "react";
import { isMobile } from "../../../utils/BrowserUtil";
import BrandFilterRow from "./BrandFilterRow";
import { MdClose } from "react-icons/md";
import { brandFilterCheckedState } from "../../../states/brands/brandFilterChecked";
import { useRecoilState } from "recoil";
import { MarkerService } from "../../../utils/kakaoMap/services/MarkerService";
import { Button, Checkbox } from "@mui/material";

interface BrandFilterExpandedProps {
  onMouseLeave: MouseEventHandler;
  setHover: (value: ((prevState: boolean) => boolean) | boolean) => void;
  map: kakao.maps.Map;
  clusterer: kakao.maps.MarkerClusterer;
}

function BrandFilterExpanded(
  props: BrandFilterExpandedProps,
): React.ReactElement {
  const { onMouseLeave, setHover, map, clusterer } = props;
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
    MarkerService.applyClusterFilter(
      Object.keys(window.brands),
      event.currentTarget.checked,
      map,
      clusterer,
    );
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
                map={map}
                clusterer={clusterer}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandFilterExpanded;
