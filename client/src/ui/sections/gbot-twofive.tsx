import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Grnbotnotmis from "./grnbotnotmis";

const Twofive = () => {
  const totalImages = 300;
  const ref = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 1; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/rolls/${paddedIndex}.webp`);
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

  const sectionProgressnew = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 101 - 1]
  );

  const textImageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 0.3]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexnew, setCurrentIndexnew] = useState(0);
  const [currentIndexnews, setCurrentIndexnews] = useState(101);

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
    setCurrentIndex(clampedIndex);
  });

  useMotionValueEvent(sectionProgressnew, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 101 - 1);
    setCurrentIndexnew(clampedIndex);
    setCurrentIndexnews(101 -  clampedIndex )
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
          className="text-black font-base z-100"
        >
          <div
            className="sticky z-[1000] h-[400vh]"
            style={{ backgroundColor: "#EEEEEA" }}
            ref={ref}
          >
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              <motion.img
                src="/twoback.png"
                alt="G Bot Text"
                className="absolute z-10 img2 finfffffffffffffffff"
                style={{ scale: textImageScale , zIndex : 50 , opacity : currentIndexnews === 101 ? '1' : currentIndexnews / 100 }}
              />

              {images.map((imgSrc, index) => {
                
                console.log(  currentIndexnews , 'currentIndexcurrentIndexcurrentIndexcurrentIndex' )
                
                return(
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className="absolute max-w-[1900px] img h-[100vh]"
                  style={{
                    opacity: index === currentIndex ? currentIndexnew/100 : 0,
                    zIndex: index  ,
                  }}
                />
              )})}
            </div>
          </div>
        </section>
      ) : (
        <Grnbotnotmis />
      )}
    </>
  );
};

export default Twofive;
