import { useEffect, useRef, useState } from "react";

export const Experience = () => {
  const exps = useRef<HTMLDivElement>(null);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const expob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  // const { scrollYProgress } = useScroll({
  //   target: exps,
  //   offset: ["start end", "end end"],
  // });

  // const textProgress = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const [glowIndex] = useState(30);

  // useMotionValueEvent(textProgress, "change", (latest) => {
  //   setGlowIndex(Math.floor(latest));
  // });

  return (
    <div
      ref={exps}
      className=" text-black font-base relative z-[100] bg-[#424741]"
    >
      <div
        className=" bg-[#424741]"
        style={{ position: "relative", height: 750 }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex flex-col justify-center items-center mt-[10%]">
            <p className="uppercase text-center text-white text-4xl md:text-5xl font-bold">
              EXPERIENCE THE{" "}
              <span style={{ color: "rgba(252, 217, 2, 1)" }}>
                FUTURE TODAY
              </span>
            </p>
            <p className="text-center uppercase text-white mt-6 text-lg font-[400] md:text-xl">
              Explore the innovative solutions of Genbot and G Bot.
              <br /> Embrace the future of technology and human-robot
              <br /> interaction. Begin your journey to safer, more
              <br /> efficient, and tech-driven possibilities today.
            </p>
          </div>

          {/* Button */}
          <div className="justify-center items-center flex">
            <div className="w-[360px] bg-[rgba(252,217,2,1)] justify-center items-center flex mt-10">
              <p className="uppercase text-xl font-400 p-3">what’s the hold</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-full w-screen">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center w-screen border-b-[1px] border-[#525652]">
            <img
              src="/img/root2.png"
              alt="GenBot 3D model"
              className="w-[580px] md:mr-[5%]"
            />
            <img
              src="/img/footer-genbot.png"
              alt="GenBot 3D model"
              className="w-[480px] md:mr-[4%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
