import { useInViewport } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedText = ({ text }: { text: string }) => {
  const [glowIndex, setGlowIndex] = useState(0);

  // Using useInViewport to detect when text is in the viewport
  const { inViewport, ref: textRef } = useInViewport();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only start the animation when the text is in the viewport
    if (inViewport) {
      // Reset the glow index when the text comes into view
      setGlowIndex(0);

      // Start the interval to update the glowIndex
      interval = setInterval(() => {
        setGlowIndex((prev) => {
          if (prev < text.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 30);
    }

    // Clear the interval when the component unmounts or goes out of view
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inViewport, text.length]); // Restart effect when inViewport or text changes

  return (
    <motion.p
      ref={textRef} // Attach ref to monitor the viewport
      className="mt-[10px] text-4xl leading-relaxed font-normal sm:text-2xl"
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
