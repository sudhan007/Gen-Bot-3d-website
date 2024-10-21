import { Navbar } from "@/ui/components/Navbar";
import { useInViewport, useScrollIntoView } from "@mantine/hooks";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import useDisableKeyboardScroll from "./hooks/useDisableKeyScroll.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

const GenBot = React.lazy(() => import("./ui/sections/genbot.tsx"));

function App() {
  const [section, setSection] = useState<string>("section1");
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const genBotRef = useRef<HTMLDivElement>(null);

  const { scrollIntoView: goToSecond, targetRef: secondRef } =
    useScrollIntoView<HTMLDivElement>({
      cancelable: false,
      offset: 2,
      duration: 1000,
      onScrollFinish() {
        setSection("section2");
        console.log("section2");
      },
    });

  const { scrollIntoView: gotoFirst, targetRef: firstRef } =
    useScrollIntoView<HTMLDivElement>({
      cancelable: false,
      onScrollFinish() {
        setSection("section1");
        console.log("section1");
      },
    });

  useEffect(() => {
    const assets = document.querySelectorAll("img, video");
    setTotalAssets(assets.length);

    assets.forEach((asset: any) => {
      if (asset.tagName === "IMG") {
        asset.addEventListener("load", handleAssetLoad);

        if (asset.complete) {
          handleAssetLoad();
        }
      } else if (asset.tagName === "VIDEO") {
        asset.setAttribute("preload", "auto");

        asset.addEventListener("canplaythrough", handleVideoLoad);

        if (asset.readyState >= 4) {
          handleVideoLoad();
        }
      }
    });

    return () => {
      assets.forEach((asset) => {
        if (asset.tagName === "IMG") {
          asset.removeEventListener("load", handleAssetLoad);
        } else if (asset.tagName === "VIDEO") {
          asset.removeEventListener("canplaythrough", handleVideoLoad);
        }
      });
    };
  }, []);

  const handleAssetLoad = () => {
    setLoadedAssets((prev) => prev + 1);
  };

  const handleVideoLoad = () => {
    setLoadedAssets((prev) => prev + 1);
    setVideoLoaded(true);
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loadedAssets >= totalAssets && totalAssets > 0 && videoLoaded) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setLoading(false);
      }, 3000);
    }
  }, [loadedAssets, totalAssets, videoLoaded]);

  const [isMobile] = useState(window.innerWidth < 768);

  useDisableKeyboardScroll();

  const { ref, inViewport } = useInViewport();
  const { ref: infoRef } = useInViewport();

  useEffect(() => {
    if (inViewport && section === "section2") {
      if (!genBotRef.current) return;
      gotoFirst();
    }
  }, [inViewport]);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && genBotRef.current) {
          goToSecond();
        }
      },
      { threshold: 0.97 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        heroObserver.unobserve(heroRef.current);
        heroObserver.disconnect();
        window.onscroll = null;
      }
    };
  }, []);

  return (
    <div
      onContextMenu={() => {
        // e.preventDefault();
        // return false;
      }}
    >
      {loading && (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="loader"></span>
          </div>
        </motion.div>
      )}

      <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
        <Navbar {...{ loading }} />
        <div ref={firstRef}>
          <div ref={ref}>
            <div ref={heroRef}>
              <HeroSection {...{ loading }} />
            </div>
          </div>
        </div>
        <div ref={secondRef}>
          <div ref={infoRef}>
            <div ref={genBotRef}>
              <Suspense fallback={<div>Loading...</div>}>
                <GenBot onModelLoad={() => {}} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
