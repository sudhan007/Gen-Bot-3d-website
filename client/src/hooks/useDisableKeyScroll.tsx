import { useEffect } from "react";

const useDisableKeyboardScroll = () => {
  useEffect(() => {
    const preventScrollKeys = (e: any) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ]; // spacebar as " "
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, []);
};

export default useDisableKeyboardScroll;
