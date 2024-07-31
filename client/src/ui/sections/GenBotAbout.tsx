import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const GenBotAbout = () => {
  const containerRef: any = useRef<HTMLDivElement>(null);
  const [text] = useState(
    "Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions."
  );

   

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [-1, text.length + 70]
  );

  const [glowIndex, setGlowIndex] = useState(-1);

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  return (
    <div className="font-base h-[500vh] bg-white" ref={containerRef}>
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

            <motion.p className="mt-[10px] text-3xl leading-relaxed font-normal">
              {text.split("").map((char: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.01 }}
                  animate={{ opacity: index <= glowIndex ? 1 : 0.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </div>

        <div className="bg-white w-1/2 h-screen z-[300] flex flex-col justify-start items-start gap-4"></div>
      </div>
    </div>
  );
};
