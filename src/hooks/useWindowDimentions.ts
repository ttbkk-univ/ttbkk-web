import { useEffect, useState } from "react";

function getWindowDimensions(): { width: number; height: number } {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions(): { width: number; height: number } {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

export default useWindowDimensions;
