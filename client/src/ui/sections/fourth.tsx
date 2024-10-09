import { useIntersection } from "@/hooks/useIntersection";
import { useViewportSize } from "@mantine/hooks";
import anime from "animejs";
import { useEffect } from "react";

type Props = {
  isVisible: boolean;
};

export const FlyGenBotSection = ({}: Props) => {
  const { entry, ref } = useIntersection({
    threshold: 0.1,
  });

  useEffect(() => {
    const elems = document.querySelectorAll(".cards");

    setTimeout(() => {
      anime({
        targets: elems[0],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 500,
      });
      anime({
        targets: elems[1],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 500,
      });

      anime({
        targets: elems[2],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 1000,
      });
      anime({
        targets: elems[3],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 1000,
      });

      anime({
        targets: elems[4],
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 2000,
        delay: 1500,
      });
    }, 200);
  }, [entry]);

  const cardData = [
    {
      heading: "Hazardous Environment Compatibility",
      subHeading:
        "Designed to excel in toxic and hazardous settings, Genbot ensures human safety.",
      className: "lg:top-[15%] lg:left-[13%] md:top-[10%] md:left-[5%]",
    },
    {
      heading: "Real-Time Data Analysis",
      subHeading:
        "Genbot's AI analyzes data in real-time for informed decision-making.",
      className: "lg:top-[7%] lg:right-[20%] md:top-[10%] md:right-[5%]",
    },
    {
      heading: "Advanced Sensors",
      subHeading:
        "Equipped with state-of-the-art sensors for precise and safe navigation.",
      className: "lg:bottom-[55%] lg:right-[12%] md:bottom-[10%] md:right-[5%]",
    },
    {
      heading: "Human-Robot Collaboration",
      subHeading:
        "Genbot works seamlessly alongside humans, reducing their exposure to risky conditions.",
      className: "lg:bottom-[45%] lg:left-[10%] md:bottom-[10%] md:left-[5%]",
    },
    {
      heading: "Multi-Terrain Traversal",
      subHeading:
        "Genbot's advanced tracks enable it to navigate a wide range of terrains with ease.",
      className: "lg:left-[71%] lg:top-[69%] md:left-[24%] md:top-[60%]",
    },
  ];

  const { width } = useViewportSize();

  return (
    <>
      {width >= 768 ? (
        <section
          ref={ref}
          className="bg-white relative text-black min-w-[85%] max-w-[85%] m-auto font-base min-h-screen flex justify-center items-center overflow-hidden"
        >
          <div className="w-full h-full absolute">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`absolute ${card.className} hidden md:block cards`}
              >
                <div
                  className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
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
      ) : (
        <section
          ref={ref}
          className={`relative bg-white text-black font-base flex justify-center items-center overflow-hidden z-[100] py-4 min-h-screen`}
        >
          <div className="w-full h-full flex flex-col gap-10 mx-6">
            {cardData.map((card, index) => (
              <div key={index} className={``}>
                <div
                  className="fly-genbot-card flex flex-col items-center justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white shadow-md"
                  style={{
                    boxShadow: "rgb(255 202 0) 0px 2px 0px",
                  }}
                >
                  <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-medium mb-2 break-before-avoid">
                      {card.heading}
                    </h1>

                    <p className="text-xs md:text-sm lg:text-base text-black leading-normal opacity-95">
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
