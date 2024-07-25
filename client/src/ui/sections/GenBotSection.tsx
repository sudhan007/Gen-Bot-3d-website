import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const GenBotSection = () => {
  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(0);

  const sectionProgress = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const textScale = useTransform(sectionProgress, [0, 1], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.4], [1, 0.1]);

  const robotScale = useTransform(sectionProgress, [0, 1], [2, 7]);
  const robotZ = useTransform(sectionProgress, [0, 1], [0, 70]);

  return (
    <div className="bg-lightbg text-white font-base h-[600vh]">
      <motion.img
        src="/img/genbot-text.svg"
        className="w-[600px] fixed top-[15%] left-[40%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: textScale,
          opacity: textOpacity,
          zIndex: 10,
          display: visibility,
        }}
      />
      <motion.img
        src="/img/genbot-img.png"
        className="h-[100px] w-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: robotScale,
          z: robotZ,
          display: visibility,
        }}
      />
    </div>
  );
};

export default GenBotSection;
