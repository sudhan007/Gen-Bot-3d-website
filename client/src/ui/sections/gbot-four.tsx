import _axios from "@/lib/_axios";
import { useInViewport } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import anime from "animejs";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const GbotFour = () => {
  const { inViewport, ref } = useInViewport();
  const { data } = useQuery({
    queryKey: ["robotfeaturesContent"],
    queryFn: async () => {
      return _axios.get(`/robotfeatures/content`);
    },
  });
  const scrollref = useRef(null);

  const [trigger, setTrigger] = useState(false);
  const [triggerone, setTriggerone] = useState(true);

  useEffect(() => {
    if (inViewport) {
      setTrigger((prev) => !prev);
    }
  }, [inViewport]);

  useEffect(() => {
    const elems = document.querySelectorAll(".dad > div > div");

    anime({
      targets: elems,
      translateY: [-100, 0],
      duration: 1400,
      easing: "easeInOutExpo",
      delay: anime.stagger(100),
    });
  }, [trigger]);

  const cardData = [
    { heading: `${data?.data?.data[0]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[1]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[2]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[3]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[4]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[5]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[6]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[7]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[8]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[9]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[10]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[11]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[12]?.title || ''}`, bottom: 1 },
    {},
    {},
  ];

  const cardDatass = [
    { heading: `${data?.data?.data[0]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[1]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[2]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[3]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[4]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[5]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[6]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[7]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[8]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[9]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[10]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[11]?.title || ''}`, bottom: 0 },
    { heading: `${data?.data?.data[12]?.title || ''}`, bottom: 1 },
  ];

  const totalImages = 160;
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refs = useRef(null);

  const { scrollYProgress } = useScroll({
    target: refs,
  });

  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest / (120 / cardData.length)),
      cardData.length
    );

    console.log(newIndex , 'clampedIndexclampedIndexclampedIndexclampedIndexclampedIndexclampedIndex')

    if(newIndex === 14  ) {
      localStorage.setItem('testfinesix' , '1')
      setTimeout(() => {
        // setTriggerone(false);
      }, 1000);
      
    }
    setVisibleIndex(newIndex - 0.9);
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 120);
    setCurrentIndex(clampedIndex);
  });

  useEffect(() => {
    const preloadedImages = [];
    for (let i = 40; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/walks/${paddedIndex}.webp`);
    }
    setImages(preloadedImages);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleDivEnter();
        }
      },
      { threshold: 0.1 }
    );

    if (scrollref.current) {
      observer.observe(scrollref.current);
    }

    return () => {
      if (scrollref.current) {
        observer.unobserve(scrollref.current);
      }
    };
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDivEnter = () => {
    console.log("Div entered the screen!");
    const values = localStorage.getItem("keyName2");
    if (values) {
      return;
    }

    localStorage.setItem("keyName2", "value");
    for (let i = 0; i < totalImages; i++) {
      setTimeout(() => {
        setCurrentIndex(i);
      }, i * 24);
    }
  };

  const handlePlzzzScrollFocus =async () => {
    let findvals = await localStorage.getItem('testfinesix');
    if (findvals === "1") {
      setTriggerone(false);
    }else{
      setTriggerone(true)
    }

    console.log("Element with id 'plzzzscrolllllllllllllllllll' is in view!");
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handlePlzzzScrollFocus();
        }
      });
    });

    const element = document.getElementById("plzzzscrolllllllllllllllllll");
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
        <div className="z-[100]" id="plzzzscrolllllllllllllllllll">
          <section>
            <div ref={refs} className={ triggerone === true ? "h-[500vh] sticky z-[1000] top-0" :  "sticky z-[1000] top-0"}>
              <div className="sticky top-0 w-full flex md:flex-row">
                <div
                  style={{ marginLeft: 200 }}
                  className="sticky top-0 flex justify-center items-center w-full h-screen"
                >
                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`G Frame ${index + 1}`}
                      className="absolute max-w-[1900px] img h-[100vh]"
                      style={{
                        opacity: index === currentIndex ? 1 : 0,
                        zIndex: index === currentIndex ? 20 : 10,
                      }}
                    />
                  ))}
                </div>

                <div
                  style={{ paddingTop: 15, paddingBottom: 15, paddingRight: 65, paddingLeft: 65 }}
                  className="w-full h-screen bg-lightbg overflow-hidden sticky top-0 hidden md:block z-[10000] paddgay"
                >
                  <div className="h-full object-cover sticky top-0 pr-[10%] rounded-r-3xl paddgaytwo">
                    <div className="sticky top-0 h-screen m-auto" ref={ref}>
                      <div className="flex flex-col items-center gap-8 dad h-full">
                        <div
                          className="flex flex-col justify-between items-end h-full"
                          style={{ marginRight: "10%" }}
                        >
                          <p style={{ color: "#2B2B2B", fontSize: 30, width: '100%', textAlign: 'center' }} className="yhhhhhhhhh">Applications of GBOT</p>
                          {cardData.map(({ heading, bottom }, index) => (
                            <>
                              {bottom === 0 ? (
                                <div
                                  key={index}
                                  className={`transition-all duration-700 ease-out fly-genbot-card flex flex-col items-center
                                    justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white
                                    ${index <= visibleIndex && heading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-negative"}`}
                                  style={{
                                    boxShadow:
                                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                                  }}
                                >
                                  <div className="w-full h-full flex flex-col p-3 bg-white rounded-xl text-[#2B2B2B] hahabot">
                                    <p
                                      style={{ fontWeight: "700", fontSize: 13, marginBottom: 0, textTransform: 'uppercase' }}
                                      className="text-lg font-normal mb-2 break-before-avoid capitalize whuuudhdbuh"
                                    >
                                      {heading}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className={`transition-all duration-700 ease-out fly-genbot-card flex flex-col items-center
                                    justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border
                                    ${index <= visibleIndex && heading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-negative"}`}
                                  style={{
                                    boxShadow:
                                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                                  }}
                                >
                                  <div className="w-full h-full flex flex-col p-3 bg-black text-[#FCD902] rounded-xl hahabot">
                                    <p
                                      style={{ fontWeight: "700", fontSize: 13, marginBottom: 0, textAlign: 'center', textTransform: 'uppercase' }}
                                      className="text-lg font-normal break-before-avoid capitalize whuuudhdbuh"
                                    >
                                      {heading}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </>
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
              position: 'relative',
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
                  className="flex flex-col justify-center items-end gap-3"
                  style={{}}
                >
                  <p style={{ color: "#2B2B2B", fontSize: 20, width: '100%', textAlign: 'center' }} className="yhhhhhhhhh">Applications of GBOT</p>
                  {cardDatass.map(({ heading, bottom }, index) => (
                    <>
                      {bottom === 0 ? (
                        <div
                          key={index}
                          className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
                          style={{
                            boxShadow:
                              "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                          }}
                        >
                          <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                            <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize" style={{ marginBottom: 0 }}>
                              {heading}
                            </h1>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-black"
                          style={{
                            boxShadow:
                              "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                          }}
                        >
                          <div className="w-full h-full flex flex-col p-3 md:p-5 bg-black rounded-xl text-[#FCD902]">
                            <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize" style={{ marginBottom: 0, textAlign: 'center' }}>
                              {heading}
                            </h1>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GbotFour;
