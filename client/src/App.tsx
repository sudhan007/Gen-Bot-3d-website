import { Navbar } from "@/ui/components/Navbar";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import "./App.css";
import useDisableKeyboardScroll from "./hooks/useDisableKeyScroll.tsx";
import { fetchVideoAsBase64, genbotIntro } from "./lib/utils.tsx";
import { AnimatedText } from "./ui/components/AnimatedText.tsx";
import { Experience } from "./ui/sections/experiance.tsx";
import { Footer } from "./ui/sections/footer.tsx";
import FlyGenBotSection from "./ui/sections/fourth.tsx";
import { GbotFour } from "./ui/sections/gbot-four.tsx";
import GBotOne from "./ui/sections/gbot-one-hero.tsx";
import GbotThree from "./ui/sections/gbot-three.tsx";
import GbotTwo from "./ui/sections/gbot-two.tsx";
import Twofive from "./ui/sections/gbot-twofive.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";
import { useQuery } from "@tanstack/react-query";
import _axios from "./lib/_axios.ts";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [base64Video, setBase64Video] = useState(null);
  const [glowIndex, setGlowIndex] = useState(-1);
  const thirdContainerOriginRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [progressstate, setProgressstate] = useState(false);

  const [enteroneid, setEnteroneid] = useState(true); 

  useEffect(() => {
    if (progressstate === false) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 98 ? prev + 1 : 98));
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("keyName");
    localStorage.removeItem("keyName2");
  }, []);

  const { scrollYProgress: sectionThreeScrollYProgressone } = useScroll({
    target: thirdContainerOriginRef,
  });

  const textProgress = useTransform(
    sectionThreeScrollYProgressone,
    [0, 1],
    [-1, genbotIntro.length]
  );

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  const { data } = useQuery({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      return _axios.get(`/aboutpage/content`);
    },
  });

  useEffect(() => {
    const assets = document.querySelectorAll("img, video");
    setTotalAssets(assets.length);

    assets.forEach((asset: any) => {
      if (asset.tagName === "IMG") {
        asset.addEventListener("load", handleAssetLoad);

        if (asset.complete) {
          handleAssetLoad();
        }
      } else if (asset.tagName === "VIDEO") {
        asset.setAttribute("preload", "auto");

        const handleProgress = () => {
          if (
            asset.buffered.length > 0 &&
            asset.buffered.end(0) >= asset.duration
          ) {
            handleVideoLoad();
            asset.removeEventListener("progress", handleProgress);
          }
        };

        asset.addEventListener("progress", handleProgress);
        asset.addEventListener("loadedmetadata", handleProgress);

        if (asset.readyState >= 4) {
          handleVideoLoad();
        }
      }
    });

    return () => {
      assets.forEach((asset) => {
        if (asset.tagName === "IMG") {
          asset.removeEventListener("load", handleAssetLoad);
        } else if (asset.tagName === "VIDEO") {
          asset.removeEventListener("progress", handleVideoLoad);
          asset.removeEventListener("loadedmetadata", handleVideoLoad);
        }
      });
    };
  }, []);

  const handleAssetLoad = () => {
    setLoadedAssets((prev) => prev + 1);
  };

  const handleVideoLoad = () => {
    setLoadedAssets((prev) => prev + 1);
    setVideoLoaded(true);
  };

  useEffect(() => {
    const loadVideo = async () => {
      const videoData: any = await fetchVideoAsBase64("/input-encoded.mp4");
      setBase64Video(videoData);
    };

    loadVideo();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [loading]);

  useEffect(() => {
    if (videoLoaded && loading === true) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [videoLoaded]);

  const [isMobile] = useState(window.innerWidth < 768);

  const secondContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: secondContainerRef,
  });
  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const textScale = useTransform(sectionProgress, [0, 1], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.6], [1, 0]);

  const robotScale = useTransform(sectionProgress, [0, 1], [0.1, 1]);
  const robotOpacity = useTransform(sectionProgress, [0.1, 1], [0, 1]);

  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  const { scrollYProgress: sectionThreeScrollYProgress } = useScroll({
    target: thirdContainerOriginRef,
  });

  const videoProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [0, 30]
  );

  useMotionValueEvent(videoProgress, "change", () => {

    
    if (videoRef.current) {

      if( videoRef.current.currentTime  > 29 && videoRef.current.currentTime < 29.999 ) {
        localStorage.setItem('testfinetwo' , '1')
        setTimeout(() => {
          // setEnteroneid(false);
        }, 1000);
        
      }
      console.log(videoRef.current.currentTime , 'progressprogressprogressprogress')
      const progress = videoProgress.get();
      videoRef.current.currentTime = progress;
    }
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useDisableKeyboardScroll();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThisIsTheIdFocus =async () => {
   
    let findvals = await localStorage.getItem('testfinetwo');
    console.log( findvals , 'gggdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    if (findvals === "1") {
      setEnteroneid(false);
    }else{
      setEnteroneid(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleThisIsTheIdFocus();
        }
      });
    });

    const element = document.getElementById("thisistheidd");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <>
      {loading && (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "12px",
              background: "#f4f4f4",
              borderRadius: "10px",
              border: "1px solid #fff",
            }}>
              <div style={{
                width: "300px",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                height: '100%',
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}>
                <div style={{
                  animation: "fillBar 60s linear forwards, glow 2s infinite alternate",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: '100%',
                  background: "#111827 var(--tw-gradient-to-position)",
                  position: "relative", width: `${progress}%`,
                }}>
                  <span style={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    animation: "pulse 1.5s infinite",
                    fontSize: 7,
                  }}>{progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {width > 800 ? (
        <div>
          <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
            <Navbar {...{ loading }} />

            <Element name="section1">
              <HeroSection {...{ loading }} />
            </Element>

            <Element name="section2">
              <Twofive />
            </Element>

            <Element name="section3">
              <div className="z-[100]" id='thisistheidd'>
                <section ref={thirdContainerOriginRef}>
                  <div className={enteroneid === true ?  " h-[600vh] bg-white sticky  z-[1000] top-0" : " bg-white sticky  z-[1000] top-0" }>
                    <div className="sticky top-0 w-full flex md:flex-row bg-white">
                      <div className="bg-lightbg w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
                        <div className="ml-[5%] bg-white px-[10%] h-full rounded-l-3xl shadow-lg z-[10000]">
                          <img
                            src="/img/bot3d.png"
                            alt="GenBot 3D model"
                            className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4 oneimg"
                          />
                          <div className="w-[95%]">
                            <motion.p
                              className="mt-[10px] text-3xl leading-relaxed font-normal sm:text-xl thisisassclasss"
                              style={{
                                lineHeight: "40px",
                                fontSize: 26,
                                fontWeight: "400",
                                fontFamily: "SFpro",
                              }}
                            >
                              {data?.data.data.content.split("").map((char, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0.01 }}
                                  animate={{
                                    opacity: index <= glowIndex ? 1 : 0.2,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {char}
                                </motion.span>
                              ))}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 h-screen bg-lightbg overflow-hidden sticky top-0 hidden md:block z-[10000]">
                        <div className="h-full object-cover sticky top-0 py-[60px] pr-[10%] rounded-r-3xl shadow-xl">
                          <video
                            ref={videoRef}
                            muted
                            controls={false}
                            className={width > 800 ? "object-cover h-full rounded-r-2xl shadow-lg" : "w-full max-h-screen rounded-r-2xl shadow-lg"}
                            preload="auto"
                          >
                            {base64Video && (
                              <source src={base64Video} type="video/mp4" />
                            )}
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Element>

            <Element name="section4">
              <FlyGenBotSection />
            </Element>

            <Element name="section6">
              <GbotTwo />
            </Element>

            <Element name="section7">
              <GbotThree />
            </Element>

            <Element name="section8">
              <GbotFour />
            </Element>

            <Element name="section9">
              <Experience />
            </Element>

            <Element name="section10">
              <Footer />
            </Element>
          </div>
        </div>
      ) : (
        <div>
          <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
            <Navbar {...{ loading }} />

            <Element name="section1">
              <HeroSection {...{ loading }} />
            </Element>

            <Element name="section2">
              <div ref={secondContainerRef}>
                <section className="bg-lightbg text-white  h-[400vh] flex justify-center">
                  <div
                    className="scroll-section marker1"
                    id="marker"
                    style={{ height: "100vh" }}
                  ></div>

                  <p style={{ color: "#2B2B2B", fontSize: 20, textAlign: 'center', position: 'fixed', top: '23%', fontWeight: '500' }}>Introducing</p>

                  <motion.img
                    src="/img/genbot-text.svg"
                    className="fixed top-[30%] md:top-[10%] transform w-[300px] z-10 md:w-auto"
                    style={{
                      scale: textScale,
                      opacity: textOpacity,
                      zIndex: 10,
                      display: visibility,
                    }}
                  />

                  <motion.img
                    src="/0300.png"
                    className="fixed top-[30%] md:top-[10%] transform w-[300px] z-10 md:w-auto"
                    style={{
                      scale: robotScale,
                      opacity: robotOpacity,
                      zIndex: 10,
                    }}
                  />
                </section>
              </div>
            </Element>

            <Element name="section3">
              <div className="z-[100]">
                <section ref={thirdContainerOriginRef}>
                  <div className="  bg-white sticky  z-[1000] top-0">
                    <div className="sticky top-0 w-full">
                      <div className="bg-lightbg w-full items-start gap-4 sticky top-0 py-[20px]">
                        <div className=" px-[5%] rounded-l-3xl  z-[10000]">
                          <img
                            src="/img/bot3d.png"
                            alt="GenBot 3D model"
                            className="w-[110px] md:w-[260px] sm:w-[200px] pb-4 oneimg"
                          />
                          <div className="w-[95%]">
                            <AnimatedText text={genbotIntro} />
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-lightbg overflow-hidden sticky top-0 md:block z-[10000]">
                        <div className="h-full object-cover sticky top-0 p-[20px] rounded-r-3xl">
                          <video
                            muted
                            className="  "
                            preload="auto"
                            style={{ borderRadius: 15 }}
                            autoPlay 
                            loop
                            playsInline
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <source
                              src={"/input-encoded.mp4"}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Element>

            <Element name="section4">
              <FlyGenBotSection />
            </Element>

            <Element name="section6">
              <GbotTwo />
            </Element>

            <Element name="section7">
              <GbotThree />
            </Element>

            <Element name="section8">
              <GbotFour />
            </Element>

            <Element name="section9">
              <Experience />
            </Element>

            <Element name="section10">
              <Footer />
            </Element>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
