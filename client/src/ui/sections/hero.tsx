// import hero from "@/assets/videos/hero-1080.mp4";
import { Icon } from "@iconify/react/dist/iconify.js";
import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

export const HeroSection = () => {
  useEffect(() => {
    anime({
      targets: ".hero-section h1",
      opacity: [0, 1],
      translateY: [200, 0],
      delay: anime.stagger(400),
      easing: "easeOutExpo",
      duration: 1000,
    });
  }, []);

  return (
    <section
      className="h-screen bg-black text-white font-base flex flex-col justify-end hero-section relative w-screen overflow-hidden"
      style={{
        zIndex: 1000,
      }}
    >
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0  h-screen object-cover w-full"
        onLoad={() => {
          console.log("loaded");
        }}
      >
        <source src={"/hero-1080.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-white font-medium uppercase mx-[5%] leading-none z-10 absolute bottom-12 left-0">
        <h1 className="text-[12vw] sm:text-[12vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw]">
          Advancing
        </h1>
        <h1 className="text-[12vw] sm:text-[12vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw]">
          Safety
        </h1>
        <h1 className="text-[12vw] sm:text-[12vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw]">
          Through <span className="text-yellow">Innovation</span>
        </h1>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center pb-[10px]">
        <Icon icon={"bi:mouse"} fontSize={40} />
      </div>
    </section>
  );
};
