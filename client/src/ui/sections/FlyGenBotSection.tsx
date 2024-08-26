import anime from "animejs";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FlyGenBotCard } from "../components/FlyGenBotCard";

export const FlyGenBotSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const smoothScrollTo = (targetY = 0) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 600;
      let startTime: any = null;

      const scroll = (timestamp: any) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * progress);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // @ts-ignore
          smoothScrollTo(sectionRef.current.offsetTop);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const textProgress = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const [_, setGlowIndex] = useState(-1);

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  useEffect(() => {
    const cards = document.querySelectorAll(".fly-genbot-card");

    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: "easeOutQuad",
    });
  }, [textProgress]);

  return (
    <section
      className=" bg-white relative text-black font-base flex justify-center items-center"
      ref={sectionRef}
    >
      <div className="sticky top-0 h-screen w-full opacity-0 lg:opacity-100">
        <motion.div className="absolute top-[11%] left-[10%]">
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </motion.div>
        <motion.div className="absolute top-[9%] right-[12%]">
          <FlyGenBotCard
            heading="REAL-TIME DATA ANALYSIS"
            subHeading="Genbot's Al analyzes data in real-time for informed decision-making."
          />
        </motion.div>
        <motion.div className="absolute bottom-[50%] right-[2%]">
          <FlyGenBotCard
            heading="ADVANCED SENSORS"
            subHeading="Equipped with state-of-the-art sensors for precise and safe navigation."
          />
        </motion.div>

        <motion.div className="absolute bottom-[24%] left-[7%]">
          <FlyGenBotCard
            heading="HUMAN-ROBOT COLLABORATION"
            subHeading="Genbot works seamlessly alongside humans, reducing their exposure to risky conditions."
          />
        </motion.div>
        <motion.div className="absolute bottom-[25%] right-[4%]">
          <FlyGenBotCard
            heading="MULTI-TERRAIN TRAVERSAL"
            subHeading="Genbot’s advanced tracks enable it to navigate a wide range of terrains ease."
          />
        </motion.div>
      </div>
    </section>
  );
};
