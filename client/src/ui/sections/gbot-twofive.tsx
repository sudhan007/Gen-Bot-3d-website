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
  const [checkval, setCheckval] = useState(true);

  useEffect(() => {
    const preloadedImages = [];
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

  useMotionValueEvent(sectionProgress, "change", async (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
    if (clampedIndex === 299) {
      await localStorage.setItem('testfine', '1');
    }
    setCurrentIndex(clampedIndex);
  });

  useMotionValueEvent(sectionProgressnew, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 101 - 1);
    setCurrentIndexnew(clampedIndex);
    setCurrentIndexnews(101 - clampedIndex);
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnter = async () => {
    let findvals = await localStorage.getItem('testfine');
    if (findvals === "1") {
      setCheckval(false);
    }
  };

  const handleFocus = () => {
    console.log("Div focused!");
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleFocus();
        }
      });
    });

    const element = document.getElementById("gjgjjjgjjgjgj");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <>
      {width > 800 ? (
        <section
          style={{ backgroundColor: "#EEEEEA" }}
          className="text-black font-base z-100"
          id="gjgjjjgjjgjgj"
        >
          <div
            className={checkval === true ? "sticky z-[1000] h-[400vh]" : "sticky z-[1000]"}
            style={{ backgroundColor: "#EEEEEA" }}
            ref={ref}
          >
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              <p
                style={{
                  color: '#2B2B2B',
                  textAlign: 'center',
                  fontSize: 47,
                  marginBottom: 50,
                  alignItems: 'baseline',
                  height: '100vh',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: '18vh',
                }}
              >
                Introducing
              </p>
              <motion.img
                src="/twoback.png"
                alt="G Bot Text"
                className="absolute z-10 img2 finfffffffffffffffff"
                style={{
                  scale: textImageScale,
                  zIndex: 50,
                  opacity: currentIndexnews === 101 ? '1' : currentIndexnews / 100,
                  height: '65vh',
                }}
              />
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className="absolute max-w-[1900px] img h-[74vh]"
                  style={{
                    opacity: index === currentIndex ? currentIndexnew / 100 : 0,
                    zIndex: index,
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

export default Twofive;
