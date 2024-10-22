import { Navbar } from "@/ui/components/Navbar";
import { useInViewport, useScrollIntoView } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import useDisableKeyboardScroll from "./hooks/useDisableKeyScroll.tsx";
import GenBot from "./ui/sections/genbot.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  const { scrollIntoView: gotoFirst, targetRef: scrollRefOne } =
    useScrollIntoView<HTMLDivElement>({
      cancelable: false,
      duration: 700,
      onScrollFinish() {
        setSection("section1");
      },
    });

  const { scrollIntoView: gotoSecond, targetRef: scrollRefTwo } =
    useScrollIntoView<HTMLDivElement>({
      cancelable: false,
      offset: -6,
      duration: 800,
      onScrollFinish() {
        setSection("section2");
      },
    });

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
      }
    });

    return () => {
      assets.forEach((asset) => {
        if (asset.tagName === "IMG") {
          asset.removeEventListener("load", handleAssetLoad);
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
    }
  }, [loading]);

  useEffect(() => {
    if (loadedAssets >= totalAssets && totalAssets > 0) {
      window.scrollTo(0, 0);
      setLoading(false);
    }
  }, [loadedAssets, totalAssets]);

  useEffect(() => {
    if (inViewport && section === "section2") {
      if (!genBotRef.current) return;
      gotoFirst();
    }
  }, [inViewport]);

  useEffect(() => {
    if (infoInViewport && section === "section3") {
      if (!genBotAboutRef.current) return;

      gotoSecond();
    }
  }, [infoInViewport]);

  const [isMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && genBotRef.current) {
          gotoSecond();
        }
      },
      { threshold: 0.9 }
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

  useDisableKeyboardScroll();

  return (
    <div>
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

          <div className="absolute bottom-10 w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(loadedAssets / totalAssets) * 100}%` }}
            ></div>
          </div>

          <p className="text-white mt-4">
            {Math.floor((loadedAssets / totalAssets) * 100)}% Loaded
          </p>
        </motion.div>
      )}

      <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
        <Navbar {...{ loading }} />
        <div ref={ref}>
          <div ref={heroRef}>
            <div ref={scrollRefOne}>
              <HeroSection {...{ loading }} />
            </div>
          </div>
        </div>
        <div ref={genBotRef}>
          <div ref={infoRef}>
            <div ref={scrollRefTwo}>
              <GenBot onModelLoad={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
