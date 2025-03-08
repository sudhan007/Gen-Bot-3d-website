import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Grnbotnotmis from "./grnbotnotmis";

const GbotTwo = () => {
  const totalImages = 238;
  const ref = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 1; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/gbot/${paddedIndex}.webp`);
    }
    setImages(preloadedImages);
  }, [totalImages]);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const sectionProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalImages - 1]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
    setCurrentIndex(clampedIndex);
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (
        <section
          style={{ backgroundColor: "#EEEEEA" }}
          className="  text-black font-base z-100"
        >
          <div
            className=" sticky z-[1000] h-[800vh]"
            style={{ backgroundColor: "#EEEEEA" }}
            ref={ref}
          >
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              {/* G Bot Text */}
              <img
                src="/img/gbot-text.png"
                alt="G Bot Text"
                className="absolute z-10 img2 transform"
              />

              {/* Robot Images */}
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className={`absolute  max-w-[1900px] img h-[100vh]`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 20 : 10,
                    // transition: "opacity 0.3s ease-in-out",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Grnbotnotmis />
      )}
    </>
  );
};

export default GbotTwo;
