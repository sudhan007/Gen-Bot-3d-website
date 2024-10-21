import { Navbar } from "@/ui/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";
import useDisableKeyboardScroll from "./hooks/useDisableKeyScroll.tsx";
import GenBot from "./ui/sections/genbot.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  return (
    <div
      onContextMenu={(e: any) => {
        e.preventDefault();
        return false;
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

      <motion.div
        className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}
        transition={{ duration: 0.5 }}
      >
        <Navbar {...{ loading }} />
        <HeroSection {...{ loading }} />
        <GenBot onModelLoad={() => {}} />
      </motion.div>
    </div>
  );
}

export default App;
