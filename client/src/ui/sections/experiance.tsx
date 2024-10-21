import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Experience = () => {
  const scrollref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div
      className=" text-black font-base relative z-[100]"
      style={{ backgroundColor: "#fff", overflow: "hidden" }}
      ref={scrollref}
    >
      <motion.div
        style={{
          backgroundColor: "#424741",
          borderRadius: "70%",
          width: "100px",
          height: "100px",
          position: "fixed",
          bottom: "-400px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          scale: scale,
        }}
      ></motion.div>

      <motion.div className="relative z-[10000]">
        <div
          className="absolute w-full text-center"
          style={{
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <p className="uppercase text-white text-4xl md:text-5xl font-bold">
            EXPERIENCE THE{" "}
            <span style={{ color: "rgba(252, 217, 2, 1)" }}>FUTURE TODAY</span>
          </p>

          <p className="uppercase text-white mt-6 text-lg font-[400] md:text-xl">
            Explore the innovative solutions of Genbot and G Bot.
            <br /> Embrace the future of technology and human-robot
            <br /> interaction. Begin your journey to safer, more
            <br /> efficient, and tech-driven possibilities today.
          </p>

          <div className="w-[360px] bg-[rgba(252,217,2,1)] justify-center items-center flex mt-10 mx-auto">
            <p className="uppercase text-xl font-400 p-3">what’s the hold</p>
          </div>
        </div>

        <img
          src="/img/experiance.png"
          alt=""
          className="w-full relative pt-[5%]"
        />
      </motion.div>
    </div>
  );
};
