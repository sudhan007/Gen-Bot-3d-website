import _axios from "@/lib/_axios";
import { useQuery } from "@tanstack/react-query";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Experience = () => {
  const totalImages = 250;
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexval, setCurrentIndexval] = useState(0);
  const containerRef = useRef(null);

  // Initialize scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Maps full section scroll to animation
  });

  // Map scroll progress to image index
  const imageIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalImages - 1]
  );

  // Preload images on mount
  useEffect(() => {
    const preloadedImages = Array.from(
      { length: totalImages },
      (_, i) => `/bottom/${String(i + 1).padStart(4, "0")}.webp`
    );
    setImages(preloadedImages);
  }, []);
  const { data } = useQuery({
    queryKey: ["futuretechContent"],
    queryFn: async () => {
      return _axios.get(`/futuretech/content`);
    },
  });
  console.log(data?.data.data)
  const content = data?.data.data.title || "";
  const words = content.split(" ");

  const firstWord = words[0]+" "+words[1] || "";
  const lastWord =words[words.length - 2]+" "+ words[words.length - 1] || "";

  // Update currentIndex based on scroll progress (throttled)
  useMotionValueEvent(imageIndex, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex) 
    };
    if (clampedIndex !== currentIndexval) { 
      setCurrentIndexval(clampedIndex+100)
    };
  });

  // Handle responsive width
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (


        <div className="z-[100]" style={{ backgroundColor: "#525652", paddingTop: 40 }}>
          <section ref={containerRef}>
            <div className=" h-[700vh]  sticky  z-[1000] top-0">
              <div className="sticky top-0 w-full ">
                <div className="px-[5%]">
                  <div className="mt-[30px] flex justify-between">
                    <p className="threeone text-white text-[50px] font-[400] font-['AktivGrotesk']  findthewayss">
                      {firstWord}{" "}
                      <span className="text-[#FCD902]">{lastWord}</span>
                    </p>
                    <div className="bg-[#FCD902] flex items-center justify-center px-24 py-4 expppppp">
                      <p className="text-black text-[1.6rem] threetwo" style={{ fontFamily : 'AktivGrotesk' }} >
                        WHAT'S THE HOLD
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 text-white text-[28px] font-[400] w-2/3  font-['AktivGrotesk'] uppercase   uppercaseok ">
                    {/* Explore the innovative solutions of Genbot and G Bot.
                    <br />
                    Embrace the future of technology and human-robot
                    <br />
                    interaction. Begin your journey to safer, more
                    <br />
                    efficient, and tech-driven possibilities today. */}
                    {data?.data.data.content}
                  </div>
                </div>

                <div
                  className="sticky top-0 flex justify-center items-center w-full h-screen fgnfrthdfx"
                  style={{ marginTop: -320 }}
                >
                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Frame ${index + 1}`}
                      className="absolute macccc"
                      style={{
                        opacity: index === currentIndex ? 1 : 0,
                        zIndex: index === currentIndex ? 20 : 10,
                         maxWidth : '100%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>




      ) : (
        <section className="bg-white text-black font-base z-100  " ref={containerRef} >
          <div 
            className="  sticky  z-[1000] top-0 "
            style={{ backgroundColor: "#424741", overflow: "hidden", paddingTop: 50 }}
          >
            <div className="sticky top-0 w-full">
              <div className="px-[5%] text-center">
                <p className="threeone text-white text-[24px] font-[400] font-['AktivGrotesk']">
                  EXPERIENCE THE <br />
                  <span className="text-[#FCD902]">FUTURE TODAY</span>
                </p>

                <p className="text-white text-[15px] font-[400] font-['AktivGrotesk'] mt-3">
                  Explore the innovative solutions of Genbot and G Bot. Embrace
                  the future of technology and human-robot interaction. Begin your
                  journey to safer, more efficient, and tech-driven possibilities
                  today.
                </p>

                <div className="bg-[#FCD902] flex items-center justify-center mt-5 px-10 py-2 w-[50%] mx-auto">
                  <p className="text-black text-[15px] threetwo uppercase">
                    WHAT'S THE HOLD
                  </p>
                </div>
              </div>

              <div className="sticky top-0 flex justify-center items-center h-[32vh]">
                {images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Frame ${index + 1}`}
                    className="absolute"
                    style={{
                      opacity: index === currentIndexval ? 1 : 0,
                      zIndex: index === currentIndexval ? 20 : 10,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
