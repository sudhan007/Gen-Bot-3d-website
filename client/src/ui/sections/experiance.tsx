import _axios from "@/lib/_axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface Props {
  sectionVisibility: any;
  sectiorefs: any;
}

export const Experience = ({ sectiorefs }: Props) => {
  const totalImages = 250;
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const mobileRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    if (width <= 800) {
      let mobileInterval: any = null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileIndex(0);

            mobileInterval = setInterval(() => {
              setMobileIndex((prev) => {
                if (prev + 1 >= totalImages) {
                  clearInterval(mobileInterval);
                  return totalImages - 1;
                }
                return prev + 1;
              });
            }, 20);
          } else {
            clearInterval(mobileInterval);
          }
        },
        { threshold: 0.1 }
      );

      if (mobileRef.current) {
        observer.observe(mobileRef.current);
      }

      return () => {
        clearInterval(mobileInterval);
        observer.disconnect();
      };
    }
  }, [totalImages]);

  useEffect(() => {
    const preloadedImages = Array.from(
      { length: totalImages },
      (_, i) => `/bottom/${String(i + 1).padStart(4, "0")}.webp`
    );
    setImages(preloadedImages);
  }, [totalImages]);

  const { data } = useQuery({
    queryKey: ["futuretechContent"],
    queryFn: async () => {
      return _axios.get(`/futuretech/content`);
    },
  });

  const content = data?.data.data.title || "";
  const words = content.split(" ");

  const firstWord = words[0] + " " + words[1] || "";
  const lastWord =
    words[words.length - 2] + " " + words[words.length - 1] || "";

  useEffect(() => {
    if (width > 800) {
      let interval: any = null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentIndex(0);

            interval = setInterval(() => {
              setCurrentIndex((prevIndex) => {
                if (prevIndex + 1 >= totalImages) {
                  clearInterval(interval);
                  return totalImages - 1;
                }
                return prevIndex + 1;
              });
            }, 30);
          } else {
            clearInterval(interval);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(sectiorefs.current[8]);

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }
  }, [sectiorefs, totalImages]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {width > 800 ? (
        <div
          className="z-[100]"
          style={{ backgroundColor: "#525652", paddingTop: 40 }}
          id="thisisfinallll"
        >
          <section ref={containerRef}>
            <div
              id="section8"
              className={`${"h-screen sticky z-[1000] top-0 "}`}
              ref={(el) => (sectiorefs.current[8] = el)}
            >
              <div className="sticky top-0 w-full">
                <div className="px-[5%]">
                  <div className="mt-[30px] flex justify-between">
                    <p className="threeone text-white text-[50px] font-[400] font-['AktivGrotesk'] findthewayss">
                      {firstWord}{" "}
                      <span className="text-[#FCD902]">{lastWord}</span>
                    </p>
                    <div className="bg-[#FCD902] flex items-center justify-center px-24 py-4 expppppp">
                      <p
                        className="text-black text-[1.6rem] threetwo"
                        style={{ fontFamily: "AktivGrotesk" }}
                      >
                        WHAT'S THE HOLD!
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 text-white text-[28px] font-[400] w-2/3 font-['AktivGrotesk'] uppercase uppercaseok">
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
                        maxWidth: "100%",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section
          className="bg-white text-black font-base z-100"
          ref={containerRef}
        >
          <div
            className="sticky z-[1000] top-0"
            style={{
              backgroundColor: "#424741",
              overflow: "hidden",
              paddingTop: 50,
            }}
            ref={mobileRef}
          >
            <div className="sticky top-0 w-full">
              <div className="px-[5%] text-center">
                <p className="threeone text-white text-[24px] font-[400] font-['AktivGrotesk']">
                  {firstWord} <span className="text-[#FCD902]">{lastWord}</span>
                </p>

                <p className="text-white text-[15px] font-[400] font-['AktivGrotesk'] mt-3">
                  {data?.data.data.content}
                </p>

                <div className="bg-[#FCD902] flex items-center justify-center mt-5 px-10 py-2 w-[63%] mx-auto">
                  <p className="text-black text-[15px] threetwo uppercase">
                    WHAT'S THE HOLD!
                  </p>
                </div>
              </div>

              <div className="sticky top-0 flex justify-center items-center h-[29vh]">
                {images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Frame ${index + 1}`}
                    className="absolute"
                    style={{
                      opacity: index === mobileIndex ? 1 : 0,
                      zIndex: index === mobileIndex ? 20 : 10,
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

export default Experience;
