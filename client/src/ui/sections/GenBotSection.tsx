import { motion, useScroll, useTransform } from "framer-motion";

export const GenBotSection = () => {
  const { scrollYProgress } = useScroll();

  const sectionProgress = useTransform(scrollYProgress, [0.05, 1], [0, 1]);

  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  const textScale = useTransform(sectionProgress, [0, 0.7], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.3], [1, 0]);

  const robotScale = useTransform(sectionProgress, [0, 0.4], [2.5, 6]);
  const robotOpacity = useTransform(sectionProgress, [0, 1], [0.7, 1]);
  const robotZ = useTransform(sectionProgress, [0, 1], [0, 70]);

  return (
    <div className="bg-lightbg text-white font-base h-[500vh]">
      <motion.img
        src="/img/genbot-text.svg"
        className="w-[600px] fixed top-[15%] left-[35%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: textScale,
          opacity: textOpacity,
          zIndex: 10,
          display: visibility,
        }}
      />
      <motion.img
        src="/img/genbot-img.png"
        className="h-[100px] w-auto fixed top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: robotScale,
          opacity: robotOpacity,
          z: robotZ,
          display: visibility,
        }}
      />
    </div>
  );
};

export default GenBotSection;
