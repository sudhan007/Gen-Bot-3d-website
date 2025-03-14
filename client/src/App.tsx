import { Navbar } from "@/ui/components/Navbar";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Element, Events, scroller } from "react-scroll";
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



function App() {
  const [loading, setLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [section, setSection] = useState("section1");
  const [base64Video, setBase64Video] = useState(null);
  const [glowIndex, setGlowIndex] = useState(-1);
  const thirdContainerOriginRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const [progressstate, setProgressstate] = useState(false);
 

  useEffect(() => {
    if(progressstate === false){
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 98 ? prev + 1 : 98));
      }, 200); // 600ms * 100 = 60 seconds (1 minute)
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
    setGlowIndex(Math.floor(latest) + 25);
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
            asset.removeEventListener("progress", handleProgress); // Avoid calling it multiple times
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

    console.log(loadedAssets, totalAssets, videoLoaded, base64Video, 'loadedAssets, totalAssets, videoLoaded, base64Video')
    if (loadedAssets >= totalAssets && totalAssets > 0  && base64Video ) {

      setProgressstate(true)

      setTimeout(() => {
        
        setProgress(100)
      window.scrollTo(0, 0);
         
      }, 500);

       
     

      setTimeout(() => {
        
       
        
        // setPeddd(100)
        setLoading(false);
      }, 1000);
    }
  }, [loadedAssets, totalAssets, videoLoaded, base64Video]);

  const [isMobile] = useState(window.innerWidth < 768);
  const currentScrollY = useRef(0);

  const isScrolling = useRef(false);

  const currentScrolls = useRef(-1);
  const totalScrolls = useRef(4);

  const currentScrollsSection3 = useRef(0);
  const totalScrollsSection3 = useRef(12);

  const currentScrollsSection6 = useRef(0);
  const totalScrollsSection6 = useRef(12);

  // useEffect(() => {
  //   function handleScroll(e: WheelEvent) {
  //     e.preventDefault();

  //     if (isScrolling.current) {
  //       console.log("Scrolling is already in progress, ignoring event.");
  //       return; // Prevent further scrolling during animation
  //     }

  //     console.log(`Current Section: ${section}, Scroll Direction: ${e.deltaY}`);

  //     console.log(
  //       `Current Scrolls => ${currentScrolls.current}, Total => ${totalScrolls.current}`
  //     );

  //     currentScrollY.current = window.scrollY;

  //     // Section 1 to Section 2
  //     if (section === "section1" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 1 to Section 2.");
  //       scrollToSection("section2");

  //       // Section 2 to Section 1
  //     } else if (
  //       section === "section2" &&
  //       e.deltaY < 0 &&
  //       currentScrolls.current === 0
  //     ) {
  //       console.log("Scrolling up from Section 2 to Section 1.");
  //       scrollToSection("section1");

  //       // Section 2 scrolling down
  //     } else if (
  //       section === "section2" &&
  //       e.deltaY > 0 &&
  //       currentScrolls.current < totalScrolls.current - 1
  //     ) {
  //       currentScrolls.current++;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling down in Section 2: Current Scrolls ${currentScrolls.current}`
  //       );

  //       animateScroll.scrollMore(window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling down in Section 2.");
  //         },
  //       });

  //       // Section 2 scrolling up
  //     } else if (
  //       section === "section2" &&
  //       e.deltaY < 0 &&
  //       currentScrolls.current > 0
  //     ) {
  //       currentScrolls.current--;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling up in Section 2: Current Scrolls ${currentScrolls.current}`
  //       );

  //       animateScroll.scrollTo(window.scrollY - window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling up in Section 2.");
  //         },
  //       });

  //       // Transition from Section 2 to Section 3
  //     } else if (
  //       section === "section2" &&
  //       e.deltaY > 0 &&
  //       currentScrolls.current === totalScrolls.current - 1
  //     ) {
  //       console.log("Transitioning from Section 2 to Section 3.");
  //       scrollToSection("section3");

  //       // Section 3 scrolling down
  //     } else if (
  //       section === "section3" &&
  //       e.deltaY > 0 &&
  //       currentScrollsSection3.current < totalScrollsSection3.current - 1
  //     ) {
  //       currentScrollsSection3.current++;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling down in Section 3: Current Scrolls ${currentScrollsSection3.current}`
  //       );

  //       animateScroll.scrollMore(window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling down in Section 3.");
  //         },
  //       });

  //       // Section 3 scrolling up
  //     } else if (
  //       section === "section3" &&
  //       e.deltaY < 0 &&
  //       currentScrollsSection3.current > 0
  //     ) {
  //       currentScrollsSection3.current--;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling up in Section 3: Current Scrolls ${currentScrollsSection3.current}`
  //       );

  //       animateScroll.scrollTo(window.scrollY - window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling up in Section 3.");
  //         },
  //       });

  //       // If at the top of section 3, scroll to section 2
  //     } else if (
  //       section === "section3" &&
  //       e.deltaY < 0 &&
  //       currentScrollsSection3.current === 0
  //     ) {
  //       console.log("Scrolling up from Section 3 to Section 2.");
  //       scrollToSection("section2");
  //       currentScrolls.current = 0;

  //       // Transition from Section 3 to Section 4
  //     } else if (
  //       section === "section3" &&
  //       e.deltaY > 0 &&
  //       currentScrollsSection3.current === totalScrollsSection3.current - 1
  //     ) {
  //       console.log("Transitioning from Section 3 to Section 4.");
  //       scrollToSection("section4");

  //       // Section 4 scrolling down to section 5
  //     } else if (section === "section4" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 4 to Section 5.");
  //       scrollToSection("section5");

  //       // Section 4 scrolling up to section 3
  //     } else if (section === "section4" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 4 to Section 3.");
  //       scrollToSection("section3");
  //       currentScrollsSection3.current = 0;

  //       // Section 5 scrolling up to section 4
  //     } else if (section === "section5" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 5 to Section 4.");
  //       scrollToSection("section4");
  //     } else if (section === "section5" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 5 to Section 6.");
  //       scrollToSection("section6");
  //     } else if (
  //       section === "section6" &&
  //       e.deltaY > 0 &&
  //       currentScrollsSection6.current < totalScrollsSection6.current - 1
  //     ) {
  //       currentScrollsSection6.current++;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling down in Section 6: Current Scrolls ${currentScrollsSection6.current}`
  //       );
  //       animateScroll.scrollMore(window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling down in Section 6.");
  //         },
  //       });
  //     } else if (
  //       section === "section6" &&
  //       e.deltaY < 0 &&
  //       currentScrollsSection6.current > 0
  //     ) {
  //       currentScrollsSection6.current--;
  //       isScrolling.current = true;
  //       console.log(
  //         `Scrolling up in Section 6: Current Scrolls ${currentScrollsSection6.current}`
  //       );
  //       animateScroll.scrollTo(window.scrollY - window.innerHeight, {
  //         duration: 700,
  //         smooth: "easeInOutQuad",
  //         onComplete: () => {
  //           isScrolling.current = false;
  //           console.log("Finished scrolling up in Section 6.");
  //         },
  //       });
  //     } else if (
  //       section === "section6" &&
  //       e.deltaY < 0 &&
  //       currentScrollsSection6.current === 0
  //     ) {
  //       console.log("Scrolling up from Section 6 to Section 5.");
  //       scrollToSection("section5");
  //     } else if (
  //       section === "section6" &&
  //       e.deltaY > 0 &&
  //       currentScrollsSection6.current === totalScrollsSection6.current - 1
  //     ) {
  //       console.log("Scrolling down from Section 6 to Section 7.");
  //       scrollToSection("section7");
  //     } else if (section === "section7" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 7 to Section 8.");
  //       scrollToSection("section8");
  //     } else if (section === "section7" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 7 to Section 6.");
  //       currentScrollsSection6.current = 0;
  //       scrollToSection("section6");
  //     } else if (section === "section8" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 8 to Section 9.");
  //       scrollToSection("section9");
  //     } else if (section === "section8" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 8 to Section 7.");
  //       scrollToSection("section7");
  //     } else if (section === "section9" && e.deltaY > 0) {
  //       console.log("Scrolling down from Section 9 to Section 10.");
  //       scrollToSection("section10");
  //     } else if (section === "section9" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 9 to Section 8.");
  //       scrollToSection("section8");
  //     } else if (section === "section10" && e.deltaY < 0) {
  //       console.log("Scrolling up from Section 10 to Section 9.");
  //       scrollToSection("section9");
  //     }
  //   }

  //   window.addEventListener("wheel", handleScroll, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //   };
  // }, [section]);

  // third section
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

  // fourth section

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
      const progress = videoProgress.get();
      videoRef.current.currentTime = progress;
    }
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (_section: string) => {
    scroller.scrollTo(_section, {
      duration: 700,
      smooth: "easeInOutQuad",
    });
    Events.scrollEvent.register("end", function () {
      setSection(_section);
      isScrolling.current = false;

      if (_section == "section1") {
        currentScrolls.current = 0;
      }

      if (_section == "section3" && section == "section4") {
        currentScrolls.current = 0;
      }
    });
  };

  useDisableKeyboardScroll();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (
        <div>
          {loading  && (
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* <span className="loader"></span> */}


                <div style={{
                   width: "100%",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   height: "12px",
                   background: "#f4f4f4",
                   borderRadius: "10px",
                   border : "1px solid #fff",
                }}>
                  <div style={{
                    width: "300px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    height : '100%',
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}>
                    <div style={{ 
                      animation: "fillBar 60s linear forwards, glow 2s infinite alternate", 
                      borderRadius: "10px",
                      overflow: "hidden",
                      height : '100%',
                      background: "#111827 var(--tw-gradient-to-position)",
                      position: "relative", width: `${progress}%` ,  }}>
                    <span style={{
                       position: "absolute",
                       width: "100%",
                       textAlign: "center",
                       color: "#fff",
                       fontWeight: "bold",
                       animation: "pulse 1.5s infinite", // Cool pulsing text effect
                       fontSize :7,
                    }}>{progress}%</span>
                  </div>
                </div>
              </div>


            </div>
            </motion.div>
      )}

      <div className={`w-screen ${isMobile ? "overflow-x-hidden" : ""}`}>
        <Navbar {...{ loading }} />

        <Element name="section1">
          <HeroSection {...{ loading }} />
        </Element>

        <Element name="section2">
          {/* <div ref={secondContainerRef}>
                <section className="bg-lightbg text-white  h-[400vh] flex justify-center">
                  <div
                    className="scroll-section marker1"
                    id="marker"
                    style={{ height: "100vh" }}
                  ></div>

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
                    src="/genbot-front.png"
                    className="fixed top-[30%] md:top-[10%] transform w-[300px] z-10 md:w-auto"
                    style={{
                      scale: robotScale,
                      opacity: robotOpacity,
                      zIndex: 10,
                    }}
                  />
                </section>
              </div> */}

          <Twofive />
        </Element>

        <Element name="section3">
          <div className="z-[100]">
            <section ref={thirdContainerOriginRef}>
              <div className=" h-[600vh] bg-white sticky  z-[1000] top-0">
                <div className="sticky top-0 w-full flex md:flex-row bg-white">
                  <div className="bg-lightbg w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
                    <div className="ml-[5%] bg-white px-[10%] h-full rounded-l-3xl shadow-lg z-[10000]">
                      <img
                        src="/img/bot3d.svg"
                        alt="GenBot 3D model"
                        className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4 oneimg"
                      />
                      <h4
                        style={{
                          fontSize: 64,
                          fontWeight: "610",
                          fontFamily: "SFpro",
                        }}
                        className="oneone mb-8 text-3xl mt-[20px] md:text-5xl sm:text-3xl text-[#2B2B2B] thisisassclassstwo"
                      >
                        Your Safety Partner
                      </h4>
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
                          {genbotIntro.split("").map((char, index) => (
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

                        {/* <AnimatedText text={genbotIntro} /> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 h-screen bg-lightbg overflow-hidden sticky top-0 hidden md:block z-[10000]">
                    <div className="h-full object-cover sticky top-0 py-[60px] pr-[10%] rounded-r-3xl shadow-xl">
                      <video
                        ref={videoRef}
                        muted
                        controls={false}
                        className="object-cover h-full rounded-r-2xl shadow-lg"
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
        <Element name="section5">
          <GBotOne loading={loading} />
        </Element>

        <Element name="section9">
          <Experience />
        </Element>

        <Element name="section10">
          <Footer />
        </Element>
      </div>
    </div >
      ) : (
    <div>
      {loading && (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-[1000000]"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="loader"></span>
          </div>
        </motion.div>
      )}

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
                src="/genbot-front.png"
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
                <div className="sticky top-0 w-full    ">
                  <div className="bg-lightbg w-full items-start gap-4 sticky top-0 py-[20px] ">
                    <div className="   px-[5%]   rounded-l-3xl  z-[10000]">
                      <img
                        src="/img/bot3d.svg"
                        alt="GenBot 3D model"
                        className="w-[110px]  md:w-[260px] sm:w-[200px] pb-4 oneimg"
                      />
                      <h4
                        style={{ fontSize: 28, fontWeight: 510 }}
                        className="oneone mb-4 text-3xl   md:text-5xl sm:text-3xl text-[#2B2B2B]"
                      >
                        Your Safety Partner
                      </h4>
                      <div className="w-[95%]">
                        <AnimatedText text={genbotIntro} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full   bg-lightbg overflow-hidden sticky top-0  md:block z-[10000]">
                    <div className="h-full object-cover sticky top-0 p-[20px]  rounded-r-3xl  ">
                      <video
                        muted
                        className="object-cover h-full "
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
        <Element name="section5">
          <GBotOne loading={loading} />
        </Element>
        <Element name="section9">
          <Experience />
        </Element>

        <Element name="section10">
          <Footer />
        </Element>
      </div>
    </div>
  )
}
    </>
  );
}




export default App;
