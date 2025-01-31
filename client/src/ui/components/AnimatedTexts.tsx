import { useInViewport } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTexts = ({ text }: { text: string }) => {
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

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (
        <motion.p
          ref={textRef}
          className="mt-[10px] text-[calc(0.6rem+1vw)] font-sfpro font-semibold text-[#2B2B2B] onetwo"
          style={{
            lineHeight: "40px",
            fontSize: 26,
            fontWeight: "400",  fontFamily : "SFpro"
          }}
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
      ) : (
        <motion.p
          ref={textRef}
          className="  text-[calc(0.6rem+1vw)] font-sfpro font-semibold text-[#2B2B2B] onetwo"
          style={{
            lineHeight: "25px",
            fontSize: 16,
            fontWeight: "400", fontFamily : "SFpro"
          }}
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
      )}
    </>
  );
};
