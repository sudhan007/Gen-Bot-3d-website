import { Navbar } from "@/ui/components/Navbar";
import { useQuery } from "@tanstack/react-query";
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
import _axios from "./lib/_axios.ts";
import { fetchVideoAsBase64, genbotIntro } from "./lib/utils.tsx";
import { AnimatedText } from "./ui/components/AnimatedText.tsx";
import { Experience } from "./ui/sections/experiance.tsx";
import { Footer } from "./ui/sections/footer.tsx";
import FlyGenBotSection from "./ui/sections/fourth.tsx";
import { GbotFour } from "./ui/sections/gbot-four.tsx";
import GbotThree from "./ui/sections/gbot-three.tsx";
import GbotTwo from "./ui/sections/gbot-two.tsx";
import Twofive from "./ui/sections/gbot-twofive.tsx";
import { HeroSection } from "./ui/sections/hero.tsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [base64Video, setBase64Video] = useState(null);
  const [glowIndex, setGlowIndex] = useState(-1);
  const thirdContainerOriginRef = useRef(null);

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
    const total = assets.length;
    setTotalAssets(total);
    let loaded = 0;

    const checkIfAllLoaded = () => {
      loaded += 1;
      setLoadedAssets(loaded);
      if (loaded >= total) {
        setVideoLoaded(true);
      }
    };

    const handleVideoLoad = (asset: any) => {
      if (
        asset.readyState >= 4 ||
        (asset.buffered.length > 0 && asset.buffered.end(0) >= asset.duration)
      ) {
        checkIfAllLoaded();
        asset.removeEventListener("loadedmetadata", handleVideoLoad);
      }
    };

    assets.forEach((asset: any) => {
      if (asset.tagName === "IMG") {
        asset.addEventListener("load", checkIfAllLoaded);
        if (asset.complete) checkIfAllLoaded();
      } else if (asset.tagName === "VIDEO") {
        asset.addEventListener("loadedmetadata", handleVideoLoad);
        if (asset.readyState >= 4) checkIfAllLoaded(); // Check if the video is already ready.
      }
    });

    return () => {
      assets.forEach((asset) => {
        if (asset.tagName === "IMG") {
          asset.removeEventListener("load", checkIfAllLoaded);
        } else if (asset.tagName === "VIDEO") {
          asset.removeEventListener("loadedmetadata", handleVideoLoad);
        }
      });
    };
  }, []);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videoData: any = await fetchVideoAsBase64("/input-encoded.mp4");
        setBase64Video(videoData);
        setVideoLoaded(true);
      } catch (error) {
        console.error("Error loading video:", error);
      }
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
  const [lastScrollY, setLastScrollY] = useState(0);
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
      if (
        videoRef.current.currentTime > 29 &&
        videoRef.current.currentTime < 29.999
      ) {
        setTimeout(() => {}, 1000);
      }

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

  const [stopThatBot, setStopThatBot] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            localStorage.setItem("currentSec", entry.target.id);

            if (
              entry.target.id == "section3" ||
              entry.target.id == "section2"
            ) {
              localStorage.removeItem("botAnimationPlayed");
            }
            if (width < 1120) {
              if (
                entry.target.id == "section9" ||
                entry.target.id == "section8"
              ) {
                setStopThatBot(true);
              } else {
                setStopThatBot(false);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id^="section"]');

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const sectionCount = 8;
  const [sectionVisibility, setSectionVisibility] = useState(
    Array(sectionCount).fill(true)
  );
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (width < 1120) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      let activeSectionIndex = 0;
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            activeSectionIndex = index;
          }
        }
      });

      setSectionVisibility((prev) => {
        const newVisibility = [...prev];

        if (isScrollingUp) {
          for (let i = 0; i < activeSectionIndex; i++) {
            newVisibility[i] = false;
          }
        } else {
          for (let i = activeSectionIndex; i < newVisibility.length; i++) {
            newVisibility[i] = true;
          }
        }

        return newVisibility;
      });

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const progress = Math.floor((loadedAssets / totalAssets) * 100);

  return (
    <>
      {loading && (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900  z-[1000000]"
        >
          <div className="w-80 h-3 rounded-full bg-gray-700 relative overflow-hidden border border-gray-500">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-blue-500 rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}

      {width > 1120 ? (
        <div className={`w-screen`}>
          <Navbar {...{ loading }} />

          <div id="section1">
            <HeroSection {...{ loading, sectionVisibility, sectionsRef }} />
          </div>

          <div id="section2">
            <Twofive
              sectionVisibility={sectionVisibility}
              sectiorefs={sectionsRef}
            />
          </div>

          <div className="z-[100]" id="thisistheidd">
            <section ref={thirdContainerOriginRef}>
              <div
                className={
                  sectionVisibility[3]
                    ? "h-[600vh] bg-white sticky  z-[1000] top-0"
                    : "bg-white sticky z-[1000] top-0 h-[-webkit-fill-available]"
                }
                ref={(el) => (sectionsRef.current[3] = el)}
              >
                <div className="sticky top-0 w-full flex md:flex-row bg-white">
                  <div className="bg-lightbg w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
                    <div className="ml-[5%] bg-white px-[10%] h-full rounded-l-3xl shadow-lg z-[10000]">
                      <img
                        src="/img/bot3d.png"
                        alt="GenBot 3D model"
                        id="section3"
                        className="w-[110px] mt-[20%] md:w-[360px] sm:w-[200px] pb-4 oneimg"
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
                          {data?.data.data.content
                            .split("")
                            .map((char: any, index: any) => (
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
                        className={
                          width > 1120
                            ? "object-cover h-full rounded-r-2xl shadow-lg"
                            : "w-full max-h-screen rounded-r-2xl shadow-lg"
                        }
                        preload="auto"
                      >
                        {base64Video && (
                          <source src={"/input-encoded.mp4"} type="video/mp4" />
                        )}
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <FlyGenBotSection
            sectionVisibility={sectionVisibility}
            sectiorefs={sectionsRef}
          />

          <GbotTwo
            sectionVisibility={sectionVisibility}
            sectiorefs={sectionsRef}
          />

          <GbotThree
            sectionVisibility={sectionVisibility}
            sectiorefs={sectionsRef}
          />

          <GbotFour
            sectionVisibility={sectionVisibility}
            sectiorefs={sectionsRef}
          />

          <Experience
            sectionVisibility={sectionVisibility}
            sectiorefs={sectionsRef}
          />

          <div>
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
            <Navbar {...{ loading }} />

            <Element name="section1" id="section1">
              <HeroSection {...{ loading, sectionsRef, sectionVisibility }} />
            </Element>

            <Element name="section2" id="section2">
              <div ref={secondContainerRef}>
                <section className="bg-lightbg text-white  h-[400vh] flex justify-center">
                  <div
                    className="scroll-section marker1"
                    id="marker"
                    style={{ height: "100vh" }}
                  ></div>

                  {window.scrollY < 6000 && (
                    <p
                      className="font-sfpro uppercase font-black tracking-normal mb-24"
                      style={{
                        color: "#2B2B2B",
                        fontSize: 36,
                        textAlign: "center",
                        position: "fixed",
                        top: width < 400 ? "16%" : width < 1120 ? "8%" : "7%",
                      }}
                    >
                      Introducing
                    </p>
                  )}
                  {!stopThatBot && window.scrollY < 6000 && (
                    <motion.img
                      src="/img/genbot-text.svg"
                      className="fixed top-[33%] md:top-[20%] transform w-[300px] z-10 md:w-auto"
                      style={{
                        scale: textScale,
                        opacity: textOpacity,
                        zIndex: 10,
                        display: visibility,
                      }}
                    />
                  )}

                  {!stopThatBot && window.scrollY < 6000 && (
                    <motion.img
                      src="/0300.png"
                      className="fixed top-[30%] md:top-[10%] transform w-[600px] z-10"
                      style={{
                        scale: robotScale,
                        opacity: robotOpacity,
                        zIndex: 10,
                      }}
                    />
                  )}
                </section>
              </div>
            </Element>

            <Element name="section3" id="section3">
              <div className="z-[100]">
                <section ref={thirdContainerOriginRef}>
                  <div className="  bg-white sticky  z-[1000] top-0">
                    <div className="sticky top-0 w-full">
                      <div className="bg-lightbg w-full items-start gap-4 top-0 py-[20px]">
                        <div className=" px-[5%] rounded-l-3xl  z-[10000]">
                          <img
                            src="/img/bot3d.png"
                            alt="GenBot 3D model"
                            className="w-[210px] md:w-[360px] sm:w-[300px] pb-4 oneimg"
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

            <Element name="section4" id="section4">
              <FlyGenBotSection
                sectionVisibility={sectionVisibility}
                sectiorefs={sectionsRef}
              />
            </Element>

            <Element name="section5" id="section5">
              <GbotTwo
                sectionVisibility={sectionVisibility}
                sectiorefs={sectionsRef}
              />
            </Element>

            <Element name="section6" id="section6">
              <GbotThree
                sectionVisibility={sectionVisibility}
                sectiorefs={sectionsRef}
              />
            </Element>

            <Element name="section7" id="section7">
              <GbotFour
                sectionVisibility={sectionVisibility}
                sectiorefs={sectionsRef}
              />
            </Element>

            <Element name="section8" id="section8">
              <Experience
                sectionVisibility={sectionVisibility}
                sectiorefs={sectionsRef}
              />
            </Element>

            <Element name="section9" id="section9">
              <Footer />
            </Element>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
