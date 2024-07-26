import React, { useEffect, useRef } from "react";
import "./App.css";

import { Navbar } from "@/ui/components/Navbar";
import { GenBotAbout } from "@/ui/sections/GenBotAbout";
import { GenBotSection } from "@/ui/sections/GenBotSection";
import { HeroSection } from "@/ui/sections/Hero";
import { FlyGenBotSection } from "./ui/sections/FlyGenBotSection";

function App() {
  const heroRef = useRef(null);
  const genBotRef = useRef<HTMLDivElement>(null);
  const genBotAboutRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
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
    };
  }, []);

  return (
    <React.Fragment>
      <div className="font-base">
        <div className="start"></div>
        <Navbar />
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <div ref={genBotRef}>
          <GenBotSection />
        </div>
        <div ref={genBotAboutRef}>
          <GenBotAbout />
        </div>
        <div>
          <FlyGenBotSection />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
