import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      setScrollDir(window.scrollY > lastScrollY ? "down" : "up");
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
};

export default useScrollDirection;
