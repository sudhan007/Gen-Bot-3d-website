// import hero from "@/assets/videos/hero-1080.mp4";
import { Icon } from "@iconify/react/dist/iconify.js";
import anime from "animejs/lib/anime.es.js";
import { useEffect , useState } from "react";

type Props = {
  loading: boolean;
};

export const HeroSection = ({ loading }: Props) => {
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


  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    {
      width > 800 ?

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
        <div className="text-white font-normal uppercase mx-[5%] leading-none z-10 absolute bottom-12 left-0">
          <h1 style={{ fontFamily : 'AktivGrotesk' , fontSize : 100 , fontWeight : '400' } } className="text-[5.5vw] opacity-0">Advancing</h1>
          <h1 style={{ fontFamily : 'AktivGrotesk' , fontSize : 100 , fontWeight : '400'} } className="text-[5.5vw] opacity-0">Safety Through</h1>
          <h1 className="text-[5.5vw] opacity-0">
            <span style={{ fontFamily : 'AktivGrotesk' , fontSize : 100 , fontWeight : '400'} } className="text-yellow">Innovation</span>
          </h1>
        </div>
      )}

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center pb-[10px]">
        <Icon icon={"bi:mouse"} fontSize={40} />
      </div>
    </section>

    : 
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
      <source src={"/hero-1080.mp4"} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {!loading && (
      <div className="text-white font-normal uppercase mx-[5%] leading-none z-10 absolute bottom-12 left-0">
        <h1 style={{ fontFamily : 'AktivGrotesk' , fontSize : 44 , fontWeight : '400' } } className="text-[5.5vw] opacity-0">Advancing</h1>
        <h1 style={{ fontFamily : 'AktivGrotesk' , fontSize : 44 , fontWeight : '400'} } className="text-[5.5vw] opacity-0">Safety Through</h1>
        <h1 className="text-[5.5vw] opacity-0">
          <span style={{ fontFamily : 'AktivGrotesk' , fontSize : 44 , fontWeight : '400'} } className="text-yellow">Innovation</span>
        </h1>
      </div>
    )}

    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center pb-[10px]">
      <Icon icon={"bi:mouse"} fontSize={40} />
    </div>
  </section>
    }
   

    </>
  );
};
