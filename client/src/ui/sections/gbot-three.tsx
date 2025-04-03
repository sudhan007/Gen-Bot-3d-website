import _axios from "@/lib/_axios";
import { useQuery } from "@tanstack/react-query";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "../components/AnimatedText";

interface Props {
  sectionVisibility: any;
  sectiorefs: any;
}

const GbotThree = ({ sectionVisibility, sectiorefs }: Props) => {
  const totalImages = 111;

  const thirdContainerOriginbot = useRef(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glowIndex, setGlowIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: thirdContainerOriginbot,
  });

  const { data } = useQuery({
    queryKey: ["humanrobotContent"],
    queryFn: async () => {
      return _axios.get(`/humanrobot/content`);
    },
  });

  const text2 = data?.data.data.content || "";

  const imageIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalImages - 1]
  );

  const textProgress = useTransform(
    scrollYProgress,
    [0.1, 1.1],
    [-1, text2.length + 79]
  );

  useEffect(() => {
    const preloadedImages = Array.from(
      { length: totalImages },
      (_, i) => `/turn/${String(i + 1).padStart(4, "0")}.webp`
    );
    setImages(preloadedImages);
  }, []);

  useMotionValueEvent(imageIndex, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);

    if (clampedIndex !== currentIndex) setCurrentIndex(clampedIndex);
  });

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="section6">
      {width > 800 ? (
        <div className="z-[100]" id="scrollrtgdss">
          <section ref={thirdContainerOriginbot}>
            <div
              className={
                sectionVisibility[6]
                  ? "h-[800vh] sticky top-0 z-[1000]"
                  : " sticky top-0 z-[1000]"
              }
              style={{ backgroundColor: "#EEEEEA" }}
              ref={(el) => (sectiorefs.current[6] = el)}
            >
              <div className="sticky top-0 w-full flex md:flex-row">
                <div className="w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 pl-[2%]">
                  <div className="ml-[5%] px-[10%] h-full z-[10000]">
                    <img
                      src="/img/gbot3d.png"
                      alt="GenBot 3D model"
                      className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4 twoimg"
                    />
                    <h4
                      className="twoone font-medium mb-8 text-3xl mt-[20px] md:text-5xl sm:text-3xl text-[#2B2B2B] textgenfi"
                      style={{
                        fontWeight: "610",
                        fontFamily: "SFpro",
                      }}
                    >
                      {data?.data.data.title}
                    </h4>
                    <div className="w-[95%]">
                      <motion.p
                        className="mt-[10px] text-3xl leading-relaxed font-normal sm:text-xl textgenfiff"
                        style={{
                          lineHeight: "40px",
                          fontSize: 26,
                          fontWeight: "400",
                          fontFamily: "SFpro",
                        }}
                      >
                        {text2.split("").map((char: any, index: any) => (
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
                    </div>
                  </div>
                </div>

                <div className="twothree w-full md:w-1/2 h-full flex justify-center items-center relative mt-5">
                  <img
                    src="/img/gbot-text2.png"
                    className="w-[600px] z-[1] dgbrdfgdezrfxgf"
                    alt=""
                  />

                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`G Frame ${index + 1}`}
                      className="absolute"
                      style={{
                        opacity: index === currentIndex ? 1 : 0,
                        zIndex: index === currentIndex ? 20 : 10,
                        maxWidth: "170%",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="font-base bg-lightbg relative z-[101]">
          <div className="sticky top-0 w-full">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="px-[5%] h-full z-[10000]">
                <img
                  src="/img/gbot3d.png"
                  alt="GenBot 3D model"
                  className="w-[110px] mt-[50%] md:w-[260px] sm:w-[200px] pb-2 twoimg"
                />
                <h4
                  className="twoone font-medium mb-4 text-3xl md:text-5xl sm:text-3xl text-[#2B2B2B]"
                  style={{
                    fontSize: 28,
                    fontWeight: "510",
                    fontFamily: "SFpro",
                  }}
                >
                  The Future Of Human- <br />
                  Robot Interaction
                  {data?.data.data.title || ""}
                </h4>
                <div className="w-[95%]">
                  <AnimatedText text={text2} />
                </div>
              </div>
            </div>

            <div
              className="w-full h-full flex justify-center items-center relative"
              style={{ alignItems: "end", justifyContent: "end", padding: 15 }}
            >
              <img
                src="/img/gbot-text2.png"
                className="w-[600px] z-[1]"
                alt=""
                style={{ width: "70%" }}
              />
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className="absolute"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 20 : 10,
                    left: 100,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GbotThree;
