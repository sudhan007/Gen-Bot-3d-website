import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Grnbotnotmis from "./grnbotnotmis";

const GbotTwo = () => {
  const totalImages = 238;
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [currentIndexdata, setCurrentIndexdata] = useState(true);

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
    console.log(clampedIndex, 'sectionProgresssectionProgresssectionProgresssectionProgresssectionProgress')

    if (clampedIndex === 236 || clampedIndex === 235 || clampedIndex === 234 || clampedIndex === 233 || clampedIndex === 232) {

      setTimeout(() => {
        // setCurrentIndexdata(false);
      }, 2000);

    }
    setCurrentIndex(clampedIndex);
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThisIsEventHidFocus = async () => {

    let findvals = await localStorage.getItem('testfinefour');
    if (findvals === "1") {
      setCurrentIndexdata(false);
    } else {
      setCurrentIndexdata(true)
    }
    console.log("Element with id 'thisisseventhid' is in view!");
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleThisIsEventHidFocus();
        }
      });
    });

    const element = document.getElementById("thisisseventhid");
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
          id="thisisseventhid"
        >
          <div
            className={currentIndexdata === true ? "sticky z-[1000] h-[800vh]" : "sticky z-[1000] "}
            style={{ backgroundColor: "#EEEEEA" }}
            ref={ref}
          >
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              <p
                style={{
                  width: '100%',
                  color: '#2B2B2B',
                  textAlign: 'center',
                  fontSize: 48,
                  marginBottom: 50,
                  alignItems: 'baseline',
                  height: '100vh',
                  justifyContent: 'left',
                  display: 'flex',
                  marginTop: '23vh',
                  paddingLeft: '15%',
                }}
                className="dhgiudiu finffffffffffffff font-sfpro uppercase font-bold leading-loose tracking-[12px]"
              >
                Introducing
              </p>
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
                  className={`absolute max-w-[1900px] img h-[100vh]`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 20 : 10,
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
