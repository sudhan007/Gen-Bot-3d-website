import { useInViewport } from "@mantine/hooks";
import anime from "animejs";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const GbotFour = () => {
  const { inViewport, ref } = useInViewport();

  const scrollref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollref,
    offset: ["start end", "end start"],
  });

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
      opacity: [0, 1],
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
  ]);

  const scale = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={scrollref}>
      <div className="font-base h-[100vh] bg-white relative z-[100]">
        <div className="sticky top-0 h-screen w-[60%] m-auto " ref={ref}>
          <img
            src="/img/gbot-rightface.png"
            alt="G Bot"
            className="h-screen absolute "
          />
          <div
            className="flex flex-col justify-center items-end gap-8 dad h-full"
            style={{
              opacity: 1,
            }}
          >
            <div className="flex flex-col justify-center items-end gap-10 ">
              {cardData.map(({ heading, subHeading }, index) => (
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
  );
};
