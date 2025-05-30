import { useIntersection } from "@/hooks/useIntersection";
import _axios from "@/lib/_axios";
import { useQuery } from "@tanstack/react-query";
import anime from "animejs";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  sectionVisibility: any;
  sectiorefs: any;
}

const FlyGenBotSection = ({ sectionVisibility, sectiorefs }: Props) => {
  const { entry, ref } = useIntersection({
    threshold: 0.1,
  });

  const refs = useRef(null);

  const [, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: refs,
  });

  const { data } = useQuery({
    queryKey: ["fourthContent"],
    queryFn: async () => {
      return _axios.get(`/roboticintelligence/content`);
    },
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

    // if (clampedIndex === 99 || clampedIndex === 98 || clampedIndex === 97) {
    //   localStorage.setItem("testfinethree", "1");
    //   setTimeout(() => {
    //     // setCurrentIndexfine(false);
    //   }, 1000);
    // }
    setCurrentIndex(clampedIndex);
  });
  useEffect(() => {
    const hasVisited = localStorage.getItem("botAnimationPlayed");

    const elems = document.querySelectorAll(".cards");
    const genbotImage: any = document.querySelector(".genbot-image");

    if (!genbotImage) return;

    if (!hasVisited) {
      genbotImage.style.opacity = "0";
      genbotImage.style.transform = "translateY(-100px)";

      elems.forEach((elem: any) => {
        elem.style.opacity = "0";
        elem.style.transform = "translateY(50px)";
      });
    }

    if (!entry?.isIntersecting || hasVisited) return;

    anime({
      targets: genbotImage,
      opacity: [0, 1],
      translateY: [240, 0],
      duration: 800,
      easing: "easeOutQuad",
      delay: 200,
    });

    setTimeout(() => {
      elems.forEach((elem: any, index) => {
        anime({
          targets: elem,
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 2000,
          delay: index * 100,
        });
      });
    }, 300);

    localStorage.setItem("botAnimationPlayed", "true");

    return () => {
      // anime({
      //   targets: genbotImage,
      //   translateX: [2400, 0],
      //   duration: 200,
      //   easing: "easeOutQuad",
      // });
    };
  }, [entry]);

  const cardData = [
    {
      heading: `${data?.data.data[0].title}`,
      subHeading: `${data?.data.data[0].content}`,
      className: `lg:top-[6%] lg:left-[8%] md:top-[10%] md:left-[5%] z-10 coolbotonoe `,
      ind: 1,
    },
    {
      heading: `${data?.data.data[1].title}`,
      subHeading: `${data?.data.data[1].content}`,
      className:
        "lg:top-[7%] lg:right-[17%] md:top-[10%] md:right-[5%] z-10 coolbototwo ",
      ind: 2,
    },
    {
      heading: `${data?.data.data[2].title}`,
      subHeading: `${data?.data.data[2].content}`,
      className:
        "lg:bottom-[56%] lg:right-[8%] md:bottom-[10%] md:right-[5%] z-10  coolbotthree",
      ind: 3,
    },
    {
      heading: `${data?.data.data[3].title}`,
      subHeading: `${data?.data.data[3].content}`,
      className:
        "lg:bottom-[45%] lg:left-[8%] md:bottom-[10%] md:left-[5%] z-10 coolbotfour",
      ind: 4,
    },
    {
      heading: `${data?.data.data[4].title}`,
      subHeading: `${data?.data.data[4].content}`,
      className:
        "lg:left-[67%] lg:top-[54%] md:left-[24%] md:top-[60%] z-10  coolbotofive coolbotofivesss",
      ind: 5,
    },
    {
      heading: `${data?.data?.data[5]?.title || ""}`,
      subHeading: `${data?.data?.data[5]?.content || ""}`,
      className:
        "lg:left-[58%] lg:top-[77%] md:left-[24%] md:top-[60%] z-10 coolbotofive",
      ind: 6,
    },
    {
      heading: `${data?.data?.data[6]?.title || ""}`,
      subHeading: `${data?.data?.data[6]?.content || ""}`,
      className:
        "lg:top-[77%] lg:left-[19%] md:bottom-[10%] md:left-[5%] z-10  coolbotfourf",
      ind: 7,
    },
    {
      ind: 8,
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {width > 1120 ? (
        <div id="hifhhhhhhhhhhhhhhhh">
          <div className="z-[100]">
            <section ref={ref}>
              <div
                ref={(el: any) => {
                  refs.current = el;
                  sectiorefs.current[4] = el;
                }}
                id="section4"
                className={`${
                  sectionVisibility[4]
                    ? "h-[500vh] bg-white sticky  z-[1000] top-0 "
                    : "h-[-webkit-fill-available] bg-white sticky  z-[1000] top-0 "
                }`}
              >
                <div
                  className="sticky top-0 w-full flex md:flex-row "
                  style={{ backgroundColor: "#EEEEEA" }}
                >
                  <section
                    style={{ backgroundColor: "#EEEEEA" }}
                    className="relative text-black min-w-[85%] max-w-[85%] m-auto font-base min-h-screen flex justify-center items-center overflow-hidden z-[100000] tjhtyjhtgndfg"
                  >
                    <div className="w-full h-full absolute">
                      {cardData.map((card, index) => (
                        <div
                          key={index}
                          className={`absolute transition-all duration-700 ease-out ${
                            card.className
                          } ${
                            card.ind <= visibleIndex
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-[-60px]"
                          }`}
                        >
                          <div
                            className="flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[320px] rounded-xl border bg-white fineebrrrr fineebrrrrfunn"
                            style={{
                              boxShadow:
                                "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                            }}
                          >
                            <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                              <h1
                                style={{
                                  fontWeight: "700",
                                  marginBottom: ".3rem",
                                }}
                                className="text-xl font-normal mb-2 break-before-avoid fineeeetextone"
                              >
                                {card.heading}
                              </h1>
                              <p
                                className="text-sm text-[#909090] leading-normal opacity-95 fineeeetexttwo"
                                style={{ lineHeight: "17px" }}
                              >
                                {card.subHeading}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Genbot image with opacity 0 for initial fade-in */}
                    <img
                      className="genbot-image opacity-0 scale-75 md:w-[530px] xl:w-[770px] botbond"
                      src="/img/shadowws.png"
                      alt="genbot image"
                    />
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <section
          ref={ref}
          style={{ backgroundColor: "#EEEEEA" }}
          className="bg-lightbg relative text-black w-screen font-base overflow-hidden z-[100000]"
        >
          <div
            style={{ alignItems: "center", justifyContent: "center" }}
            className="mt-20"
          >
            <img
              className="w-[630px] xl:w-[580px]"
              src="/img/shadowws.png"
              alt="genbot image"
              style={{ margin: "auto" }}
            />
          </div>

          <div className="w-screen p-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={` md:block cards ${
                  card.ind === 8 ? "opacity-0" : ""
                }`}
                style={{ marginBottom: 20 }}
              >
                <div
                  className={`flex flex-col items-center justify-center w-[90%] mx-auto rounded-xl border bg-white`}
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
    </div>
  );
};

export default FlyGenBotSection;
