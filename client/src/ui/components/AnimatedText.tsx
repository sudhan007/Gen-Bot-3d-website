import { useInViewport } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedText = ({ text }: { text: string }) => {
  const [glowIndex, setGlowIndex] = useState(0);

  const { inViewport, ref: textRef } = useInViewport();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (inViewport) {
      setGlowIndex(0);

      interval = setInterval(() => {
        setGlowIndex((prev) => {
          if (prev < text.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 30);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inViewport, text.length]);

  return (
    <motion.p
      ref={textRef}
      className="mt-[10px] text-xl leading-relaxed font-normal sm:text-2xl"
    >
      {text.split("").map((char: string, index: number) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.01 }}
          animate={{ opacity: index <= glowIndex ? 1 : 0.2 }}
          transition={{ duration: 0.3 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};
