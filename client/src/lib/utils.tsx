import { useQuery } from "@tanstack/react-query";
import _axios from "./_axios";

const linear = (t: number, b: number, c: number, d: number) => {
  return (c * t) / d + b;
};

export const smoothScroll = (
  end: number,
  duration = 1000,
  callback?: () => void
) => {
  const isMobile = /android|iphone|ipad/i.test(navigator.userAgent);
  const isDesktop = !isMobile;

  duration = 600;
  if (!isMobile && !isDesktop) {
    const start = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = linear(timeElapsed, start, end - start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
    if (callback) callback();
  } else {
    if (callback) callback();
  }
};

export const fetchVideoAsBase64 = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


export const genbotIntro =
  "Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions.";
