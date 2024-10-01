import React, { useEffect, useRef } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { GenBot } from "@/ui/sections/Genbot";
import { HeroSection } from "@/ui/sections/Hero";
import { motion } from "framer-motion";
import {
  LoadingProvider,
  useLoading,
} from "./context/GlobalLoadingContext.tsx";
import { smoothScroll } from "./lib/utils";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const genBotRef = useRef<HTMLDivElement>(null);
  const genBotAboutRef = useRef<HTMLDivElement>(null);

  const { loading } = useLoading();

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && genBotRef.current) {
          smoothScroll(genBotRef.current.offsetTop, 600);
        } else if (entry.isIntersecting && genBotAboutRef.current) {
          smoothScroll(genBotAboutRef.current.offsetTop, 600);
        }
      },
      { threshold: 0.95 }
    );

    const genBotObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top < 0 &&
          genBotAboutRef.current
        ) {
          smoothScroll(genBotAboutRef.current.offsetTop);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }
    if (genBotRef.current) {
      genBotObserver.observe(genBotRef.current);
    }

    return () => {
      if (heroRef.current) {
        heroObserver.unobserve(heroRef.current);
        heroObserver.disconnect();
        window.onscroll = null;
      }
      if (genBotRef.current) {
        genBotObserver.unobserve(genBotRef.current);
      }
    };
  }, []);

  return (
    <LoadingProvider>
      <React.Fragment>
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            pointerEvents: loading ? "none" : "auto",
            overflow: loading ? "hidden" : "auto",
          }}
        >
          <div className="w-1/2 h-2 bg-gray-800 rounded-sm overflow-hidden mb-4">
            <div className="h-full bg-green-500 transition-all duration-300 ease-in-out">
              Loading
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Initializing...</p>
          </div>
        </motion.div>

        <motion.div
          className="font-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <div ref={heroRef}>
            <HeroSection />
          </div>
          <div ref={genBotRef}>
            <GenBot />
          </div>
        </motion.div>
      </React.Fragment>
    </LoadingProvider>
  );
}

export default App;
