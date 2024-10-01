import { useLoading } from "@/context/GlobalLoadingContext";
import { useEffect } from "react";

const useMediaLoader = (mediaRefs: any) => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (!mediaRefs || mediaRefs.length === 0) return;

    startLoading();

    const checkIfLoaded = () => {
      const allLoaded = mediaRefs.every(
        (ref: any) =>
          (ref.current.tagName === "IMG" && ref.current.complete) ||
          (ref.current.tagName === "VIDEO" && ref.current.readyState === 4)
      );
      if (allLoaded) {
        stopLoading();
      }
    };

    mediaRefs.forEach((ref: any) => {
      if (ref.current.tagName === "IMG") {
        ref.current.onload = checkIfLoaded;
        ref.current.onerror = checkIfLoaded;
      } else if (ref.current.tagName === "VIDEO") {
        ref.current.oncanplaythrough = checkIfLoaded;
        ref.current.onerror = checkIfLoaded;
      }
    });

    checkIfLoaded();

    return () => {
      mediaRefs.forEach((ref: any) => {
        if (ref.current) {
          if (ref.current.tagName === "IMG") {
            ref.current.onload = null;
          } else if (ref.current.tagName === "VIDEO") {
            ref.current.oncanplaythrough = null;
          }
        }
      });
    };
  }, [mediaRefs, startLoading, stopLoading]);
};

export default useMediaLoader;
