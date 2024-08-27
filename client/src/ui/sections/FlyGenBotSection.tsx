import anime from "animejs";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FlyGenBotCard } from "../components/FlyGenBotCard";

export const FlyGenBotSection = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".fly-genbot-card");

    setTimeout(() => {
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: "easeOutQuad",
      });
    }, 200);
  }, []);

  return (
    <section className="bg-white relative text-black font-base flex justify-center items-center">
      <div className="sticky top-0 h-screen w-full opacity-0 lg:opacity-100">
        {/* First Card */}
        <motion.div className="absolute top-[11%] left-[10%] md:top-[15%] md:left-[5%] sm:top-[20%] sm:left-[3%]">
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </motion.div>

        {/* Second Card */}
        <motion.div className="absolute top-[9%] right-[7%] md:top-[13%] md:right-[2%] sm:top-[18%] sm:right-[2%]">
          <FlyGenBotCard
            heading="REAL-TIME DATA ANALYSIS"
            subHeading="Genbot's AI analyzes data in real-time for informed decision-making."
          />
        </motion.div>

        {/* Third Card */}
        <motion.div className="absolute bottom-[50%] right-[2%] md:bottom-[40%] md:right-[4%] sm:bottom-[35%] sm:right-[6%]">
          <FlyGenBotCard
            heading="ADVANCED SENSORS"
            subHeading="Equipped with state-of-the-art sensors for precise and safe navigation."
          />
        </motion.div>

        {/* Fourth Card */}
        <motion.div className="absolute bottom-[24%] left-[7%] md:bottom-[30%] md:left-[6%] sm:bottom-[40%] sm:left-[8%]">
          <FlyGenBotCard
            heading="HUMAN-ROBOT COLLABORATION"
            subHeading="Genbot works seamlessly alongside humans, reducing their exposure to risky conditions."
          />
        </motion.div>

        {/* Fifth Card */}
        <motion.div className="absolute bottom-[5%] right-[4%] md:bottom-[10%] md:right-[8%] sm:bottom-[45%] sm:right-[10%]">
          <FlyGenBotCard
            heading="MULTI-TERRAIN TRAVERSAL"
            subHeading="Genbot’s advanced tracks enable it to navigate a wide range of terrains with ease."
          />
        </motion.div>
      </div>
    </section>
  );
};
