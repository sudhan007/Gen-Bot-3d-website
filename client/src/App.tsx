import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { GenBot } from "@/ui/sections/Genbot";
import { HeroSection } from "@/ui/sections/Hero";
import { motion } from "framer-motion";
import GlobalLoadingContext from "./context/GlobalLoadingContext";

function App() {
  const [progress, setProgress] = useState(0);
  const heroRef = useRef(null);
  const genBotRef = useRef<HTMLDivElement>(null);
  const exp = useRef<HTMLDivElement>(null);
  const genBotAboutRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  const smoothScroll = (end: number, duration = 700) => {
    const start = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, end - start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && genBotRef.current) {
          smoothScroll(genBotRef.current.offsetTop);
        }
      },
      { threshold: 0.9 }
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

    const expob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }
    if (exp.current) {
      expob.observe(exp.current);
    }

    if (genBotRef.current) {
      genBotObserver.observe(genBotRef.current);
    }

    return () => {
      if (heroRef.current) {
        heroObserver.unobserve(heroRef.current);
      }
      if (genBotRef.current) {
        genBotObserver.unobserve(genBotRef.current);
      }
      if (exp.current) {
        expob.unobserve(exp.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 100);
        }
        return Math.min(prevProgress + 10, 100);
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <GlobalLoadingContext.Provider value={{ loading, setLoading }}>
      <React.Fragment>
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black text-white z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            pointerEvents: loading ? "none" : "auto",
            overflow: loading ? "hidden" : "auto",
          }}
        >
          <div className="w-1/2 h-2 bg-gray-800 rounded-sm overflow-hidden mb-4">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Initializing...</p>
            <p className="text-sm">{progress}%</p>
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
    </GlobalLoadingContext.Provider>
  );
}

export default App;
