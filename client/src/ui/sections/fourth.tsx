import { useIntersection } from "@/hooks/useIntersection";
import anime from "animejs";
import { useEffect } from "react";

type Props = {
  isVisible: boolean;
};

export const FlyGenBotSection = ({}: Props) => {
  const { entry, ref } = useIntersection({
    threshold: 0.4,
  });

  useEffect(() => {
    const elems = document.querySelectorAll(".cards");

    anime({
      targets: elems,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1200,
      delay: anime.stagger(220),
    });
  }, [entry]);

  const cardData = [
    {
      heading: "Hazardous environment compatibility",
      subHeading:
        "Designed to excel in toxic and hazardous settings, Genbot ensures human safety.",
      className: "lg:top-[15%] lg:left-[10%] md:top-[10%] md:left-[5%]",
    },
    {
      heading: "REAL-TIME DATA ANALYSIS",
      subHeading:
        "Genbot's AI analyzes data in real-time for informed decision-making.",
      className: "lg:top-[15%] lg:right-[10%] md:top-[10%] md:right-[5%]",
    },
    {
      heading: "ADVANCED SENSORS",
      subHeading:
        "Equipped with state-of-the-art sensors for precise and safe navigation.",
      className: "lg:bottom-[35%] lg:right-[3%] md:bottom-[10%] md:right-[5%]",
    },
    {
      heading: "HUMAN-ROBOT COLLABORATION",
      subHeading:
        "Genbot works seamlessly alongside humans, reducing their exposure to risky conditions.",
      className: "lg:bottom-[15%] lg:left-[6%] md:bottom-[10%] md:left-[5%]",
    },
    {
      heading: "MULTI-TERRAIN TRAVERSAL",
      subHeading:
        "Genbot's advanced tracks enable it to navigate a wide range of terrains with ease.",
      className: "lg:left-1/2 lg:top-[85%] md:left-[34%] md:top-[80%]",
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-white relative text-black font-base min-h-screen flex justify-center items-center overflow-hidden"
    >
      <div className="w-full h-full absolute">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`absolute ${card.className} hidden md:block cards`}
          >
            <div
              className="fly-genbot-card flex flex-col items-center justify-center w-[400px] rounded-xl border bg-white "
              style={{
                boxShadow: "rgb(255 202 0) 0px 7px 0px",
              }}
            >
              <div className="w-full h-full flex flex-col p-5 bg-white rounded-xl">
                <h1 className="text-2xl font-medium uppercase mb-2 break-before-avoid">
                  {card.heading}
                </h1>

                <p className="text-sm text-black  leading-normal opacity-95">
                  {card.subHeading}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
