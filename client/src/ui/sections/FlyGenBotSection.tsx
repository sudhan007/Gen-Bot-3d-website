import { useInViewport } from "@mantine/hooks";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FlyGenBotCard } from "../components/FlyGenBotCard";

export const FlyGenBotSection = () => {
  const { inViewport, ref: genbotRef } = useInViewport();
  const controls = useAnimation();

  useEffect(() => {
    if (inViewport) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inViewport, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
      className="bg-white relative text-black font-base min-h-screen flex justify-center items-center overflow-hidden"
      ref={genbotRef}
    >
      <div className="w-full h-full absolute">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className={`absolute ${card.className} hidden md:block`}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FlyGenBotCard
              heading={card.heading}
              subHeading={card.subHeading}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden w-full px-4 py-8 space-y-4">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FlyGenBotCard
              heading={card.heading}
              subHeading={card.subHeading}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
