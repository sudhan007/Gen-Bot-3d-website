import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { useInViewport, useViewportSize } from "@mantine/hooks";
import React from "react";
import { smoothScroll } from "./lib/utils.tsx";
import { GenBot } from "./ui/sections/genbot.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { width } = useViewportSize();

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
      }, 4500);
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
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-lg font-bold mb-4">
              Initializing...
            </h1>
            <span className="loader"></span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: !loading ? 0 : 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-br from-gray-800 to-gray-900 z-[999999]"
        style={{ transformOrigin: "left" }}
      ></motion.div>

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: !loading ? 0 : 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-br from-gray-800 to-gray-900 z-[999999]"
        style={{ transformOrigin: "right" }}
      ></motion.div>

      <motion.div>
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
