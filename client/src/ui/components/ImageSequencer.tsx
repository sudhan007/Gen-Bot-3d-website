import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ImageSequence = () => {
  const [currentImage, setCurrentImage] = useState("0001000.png");
  const containerRef = useRef(null);

  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate the image index based on scroll progress
  const imageIndex = useTransform(scrollYProgress, [0, 1], [0, 1722]);

  useEffect(() => {
    // Update the image based on the scroll progress
    imageIndex.onChange((latest) => {
      const frame = Math.round(latest) + 1000; // Add 1000 to start at 0001000.png
      const formattedFrame = frame.toString().padStart(7, "0"); // Ensure it's a 7-character string (e.g., 0001000)
      setCurrentImage(`/genbot-seq/${formattedFrame}.png`);
    });
  }, [imageIndex]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <img
        src={currentImage}
        alt="Genbot Sequence"
        className="w-full h-full object-cover fixed top-0 left-0"
      />
    </div>
  );
};
