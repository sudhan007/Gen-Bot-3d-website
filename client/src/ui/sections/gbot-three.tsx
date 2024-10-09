import { useIntersection } from "@mantine/hooks";
import anime from "animejs";
import React, { useEffect } from "react";
import { FlyGenBotCard } from "../components/FlyGenBotCard";
import { Experience } from "./experiance";
import { Footer } from "./footer";

export const GbotThree = () => {
  const { entry, ref } = useIntersection({
    threshold: 0.3,
  });

  useEffect(() => {
    const elems = document.querySelectorAll(".cards > div");
    if (entry?.isIntersecting) {
      anime({
        targets: elems,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        delay: anime.stagger(100),
      });
    }
  }, [entry]);

  return (
    <React.Fragment>
      <div className="font-base h-[100vh] bg-white relative z-[100]" ref={ref}>
        <div
          className="sticky top-0 h-screen w-full"
          style={{
            backgroundImage: "url(/img/gbot-rightface.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="h-screen flex flex-col justify-center items-end gap-8 w-[90%] cards">
            <FlyGenBotCard
              heading="Hazardous environment compatibility"
              subHeading="Designed to work seamlessly alongside humans, G Bot enhances productivity and efficiency."
            />

            <FlyGenBotCard
              heading="SECURITY AND PRIVACY"
              subHeading="G Bot ensures the utmost security and privacy
in interactions."
            />

            <FlyGenBotCard
              heading="AI EMPOWERMENT"
              subHeading="G Bot is equipped with cutting-edge Al technology, making it a versatile and intelligent companion."
            />

            <FlyGenBotCard
              heading="FRIENDLY INTERFACE"
              subHeading="G Bot offers a friendly and approachable interface for easy communication and collaboration."
            />

            <FlyGenBotCard
              heading="ADAPTIVE LEARNING"
              subHeading="G Bot continuously learns and adapts to user needs."
            />
          </div>
        </div>
      </div>

      <Experience />

      <Footer />
    </React.Fragment>
  );
};
