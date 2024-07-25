import hero from "@/assets/videos/hero-1080.mp4";
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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        const scroll = document.querySelector("#genbot");
        if (scroll)
          scroll.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <section
      className="h-screen bg-black text-white font-base flex flex-col justify-end mx-auto hero-section relative"
      style={{
        zIndex: 1000,
      }}
    >
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-screen h-screen object-cover"
      >
        <source src={hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-white font-normal uppercase text-[7rem] mx-[11%] leading-none z-10 absolute bottom-0 left-0">
        <h1>Advancing</h1>
        <h1>Safety</h1>
        <h1>
          Through <span className="text-yellow">Innovation</span>
        </h1>
        <div className="flex justify-center pb-[10px]">
          <Icon icon={"bi:mouse"} fontSize={40} />
        </div>
      </div>
    </section>
  );
};
