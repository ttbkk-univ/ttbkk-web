import React, { MouseEventHandler } from "react";
import { MdLayers } from "react-icons/md";

interface BrandFilterButtonProps {
  onMouseOver: MouseEventHandler;
}

function BrandFilterButton(props: BrandFilterButtonProps): React.ReactElement {
  const { onMouseOver } = props;
  return (
    <button
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: "white",
        height: 32,
        width: 32,
        padding: 0,
        float: "right",
        border: "none",
        borderRadius: 3,
        boxShadow: "rgb(0 0 0 / 15%) 0px 2px 2px 0px",
        cursor: "pointer",
      }}
    >
      <MdLayers size={16} />
    </button>
  );
}

export default BrandFilterButton;
