import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Grnbotnotmis from "./grnbotnotmis";

interface Props {
  sectionVisibility: any;
  sectiorefs: any;
}

const GbotTwo = ({ sectionVisibility, sectiorefs }: Props) => {
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
    <div id="section5">
      {width > 1120 ? (
        <section
          style={{ backgroundColor: "#EEEEEA" }}
          className="text-black font-base z-100"
          id="thisisseventhid"
        >
          <div
            className={
              sectionVisibility[5]
                ? "sticky z-[1000] h-[800vh]"
                : "sticky z-[1000] h-[-webkit-fill-available]"
            }
            style={{ backgroundColor: "#EEEEEA" }}
            ref={(el: any) => {
              ref.current = el;
              sectiorefs.current[5] = el;
            }}
          >
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              <p
                style={{
                  width: "100%",
                  color: "#2B2B2B",
                  textAlign: "center",
                  fontSize: 48,
                  marginBottom: 50,
                  alignItems: "baseline",
                  height: "100vh",
                  justifyContent: "left",
                  display: "flex",
                  marginTop: "23vh",
                  paddingLeft: "15%",
                }}
                className="dhgiudiu finffffffffffffff font-sfpro uppercase font-bold leading-loose tracking-[12px]"
              >
                Introducing
              </p>
              <img
                src="/img/gbot-text.png"
                alt="G Bot Text"
                className="absolute z-10 img2 transform"
              />

              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className={`absolute w-full img h-[100vh] object-cover`}
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
    </div>
  );
};

export default GbotTwo;
