import { useIntersection } from "@/hooks/useIntersection";
import anime from "animejs";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

const FlyGenBotSection = () => {
  const { entry, ref } = useIntersection({
    threshold: 0,
  });

  const refs = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: refs,
  });

  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest / (100 / cardData.length)),
      cardData.length - 1
    );
    setVisibleIndex(newIndex);
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    const clampedIndex = Math.min(Math.floor(latest), 100);
    setCurrentIndex(clampedIndex);
  });

  useEffect(() => {
    const elems = document.querySelectorAll(".cards");
    const genbotImage: any = document.querySelector(".genbot-image");

    if (elems && genbotImage) {
      genbotImage.style.opacity = 0;
      genbotImage.style.transform = "translateY(-100px)";

      elems.forEach((elem: any) => {
        elem.style.opacity = 0;
        elem.style.transform = "translateY(50px)";
      });
    }

    if (!entry?.isIntersecting) return;

    anime({
      targets: genbotImage,
      opacity: [0, 1],
      translateY: [240, 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: 200,
    });

    setTimeout(() => {
      anime({
        targets: elems[0],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 200,
      });
      anime({
        targets: elems[1],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 100,
      });
      anime({
        targets: elems[2],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 200,
      });
      anime({
        targets: elems[3],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 200,
      });
      anime({
        targets: elems[4],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 300,
      });
    }, 300);

    return () => {
      anime({
        targets: genbotImage,
        translateX: [2400, 0],
        duration: 200,
        easing: "easeOutQuad",
      });
    };
  }, [entry]);

  const cardData = [
    {
      heading: "Hazardous Environment Compatibility",
      subHeading:
        "Designed to excel in toxic and hazardous settings, Genbot ensures human safety.",
      className: `lg:top-[15%] lg:left-[13%] md:top-[10%] md:left-[5%] coolbotonoe`,
    },
    {
      heading: "Real-Time Data Analysis",
      subHeading:
        "Genbot's AI analyzes data in real-time for informed decision-making.",
      className:
        "lg:top-[7%] lg:right-[20%] md:top-[10%] md:right-[5%] coolbototwo",
    },
    {
      heading: "Advanced Sensors",
      subHeading:
        "Equipped with state-of-the-art sensors for precise and safe navigation.",
      className:
        "lg:bottom-[55%] lg:right-[12%] md:bottom-[10%] md:right-[5%] coolbotthree",
    },
    {
      heading: "Human-Robot Collaboration",
      subHeading:
        "Genbot works seamlessly alongside humans, reducing their exposure to risky conditions.",
      className:
        "lg:bottom-[45%] lg:left-[10%] md:bottom-[10%] md:left-[5%] coolbotfour",
    },
    {
      heading: "Multi-Terrain Traversal",
      subHeading:
        "Genbot's advanced tracks enable it to navigate a wide range of terrains with ease.",
      className:
        "lg:left-[60%] lg:top-[60%] md:left-[24%] md:top-[60%] coolbotofive",
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (
        <Element name="section3">
          <div className="z-[100]">
            <section ref={ref}>
              <div
                ref={refs}
                className=" h-[300vh] bg-white sticky  z-[1000] top-0"
              >
                <div
                  className="sticky top-0 w-full flex md:flex-row "
                  style={{ backgroundColor: "#EEEEEA" }}
                >
                  <section
                    style={{ backgroundColor: "#EEEEEA" }}
                    className="  relative text-black min-w-[85%] max-w-[85%] m-auto font-base min-h-screen flex justify-center items-center overflow-hidden z-[100000]"
                  >
                    <div className="w-full h-full absolute">
                      {cardData.map((card, index) => (
                        <div
                          onClick={() => {
                            console.log(
                              currentIndex,
                              "currentIndexcurrentIndex"
                            );
                          }}
                          key={index}
                          className={`absolute transition-opacity duration-700 ease-out ${
                            card.className
                          } ${
                            index <= visibleIndex ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div
                            className={`flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white`}
                            style={{
                              boxShadow:
                                "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                            }}
                          >
                            <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                              <h1 className="text-xl font-normal mb-2 break-before-avoid">
                                {card.heading}
                              </h1>

                              <p className="text-sm text-[#909090] leading-normal opacity-95">
                                {card.subHeading}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Genbot image with opacity 0 for initial fade-in */}
                    <img
                      className="genbot-image opacity-0 scale-75 md:w-[530px] xl:w-[770px]"
                      src="/img/shadowws.png"
                      alt="genbot image"
                    />
                  </section>
                </div>
              </div>
            </section>
          </div>
        </Element>
      ) : (
        <section
          ref={ref}
          style={{ backgroundColor: "#EEEEEA" }}
          className="bg-lightbg relative text-black min-w-[85%] max-w-[100%] m-auto font-base min-h-screen  justify-center items-center overflow-hidden z-[100000]"
        >
          {/* Genbot image with opacity 0 for initial fade-in */}
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <img
              className="  scale-75 md:w-[530px] xl:w-[580px]"
              src="/img/shadowws.png"
              alt="genbot image"
              style={{ margin: "auto" }}
            />
          </div>

          <div className="w-full" style={{ padding: 15 }}>
            {cardData.map((card, index) => (
              <div
                key={index}
                className={` md:block cards opacity-0`}
                style={{ marginBottom: 20 }}
              >
                <div
                  className={`flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white`}
                  style={{
                    boxShadow:
                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                  }}
                >
                  <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                    <h1 className="text-xl font-normal mb-2 break-before-avoid">
                      {card.heading}
                    </h1>

                    <p className="text-sm text-[#909090] leading-normal opacity-95">
                      {card.subHeading}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default FlyGenBotSection;
