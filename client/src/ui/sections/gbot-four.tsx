import _axios from "@/lib/_axios";
import { useInViewport } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  sectionVisibility: any;
  sectiorefs: any;
}

export const GbotFour = ({ sectionVisibility, sectiorefs }: Props) => {
  const { inViewport, ref } = useInViewport();
  const { data } = useQuery({
    queryKey: ["robotfeaturesContent"],
    queryFn: async () => {
      return _axios.get(`/robotfeatures/content`);
    },
  });
  const scrollref = useRef(null);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (inViewport) {
      setTrigger((prev) => !prev);
    }
  }, [inViewport]);

  const cardData = [
    { heading: `${data?.data?.data[0]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[1]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[2]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[3]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[4]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[5]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[6]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[7]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[8]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[9]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[10]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[11]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[12]?.title || ""}`, bottom: 1 },
    {},
    {},
  ];

  const cardDatass = [
    { heading: `${data?.data?.data[0]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[1]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[2]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[3]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[4]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[5]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[6]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[7]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[8]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[9]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[10]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[11]?.title || ""}`, bottom: 0 },
    { heading: `${data?.data?.data[12]?.title || ""}`, bottom: 1 },
  ];

  const totalImages = 160;
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refs = useRef(null);

  const { scrollYProgress } = useScroll({
    target: refs,
  });

  const sectionProgress = useTransform(scrollYProgress, [0, 1], [20, 140]);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest / (140 / cardData.length)),
      cardData.length
    );

    setVisibleIndex(newIndex - 0.4);
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 120);
    setCurrentIndex(clampedIndex);
  });

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 40; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/walks/${paddedIndex}.webp`);
    }
    setImages(preloadedImages);
    setCurrentIndex(0);
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {width > 830 ? (
        <div className="z-[100]">
          <section
            ref={(el: any) => {
              refs.current = el;
              sectiorefs.current[7] = el;
            }}
            id="section7"
            className={
              sectionVisibility[7]
                ? "h-[500vh] sticky z-[1000] top-0"
                : "sticky z-[1000] top-0 h-[-webkit-fill-available]"
            }
          >
            <div className="sticky top-0 w-full flex md:flex-row">
              <div className="sticky top-0 flex justify-center items-center w-full h-screen">
                {images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`G Frame ${index + 1}`}
                    className="absolute img h-[100vh] object-cover"
                    style={{
                      opacity: index === currentIndex ? 1 : 0,
                      zIndex: index === currentIndex ? 20 : 10,
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
                className="sticky top-0 flex justify-center items-center w-full h-screen"
              >
                <div className="h-full object-cover sticky top-0 rounded-r-3xl paddgaytwo">
                  <div className="sticky top-0 h-screen m-auto" ref={ref}>
                    <div className="flex flex-col items-center gap-8 dad h-full">
                      <div
                        className="flex flex-col items-end h-full"
                        style={{ marginRight: "10%" }}
                      >
                        <p
                          style={{
                            color: "#2B2B2B",
                            width: "100%",
                            textAlign: "center",
                          }}
                          className="yhhhhhhhhh  my-6 mt-10 text-4xl font-bold"
                        >
                          Applications of GBOT
                        </p>

                        <div className="grid grid-cols-2 gap-5">
                          {cardData.map(({ heading, bottom }, index) => (
                            <React.Fragment key={index}>
                              {bottom === 0 ? (
                                <div
                                  key={index}
                                  className={`transition-all duration-700 ease-out fly-genbot-card flex flex-col items-center
                                    justify-center  w-[100%] rounded-xl border bg-white h-[70px] text-center
                                    ${
                                      index <= visibleIndex && heading
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-negative"
                                    }`}
                                  style={{
                                    boxShadow:
                                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                                  }}
                                >
                                  <div className="w-full h-full flex justify-center items-center flex-col p-3 bg-white rounded-xl text-[#2B2B2B] hahabot">
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        textTransform: "uppercase",
                                      }}
                                      className="font-normal break-before-avoid lowercase"
                                    >
                                      {heading}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className={`transition-all duration-700 ease-out fly-genbot-card flex flex-col items-center
                                    justify-center w-[100%] rounded-xl border col-span-2 h-[70px] text-center
                                    ${
                                      index <= visibleIndex && heading
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-negative"
                                    }`}
                                  style={{
                                    boxShadow:
                                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                                  }}
                                >
                                  <div className="w-full h-full flex justify-center items-center  bg-black text-[#FCD902] rounded-xl hahabot">
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        textAlign: "center",
                                      }}
                                      className="font-normal break-before-avoid capitalize"
                                    >
                                      {heading}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div ref={scrollref}>
          <div
            style={{
              backgroundColor: "#EEEEEA",
              position: "relative",
              zIndex: 100,
              paddingBottom: 50,
            }}
          >
            <div className="w-[90%] m-auto" ref={ref}>
              <div
                className="justify-center items-end dad h-full"
                style={{
                  opacity: 1,
                }}
              >
                <div
                  className="flex flex-col justify-center items-center gap-3"
                  style={{}}
                >
                  <p className="text-[2B2B2B] my-6 mt-10 font-bold text-center! text-4xl">
                    Applications of GBOT
                  </p>
                  {cardDatass.map(({ heading, bottom }, index) => (
                    <React.Fragment key={index}>
                      {bottom === 0 ? (
                        <div
                          key={index}
                          className="fly-genbot-card flex flex-col items-center p-3 justify-center w-[90%] rounded-xl border bg-white"
                          style={{
                            boxShadow:
                              "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                          }}
                        >
                          <div className="w-full h-full flex flex-col p-5 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                            <h1
                              className="text-lg font-normal mb-2 break-before-avoid capitalize"
                              style={{ marginBottom: 0 }}
                            >
                              {heading}
                            </h1>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="fly-genbot-card flex flex-col items-center p-3 justify-center w-[90%] rounded-xl border bg-black"
                          style={{
                            boxShadow:
                              "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                          }}
                        >
                          <div className="w-full h-full flex flex-col p-3 md:p-5 bg-black rounded-xl text-[#FCD902]">
                            <h1
                              className="text-lg font-normal mb-2 break-before-avoid capitalize"
                              style={{ marginBottom: 0, textAlign: "center" }}
                            >
                              {heading}
                            </h1>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GbotFour;
