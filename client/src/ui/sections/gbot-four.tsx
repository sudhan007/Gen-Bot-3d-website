import { useInViewport } from "@mantine/hooks";
import anime from "animejs";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export const GbotFour = () => {
  const { inViewport, ref } = useInViewport();

  const scrollref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: scrollref,
  //   offset: ["start end", "end start"],
  // });

  const [trigger, setTrigger] = useState(false);

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

  const [cardData] = useState([
    {
      heading: "Hazardous Environment Compatibility",
      subHeading:
        "Designed to excel in toxic and hazardous settings, Genbot ensures human safety.",
    },
    {
      heading: "Security and Privacy",
      subHeading:
        "G Bot ensures the utmost security and privacy in interactions.",
    },
    {
      heading: "AI Empowerment",
      subHeading:
        "G Bot is equipped with cutting-edge AI technology, making it a versatile and intelligent companion.",
    },
    {
      heading: "Friendly Interface",
      subHeading:
        "G Bot offers a friendly and approachable interface for easy communication and collaboration.",
    },
    {
      heading: "Adaptive Learning",
      subHeading: "G Bot continuously learns and adapts to user needs.",
    },
    { 
    },
    { 
    },
  ]);

  
  const [cardDatass] = useState([
    {
      heading: "Hazardous Environment Compatibility",
      subHeading:
        "Designed to excel in toxic and hazardous settings, Genbot ensures human safety.",
    },
    {
      heading: "Security and Privacy",
      subHeading:
        "G Bot ensures the utmost security and privacy in interactions.",
    },
    {
      heading: "AI Empowerment",
      subHeading:
        "G Bot is equipped with cutting-edge AI technology, making it a versatile and intelligent companion.",
    },
    {
      heading: "Friendly Interface",
      subHeading:
        "G Bot offers a friendly and approachable interface for easy communication and collaboration.",
    },
    {
      heading: "Adaptive Learning",
      subHeading: "G Bot continuously learns and adapts to user needs.",
    }, 
  ]);

  const totalImages = 160;
  const [isVisible, setIsVisible] = useState(false);

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
    console.log("", newIndex);
    setVisibleIndex(newIndex - .9);
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 120);
    setCurrentIndex(clampedIndex);
  });

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 40 ; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/walks/${paddedIndex}.webp`);
    }

    console.log(preloadedImages, "preloadedImages");
    setImages(preloadedImages);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const scale = useTransform(scrollYProgress, [0, 1], [0, 80]);

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

  return (
    <>
      {width > 800 ? (
        // <div ref={scrollref}>
        //   <div style={{ backgroundColor : "#EEEEEA" }}  className="font-base h-[100vh] bg-white relative z-[100]">

        //     <div style={{  marginLeft : -260 }} >
        //     {images.map((imgSrc, index) => {

        //       index = index+40

        //       console.log('ooooooooooooooo', index)

        //       return(
        //           <img
        //             key={index}
        //             src={imgSrc}
        //             alt={`G Frame ${index + 1}`}
        //             className={` absolute `}
        //             style={{
        //               opacity: index === currentIndex ? 1 : 0,
        //               zIndex: index === currentIndex ? 20 : 10,
        //               // transition: "opacity 0.3s ease-in-out",
        //             }}
        //           />
        //         )})}

        //     </div>

        //     <div className="sticky top-0 h-screen w-[90%] m-auto " ref={ref}>
        //       {/* <img
        //         src="/img/gbot-rightface.png"
        //         alt="G Bot"
        //         className="h-screen absolute "
        //       /> */}

        //       <div
        //         className="flex flex-col justify-center items-end gap-8 dad h-full"
        //         style={{
        //           opacity: 1,
        //         }}
        //       >
        //         <div className="flex flex-col justify-center items-end gap-10 " style={{ marginRight : '10%' }}>
        //           {cardData.map(({ heading, subHeading }, index) => (
        //             <div
        //               key={index}
        //               className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
        //               style={{
        //                 boxShadow:
        //                   "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
        //               }}
        //             >
        //               <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
        //                 <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize">
        //                   {heading}
        //                 </h1>

        //                 <p className="text-sm text-[#909090] leading-normal">
        //                   {subHeading}
        //                 </p>
        //               </div>
        //             </div>
        //           ))}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <div className="z-[100]">
          <section>
            <div ref={refs} className=" h-[500vh]  sticky  z-[1000] top-0">
              <div className="sticky top-0 w-full flex md:flex-row ">
                <div
                  style={{ marginLeft: 200 }}
                  className=" sticky top-0 flex justify-center items-center w-full h-screen"
                >
                  {/* Robot Images */}
                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`G Frame ${index + 1}`}
                      className={`absolute  max-w-[1900px] img h-[100vh]`}
                      style={{
                        opacity: index === currentIndex  ? 1 : 0,
                        zIndex: index === currentIndex ? 20 : 10,
                        // transition: "opacity 0.3s ease-in-out",
                      }}
                    />
                  ))}
                </div>

                <div
                  style={{ padding: 65 }}
                  className="w-full  h-screen bg-lightbg overflow-hidden sticky top-0 hidden md:block z-[10000] paddgay"
                >
                  <div className="h-full object-cover sticky top-0 py-[60px] pr-[10%] rounded-r-3xl  paddgaytwo">
                    <div className="sticky top-0 h-screen  m-auto " ref={ref}>
                      <div className="flex flex-col  items-center gap-8 dad h-full">
                        <div
                          className="flex flex-col justify-left items-end gap-10 paddgaythree"
                          style={{ marginRight: "10%" }}
                        >
                          {cardData.map(({ heading, subHeading }, index) => (
                            <div
                              key={index}
                              className={`transition-all duration-700 ease-out fly-genbot-card flex flex-col items-center 
                                      justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white 
                                      ${index <= visibleIndex && heading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-negative"}
                                `}
                              style={{
                                boxShadow:
                                  "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                              }}
                            >
                              <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B] hahabot">
                                <h1
                                  style={{ fontWeight: "700" }}
                                  className="text-lg font-normal mb-2 break-before-avoid capitalize"
                                >
                                  {heading}
                                </h1>

                                <p className="text-sm text-[#909090] leading-normal">{subHeading}</p>
                              </div>
                            </div>
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
            className="font-base h-[80vh] bg-lightbg relative z-[100]  "
            style={{
              paddingTop: 70,
              paddingBottom: 50,
              backgroundColor: "#EEEEEA",
              height: "94vh",
            }}
          >
            <div className="sticky top-0 h-screen w-[90%] m-auto " ref={ref}>
              {/* <img
                src="/img/gbot-rightface.png"
                alt="G Bot"
                className="h-screen absolute "
              /> */}
              <div
                className="  justify-center items-end gap-8 dad h-full"
                style={{
                  opacity: 1,
                }}
              >
                <div
                  className="flex flex-col justify-center items-end gap-10 "
                  style={{}}
                >
                  {cardDatass.map(({ heading, subHeading }, index) => (
                    <div
                      key={index}
                      className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
                      style={{
                        boxShadow:
                          "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                      }}
                    >
                      <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                        <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize">
                          {heading}
                        </h1>

                        <p className="text-sm text-[#909090] leading-normal">
                          {subHeading}
                        </p>
                      </div>
                    </div>
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
