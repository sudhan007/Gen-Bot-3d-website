import { useIntersection } from "@mantine/hooks";
import anime from "animejs";
import { useEffect } from "react";

export const GBotOne = () => {
  const { entry, ref } = useIntersection({
    threshold: 0.3,
  });

  useEffect(() => {
    const img = document.querySelector(".img");
    if (img) {
      anime({
        targets: img,
        translateX: [1500, 0],
        duration: 1000,
        easing: "easeOutExpo",
      });
    }

    return () => {
      if (img) {
        anime({
          targets: img,
          translateX: [0, 1500],
          duration: 1000,
          easing: "easeOutExpo",
        });
      }
    };
  }, [entry]);

  return (
    <section
      className="relative bg-white text-black font-base min-h-screen flex justify-center items-center overflow-hidden z-[100]"
      ref={ref}
    >
      <img
        src="/img/gbot-text.svg"
        alt="G Bot Text"
        className="absolute z-[1]"
      />

      <img
        src="/img/gbot-intro.png"
        alt="G Facing straight"
        className="z-[2] img"
      />
    </section>
  );
};
