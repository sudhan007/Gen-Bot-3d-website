import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { useInViewport } from "@mantine/hooks";
import React from "react";
import { smoothScroll } from "./lib/utils.tsx";
import { GenBot } from "./ui/sections/genbot.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const genBotRef = useRef<HTMLDivElement>(null);
  const genBotAboutRef = useRef<HTMLDivElement>(null);

  const [section, setSection] = useState<string>("section1");

  const { ref, inViewport } = useInViewport();
  const { ref: infoRef, inViewport: infoInViewport } = useInViewport();

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
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
      loading;
    }
  }, [loading]);

  useEffect(() => {
    if (loadedAssets >= totalAssets && totalAssets > 0 && videoLoaded) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setLoading(false);
      }, 1000);
    }
  }, [loadedAssets, totalAssets, videoLoaded]);

  useEffect(() => {
    if (inViewport && section == "section2") {
      if (!genBotRef.current) return;
      smoothScroll(0, 600, () => {
        setSection("section2");
      });
    }
  }, [inViewport]);

  useEffect(() => {
    if (infoInViewport && section == "section3") {
      if (!genBotAboutRef.current) return;
      smoothScroll(genBotAboutRef?.current?.offsetTop, 600, () => {
        setSection("section2");
      });
    }
  }, [infoInViewport]);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && genBotRef.current) {
          smoothScroll(genBotRef.current.offsetTop + 100, 600, () => {
            setSection("section2");
          });
          setSection("section2");
        }
      },
      { threshold: 0.95 }
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
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <div ref={heroRef}>
          <div ref={ref}>
            <HeroSection />
          </div>
        </div>
        <div ref={genBotRef}>
          <div ref={infoRef}>
            <GenBot />
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default App;
