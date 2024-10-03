import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { useInViewport } from "@mantine/hooks";
import { motion } from "framer-motion";
import {
  LoadingProvider,
  useLoading,
} from "./context/GlobalLoadingContext.tsx";
import { smoothScroll } from "./lib/utils";
import { GenBot } from "./ui/sections/genbot.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const genBotRef = useRef<HTMLDivElement>(null);
  const genBotAboutRef = useRef<HTMLDivElement>(null);

  const [section, setSection] = useState<string>("section1");

  const { ref, inViewport } = useInViewport();
  const { ref: infoRef, inViewport: infoInViewport } = useInViewport();

  const { loading } = useLoading();

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
    <LoadingProvider>
      <motion.div
        className="font-base overflow-x-hidden"
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
    </LoadingProvider>
  );
}

export default App;
