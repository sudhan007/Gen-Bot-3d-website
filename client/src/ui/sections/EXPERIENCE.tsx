import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export const EXPERIENCE = () => {
  const exps = useRef<HTMLDivElement>(null);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const expob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("hhhhhhhhhhhhhhhhhhhhh");
          handleClick();
        }
      },
      { threshold: 0.1 }
    );

    if (exps.current) {
      expob.observe(exps.current);
    }

    return () => {
      if (exps.current) {
        expob.unobserve(exps.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: exps,
    offset: ["start end", "end end"],
  });

  const textProgress = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const [glowIndex, setGlowIndex] = useState(-1);

  useMotionValueEvent(textProgress, "change", (latest) => {
    console.log(latest, "lllllllll");
    setGlowIndex(Math.floor(latest));
  });

  return (
    <div
      ref={exps}
      className=" text-black font-base relative "
      style={{ backgroundColor: "#fff" }}
    >
      <div
        style={{
          backgroundColor: "rgba(66, 71, 65, 1)",
          // width: `${glowIndex}` + "%",
          transform: `translate(-50%, -50%) scale(${glowIndex})`,
          height: 150,
          borderRadius: "50%",
          position: "absolute",
          zIndex: 1,
          width: 150,
          top: "150%",
          left: "50%",
          scale: 20,
        }}
      ></div>
      <div
        className="mx-[5%]"
        style={{ paddingBottom: "10%", position: "relative", zIndex: 1000 }}
      >
        <img
          src="/img/root2.png"
          alt="GenBot 3D model" 
          className="w-[480px] "
          style={{ position : 'absolute' , bottom : glowIndex*10-165 , left : 66 , transition: "transform 0.5s ease",}}
        />
        <img
          src="/img/root1.png"
          alt="GenBot 3D model" 
           className="w-[480px] "
          style={{ position : 'absolute' , bottom : glowIndex*10-230 ,right : 35 , transition: "transform 0.5s ease", }}
        />
        <div
          style={{
            paddingTop: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 54,
              fontWeight: "400",
              textAlign: "center",
              color: "#fff",
            }}
          >
            EXPERIENCE THE{" "}
            <span style={{ color: "rgba(252, 217, 2, 1)" }}>FUTURE TODAY</span>
          </p>
          <p
            style={{
              fontSize: 30,
              fontWeight: "400",
              textAlign: "center",
              color: "#fff",
              marginTop: 10,
              lineHeight: "initial",
            }}
          >
            Explore the innovative solutions of Genbot and G Bot.
            <br /> Embrace the future of technology and human-robot
            <br /> interaction. Begin your journey to safer, more
            <br /> efficient, and tech-driven possibilities today.
          </p>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              width: 460,
              backgroundColor: "rgba(252, 217, 2, 1)",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginTop: 40,
            }}
          >
            <p style={{ fontSize: 30, fontWeight: "400" }}>what’s the hold</p>
          </div>
        </div>
      </div>
    </div>
  );
};
