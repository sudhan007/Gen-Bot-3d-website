import { useIntersection } from "@mantine/hooks";
import anime from "animejs";
import React, { useEffect } from "react";

export const GbotThree = () => {
  const { entry, ref } = useIntersection({
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      const elems = document.querySelectorAll(".cards > div > div");

      anime({
        targets: elems,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        delay: anime.stagger(100),
      });
    }
  }, [entry]);

  const cardData = [
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
  ];

  return (
    <React.Fragment>
      <div className="font-base h-[100vh] bg-white relative z-[100]" ref={ref}>
        <div className="sticky top-0 h-screen w-[60%] m-auto">
          <img
            src="/img/gbot-rightface.png"
            alt="G Bot"
            className="h-screen absolute top-20"
          />
          <div className="flex flex-col justify-center items-end gap-8 cards h-full">
            <div className="flex flex-col justify-center items-end gap-8">
              {cardData.map(({ heading, subHeading }, index) => (
                // <FlyGenBotCard
                //   key={index}
                //   heading={card.heading}
                //   subHeading={card.subHeading}
                // />

                <div
                  key={index}
                  className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
                  style={{
                    boxShadow:
                      "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
                    opacity: 0,
                  }}
                >
                  <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                    <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize">
                      {heading}
                    </h1>

                    <p className="text-sm text-[#909090] leading-normal opacity-95">
                      {subHeading}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <Experience />

      <Footer /> */}
    </React.Fragment>
  );
};
