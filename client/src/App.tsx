import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import React from "react";
import { GenBot } from "./ui/sections/genbot.tsx";
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
        asset.addEventListener("loadeddata", handleAssetLoad);
        asset.addEventListener("loadeddata", () => {
          setVideoLoaded(true); // Set video loaded when it's ready
        });
        if (asset.readyState >= 3) {
          handleAssetLoad();
          setVideoLoaded(true);
        }
      }
    });

    return () => {
      assets.forEach((asset) => {
        if (asset.tagName === "IMG") {
          asset.removeEventListener("load", handleAssetLoad);
        } else if (asset.tagName === "VIDEO") {
          asset.removeEventListener("loadeddata", handleAssetLoad);
        }
      });
    };
  }, []);

  const handleAssetLoad = () => {
    setLoadedAssets((prev) => prev + 1);
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading"); // Disable scroll while loading
    } else {
      document.body.classList.remove("loading"); // Re-enable scroll after loading
    }
  }, [loading]);

  useEffect(() => {
    if (loadedAssets >= totalAssets && totalAssets > 0 && videoLoaded) {
      // Adding a small delay to ensure smooth transition
      setTimeout(() => {
        window.scrollTo(0, 0); // Reset scroll to top
        setLoading(false); // Set loading to false after delay
      }, 1000); // 1 second delay for smoother experience
    }
  }, [loadedAssets, totalAssets, videoLoaded]);

  return (
    <React.Fragment>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]">
          <h2 className="text-white text-3xl font-bold mb-6 animate-pulse">
            Loading...{" "}
            {Math.min(Math.round((loadedAssets / totalAssets) * 100), 100)}%
          </h2>

          <div className="w-3/4 md:w-1/2 h-3 bg-gray-600 rounded-full overflow-hidden shadow-md">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(loadedAssets / totalAssets) * 100}%` }}
            ></div>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <HeroSection />
        <GenBot />
      </motion.div>
    </React.Fragment>
  );
}

export default App;
