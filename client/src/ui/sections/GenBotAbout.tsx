import GenBotRotateVideo from "@/assets/videos/genbot-rotate.mp4";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GlowUpText = ({ text }: { text: string }) => {
  const [glowIndex, setGlowIndex] = useState(-1);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.5,
    margin: "-100px 0px -100px 0px",
  });

  useEffect(() => {
    if (isInView) {
      setGlowIndex(-1);
      let index = -1;
      const intervalId = setInterval(() => {
        if (index < text.length - 1) {
          index++;
          setGlowIndex(index);
        } else {
          clearInterval(intervalId);
        }
      }, 40);
      return () => clearInterval(intervalId);
    } else {
      setGlowIndex(-1);
    }
  }, [isInView, text]);

  return (
    <motion.p
      ref={containerRef}
      className="mt-[10px] text-3xl leading-relaxed font-normal"
    >
      {text.split("").map((char: string, index: number) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.01 }}
          animate={{ opacity: index <= glowIndex ? 1 : 0.1 }}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const GenBotAbout = () => {
  const containerRef: any = useRef(null);
  const videoRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // const isInView = useInView(containerRef, {
  //   once: false,
  //   amount: 0.3,
  //   margin: "-100px 0px -100px 0px",
  // });

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > window.innerHeight) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative">
      <div ref={containerRef} className="font-base h-[300vh] relative bg-white">
        <div className="sticky top-0 h-screen w-full flex">
          <div className="bg-white w-1/2 h-screen z-[300] flex flex-col justify-start items-start gap-4">
            <div className="mx-[10%]">
              <img
                src="/img/bot3d.svg"
                alt="GenBot 3D model"
                className="w-[200px] mt-[30%]"
              />
              <h4 className="font-medium text-7xl mt-[20px]">
                Your Safety Partner
              </h4>
              <GlowUpText text="Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions." />
            </div>
          </div>
          <div className="bg-darkbg w-1/2 h-screen relative overflow-hidden">
            <video
              ref={videoRef}
              src={GenBotRotateVideo}
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
