import { useEffect, useState } from "react";
import { isServer } from "../../utils/utils";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (isServer()) return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
