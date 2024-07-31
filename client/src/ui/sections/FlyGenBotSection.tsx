import { FlyGenBotCard } from "../components/FlyGenBotCard";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export const FlyGenBotSection = () => {

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
    <section className="bg-white text-black font-base h-screen relative flex justify-center items-center" ref={exps}>
      <div className="relative">
        <img
          src="/img/genbot-img.png"
          className="w-[800px]"
          alt="Fly Genbot"
          style={{
            zIndex: 1,
            transform: "scaleX(-1)",
          }}
        />
      </div>

      <div className="absolute  z-0 top-10 left-1/2">
        <div  style={{  marginLeft :'15%' , marginTop : '50%' }} className="absolute" >
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </div>
        <div style={{ marginTop : '25%' , marginLeft :'65%' }} className="absolute" >
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </div>
        <div style={{ marginTop : '25%' , marginLeft :'50%' }}>
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </div>
      </div>

      <div className="absolute top-10 " style={{ right : '65%' }}>
        <div style={{ marginLeft : '40%' }}  >
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </div>
        <div style={{ marginTop : '55%' , marginRight :'65%' }} >
          <FlyGenBotCard
            heading="Hazardous environment compatibility"
            subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
          />
        </div> 
      </div>
    </section>
  );
};
