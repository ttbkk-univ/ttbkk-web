import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";

type Props = {
  map: kakao.maps.Map;
};
function ShareMapButton({ map }: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 70, left: 10 }}>
      <Button
        size={"small"}
        title={"위치 공유"}
        variant={"contained"}
        color={"primary"}
        onClick={(): void => {
          const searchParam = new URLSearchParams();
          const center = map.getCenter();
          searchParam.set("center", `${center.getLat()},${center.getLng()}`);
          searchParam.set("zoom", map.getLevel().toString());
          const value =
            window.location.protocol +
            "//" +
            window.location.host +
            "?" +
            searchParam.toString();
          navigator.clipboard.writeText(value).catch(console.error);
          setOpen(true);
        }}
      >
        <Snackbar
          message={"현재 위치가 클립보드에 복사되었습니다!"}
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={(): void => setOpen(false)}
          autoHideDuration={1000}
        />
        위치 공유
      </Button>
    </div>
  );
}

export default ShareMapButton;
