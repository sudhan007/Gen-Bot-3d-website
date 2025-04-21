// import hero from "@/assets/videos/hero-1080.mp4";
import _axios from "@/lib/_axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import anime from "animejs/lib/anime.es.js";
import { useEffect, useState } from "react";

type Props = {
  loading: boolean;
  sectionsRef: any;
  sectionVisibility: any;
};

export const HeroSection = ({ loading, sectionsRef }: Props) => {
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        anime({
          targets: ".hero-section h1",
          opacity: [0, 1],
          translateY: [200, 0],
          delay: anime.stagger(600),
          easing: "easeOutExpo",
          duration: 1000,
        });
      }, 1400);
    }
  }, [loading]);

  const { data } = useQuery({
    queryKey: ["homeContent"],
    queryFn: async () => {
      return _axios.get(`/homepage/content`);
    },
  });

  // console.log(data?.data.data.content)
  const content = data?.data.data.content || "";
  const words = content.split(" ");

  const firstWord = words[0] || "";
  const lastWord = words[words.length - 1] || "";
  const middleWords = words.slice(1, -1).join(" ");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 1120 ? (
        <section
          className="h-screen bg-black text-white font-base flex flex-col justify-end hero-section relative w-screen overflow-hidden"
          style={{
            zIndex: 1000,
          }}
          ref={(el: any) => {
            sectionsRef.current[1] = el;
          }}
        >
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 h-screen object-cover w-screen"
            preload="auto"
            playsInline
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={"/genhead.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!loading && (
            <div className="text-white font-normal uppercase mx-[5%] leading-none z-10 absolute bottom-12 left-0">
              <h1
                style={{
                  fontFamily: "AktivGrotesk",
                  fontSize: 80,
                  fontWeight: "400",
                }}
                className="text-[5.5vw] opacity-0"
              >
                {firstWord}
              </h1>
              <h1
                style={{
                  fontFamily: "AktivGrotesk",
                  fontSize: 80,
                  fontWeight: "400",
                }}
                className="text-[5.5vw] opacity-0"
              >
                {middleWords}
              </h1>
              <h1 className="text-[5.5vw] opacity-0">
                <span
                  style={{
                    fontFamily: "AktivGrotesk",
                    fontSize: 100,
                    fontWeight: "400",
                  }}
                  className="text-yellow"
                >
                  {lastWord}
                </span>
              </h1>
            </div>
          )}

          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center pb-[10px]"
            style={{ paddingBottom: 44 }}
          >
            <Icon icon={"bi:mouse"} fontSize={40} />
          </div>
        </section>
      ) : (
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
            className="absolute top-0 left-0 h-screen object-cover w-screen"
            preload="auto"
            playsInline
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={"/genhead.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!loading && (
            <div
              className="text-white font-normal uppercase mx-[5%] leading-none z-10 absolute   left-0"
              style={{ bottom: "6rem" }}
            >
              <h1
                style={{
                  fontFamily: "AktivGrotesk",
                  fontSize: 44,
                  fontWeight: "400",
                }}
                className="text-[5.5vw] opacity-0"
              >
                {firstWord}
              </h1>
              <h1
                style={{
                  fontFamily: "AktivGrotesk",
                  fontSize: 44,
                  fontWeight: "400",
                }}
                className="text-[5.5vw] opacity-0"
              >
                {middleWords}
              </h1>
              <h1 className="text-[5.5vw] opacity-0">
                <span
                  style={{
                    fontFamily: "AktivGrotesk",
                    fontSize: 44,
                    fontWeight: "400",
                  }}
                  className="text-yellow"
                >
                  {lastWord}
                </span>
              </h1>
            </div>
          )}

          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center  "
            style={{ paddingBottom: "44px" }}
          >
            <Icon icon={"bi:mouse"} fontSize={40} />
          </div>
        </section>
      )}
    </>
  );
};
