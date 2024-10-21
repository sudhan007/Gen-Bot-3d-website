// @ts-nocheck

import { fetchVideoAsBase64 } from "@/lib/utils";
import { useViewportSize } from "@mantine/hooks";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { genbotIntro } from "@/lib/common";
import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "../components/AnimatedText";
import { Experience } from "./experiance";
import { Footer } from "./footer";
import FlyGenBotSection from "./fourth";
import { GbotFour } from "./gbot-four";
import GBotOne from "./gbot-one-hero";
import GbotThree from "./gbot-three";
import GbotTwo from "./gbot-two";

type Props = {
  onModelLoad: any;
};

const GenBot = ({ onModelLoad }: Props) => {
  // common states
  const [robotScaleValue, setRobotScaleValue] = useState(0);
  const [currentSection, setCurrentSection] = useState("section3");

  const [flybotActivate, setFlybotActivate] = useState(false);
  const [botVisible, setBotVisible] = useState(true);

  // all refs
  const secondContainerRef = useRef(null);
  const thirdContainerRef = useRef(null);
  // video ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // scroll progresss
  const { scrollYProgress } = useScroll({
    target: secondContainerRef,
    layoutEffect: false,
  });

  const { scrollYProgress: sectionThreeScrollYProgress } = useScroll({
    container: thirdContainerRef,
  });

  // transforms
  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  const textScale = useTransform(sectionProgress, [0, 1], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.6], [1, 0]);

  const robotScale = useTransform(sectionProgress, [0, 1], [0.1, 1]);
  const robotOpacity = useTransform(sectionProgress, [0.1, 1, 2], [0, 1, 0]);

  const robotRotation = useTransform(
    sectionProgress,
    [0, 0.8],
    [0, Math.PI * 2]
  );

  const sectionProgress2 = useTransform(
    sectionThreeScrollYProgress,
    [0.05, 1],
    [0, 1]
  );

  const textProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [-1, genbotIntro.length + 140]
  );

  const videoProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [0, 30]
  );

  const robotoRotation = useTransform(
    sectionProgress2,
    [0, 1],
    [0, Math.PI * 2]
  );

  // video control base64
  const [base64Video, setBase64Video] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      const videoData = await fetchVideoAsBase64("/input-encoded.mp4");
      setBase64Video(videoData);
    };

    loadVideo();
  }, []);

  const [glowIndex, setGlowIndex] = useState(-1);

  useMotionValueEvent(robotScale, "change", (latest) => {
    setRobotScaleValue(latest);
  });

  useMotionValueEvent(videoProgress, "change", (latest) => {
    if (videoRef.current) {
      const progress = videoProgress.get();
      videoRef.current.currentTime = progress;
    }

    if (videoRef.current) {
      if (!botVisible) {
        setBotVisible(true);
      }
    }
  });

  const { width: vwidth } = useViewportSize();

  return (
    <div>
      <section className="bg-lightbg text-white font-base h-[250vh] flex justify-center">
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
          className={`fixed top-[30%] md:top-[10%] transform w-[300px] z-10 md:w-auto ${
            botVisible ? "" : "hidden"
          }`}
          style={{
            scale: robotScale,
            opacity: robotOpacity,
            zIndex: 10,
          }}
        />
      </section>

      <div className="z-[100]">
        <section>
          <div className="font-base h-[400vh] bg-white sticky  z-[1000] top-0">
            <div className="sticky top-0 w-full flex md:flex-row bg-white">
              <div className="bg-lightbg w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
                <div className="ml-[5%] bg-white px-[10%] h-full rounded-l-3xl shadow-lg z-[10000]">
                  <img
                    src="/img/bot3d.svg"
                    alt="GenBot 3D model"
                    className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4"
                  />
                  <h4 className="font-medium mb-8 text-3xl mt-[20px] md:text-5xl sm:text-3xl text-[#2B2B2B]">
                    Your Safety Partner
                  </h4>
                  <div className="w-[95%]">
                    <AnimatedText text={genbotIntro} />
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
                      <source src={base64Video} type="video/webm" />
                    )}
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <FlyGenBotSection isVisible={flybotActivate} />
      </div>

      <div className="bg-black  w-screen h-screen">
        <GBotOne />
      </div>
      <GbotTwo />
      <GbotThree />
      <GbotFour />
      <Experience />

      <Footer />
    </div>
  );
};

export default GenBot;
