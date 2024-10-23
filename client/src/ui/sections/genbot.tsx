// @ts-nocheck

import { smoothScroll } from "@/lib/utils";
import {
  useIntersection,
  useInViewport,
  useViewportSize,
} from "@mantine/hooks";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { Experience } from "./experiance";
import { Footer } from "./footer";
import { GbotFour } from "./gbot-four";
import GBotOne from "./gbot-one-hero";
import GbotThree from "./gbot-three";
import GbotTwo from "./gbot-two";

const initialGenBotSize = 0;
const maxGenBotSize = 0.000144;

type Props = {
  onModelLoad: any;
  base64Video: any;
};

const GenBot = ({ onModelLoad, base64Video }: Props) => {
  const [startRobotMove, setStartRobotMove] = useState(false);
  const [currentRobotPosition, setCurrentRobotPosition] = useState([0, 0.3, 0]);
  const [robotScaleValue, setRobotScaleValue] = useState(initialGenBotSize);
  const [robotRotationValue, setRobotRotationValue] = useState(0);

  const [genbotFinalMoveActivate, setGenbotFinalMoveActivate] = useState(false);

  const [startRobotRotate, setStartRobotRotate] = useState(false);

  const secondContainerRef = useRef(null);
  const thirdContainerOriginRef = useRef(null);
  const fourthContainerOriginRef = useRef(null);
  const fifthContainerOriginRef = useRef(null);
  const sixthContainerOriginRef = useRef(null);
  const seventhContainerOriginRef = useRef(null);
  const eighthContainerOriginRef = useRef(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: secondContainerRef,
  });
  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  const textScale = useTransform(sectionProgress, [0, 1], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.6], [1, 0]);

  const robotScale = useTransform(sectionProgress, [0, 1], [0.1, 1]);
  const robotOpacity = useTransform(sectionProgress, [0.1, 1], [0, 1]);

  const robotRotation = useTransform(
    sectionProgress,
    [0, 0.8],
    [0, Math.PI * 2]
  );

  // Third Section Imports

  const { entry, ref: thirdContainerRef } = useIntersection();
  const { inViewport, ref: thirdViewPortRef } = useInViewport();

  const { entry: flybotEntry, ref: fourthContainerRef } = useIntersection({
    threshold: 0.1,
  });

  const { inViewport: fourthInViewPort, ref: fourthEntryRef } = useInViewport();

  // fifth

  const { entry: fifthEntry, ref: fifthContainerRef } = useIntersection({
    threshold: 0.1,
  });

  const { inViewport: fifthInViewPort, ref: fifthEntryRef } = useInViewport();

  // sixth

  const { entry: sixthEntry, ref: sixthContainerRef } = useIntersection({});

  const { inViewport: sixthInViewPort, ref: sixthEntryRef } = useInViewport();

  //seventh

  const { entry: seventhEntry, ref: seventhContainerRef } = useIntersection({});

  const { inViewport: seventhInViewPort, ref: seventhEntryRef } =
    useInViewport();

  // eigth

  const { entry: eighthEntry, ref: eighthContainerRef } = useIntersection();

  const { inViewport: eighthInViewPort, ref: eighthEntryRef } = useInViewport();

  const [currentSection, setCurrentSection] = useState("section3");

  const { scrollYProgress: sectionThreeScrollYProgress } = useScroll({
    target: thirdContainerOriginRef,
    container: thirdContainerRef,
  });
  const sectionProgress2 = useTransform(
    sectionThreeScrollYProgress,
    [0.05, 1],
    [0, 1]
  );

  const [text] = useState(
    "Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions."
  );

  const textProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [-1, text.length + 140]
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

  const [glowIndex, setGlowIndex] = useState(-1);

  // re scroll up

  useEffect(() => {
    if (inViewport && currentSection === "section3") {
      smoothScroll(secondContainerRef.current.offsetHeight, 600, () => {
        setCurrentSection("section2");

        setGenbotFinalMoveActivate(false);
      });
    }
  }, [inViewport]);

  useEffect(() => {
    if (fourthInViewPort && currentSection === "section4") {
      smoothScroll(thirdContainerOriginRef.current.offsetTop, 600, () => {
        setCurrentSection("section3");
      });
    }
  }, [fourthInViewPort]);

  useEffect(() => {
    if (fifthInViewPort && currentSection === "section6") {
      const containerHeight = smoothScroll(
        fifthContainerOriginRef.current.offsetTop,
        600,
        () => {
          setCurrentSection("section5");
        }
      );
    }
  }, [fifthInViewPort]);

  useEffect(() => {
    if (sixthInViewPort && currentSection === "section7") {
      smoothScroll(sixthContainerOriginRef.current.offsetTop, 600, () => {
        setCurrentSection("section6");
      });
    }
  }, [sixthInViewPort]);

  useEffect(() => {
    if (seventhInViewPort && currentSection === "section8") {
      smoothScroll(seventhContainerOriginRef.current.offsetTop, 600, () => {
        setCurrentSection("section7");
      });
    }
  }, [seventhInViewPort]);

  const currentScrollY = window.pageYOffset;

  // scroll to
  useEffect(() => {
    if (entry?.isIntersecting) {
      let target = thirdContainerOriginRef.current.offsetTop;
      let scrollAmount = target - currentScrollY;
      smoothScroll(currentScrollY + scrollAmount, 600, () => {
        setCurrentSection("section3");
        console.log("section 3");
      });
      setCurrentSection("section3");
      setStartRobotMove(true);
      setFlybotActivate(true);
    } else {
      setStartRobotMove(false);
      setStartRobotRotate(false);
    }

    if (entry?.isIntersecting && currentSection == "section4") {
      setCurrentSection("section3");
      setStartRobotMove(true);
      setFlybotActivate(false);
    }
  }, [entry]);

  useEffect(() => {
    if (flybotEntry?.isIntersecting) {
      smoothScroll(fourthContainerOriginRef.current.offsetTop + 1, 600, () => {
        setCurrentSection("section4");
      });
      setCurrentSection("section4");
    }
  }, [flybotEntry]);

  useEffect(() => {
    if (fifthEntry?.isIntersecting && currentSection === "section4") {
      smoothScroll(fifthContainerOriginRef.current.offsetTop - 0.3, 600, () => {
        setCurrentSection("section5");
      });

      setCurrentSection("section5");
    }
  }, [fifthEntry]);

  // useEffect(() => {
  //   if (sixthEntry?.isIntersecting && currentSection === "section5") {
  //     smoothScroll(sixthContainerOriginRef.current.offsetTop, 600, () => {
  //       setCurrentSection("section6");
  //     });
  //     setCurrentSection("section6");
  //   }
  // }, [sixthEntry]);

  // useEffect(() => {
  //   if (seventhEntry?.isIntersecting && currentSection === "section6") {
  //     smoothScroll(seventhContainerOriginRef.current.offsetTop, 600, () => {
  //       setCurrentSection("section7");
  //     });
  //     setCurrentSection("section7");
  //   }
  // }, [seventhEntry]);

  // useEffect(() => {
  //   if (eighthEntry?.isIntersecting && currentSection === "section7") {
  //     smoothScroll(eighthContainerOriginRef.current.offsetTop, 600, () => {
  //       setCurrentSection("section8");
  //     });
  //     setCurrentSection("section8");
  //   }
  // }, [eighthEntry]);

  useMotionValueEvent(robotScale, "change", (latest) => {
    setRobotScaleValue(latest);
  });

  useMotionValueEvent(robotRotation, "change", (latest) => {
    setRobotRotationValue(latest);
  });

  useMotionValueEvent(videoProgress, "change", (latest) => {
    if (videoRef.current) {
      const progress = videoProgress.get();
      videoRef.current.currentTime = progress;
    }
  });

  const [flybotActivate, setFlybotActivate] = useState(false);

  const [botVisible, setBotVisible] = useState(true);

  const { width: vwidth } = useViewportSize();

  return (
    <div>
      {/* <div ref={fourthContainerOriginRef}>
        <div ref={fourthContainerRef}>
          <FlyGenBotSection isVisible={flybotActivate} />
        </div>
      </div> */}

      <div
        ref={fifthContainerOriginRef}
        className="bg-black  w-screen h-screen"
      >
        <div ref={fifthEntryRef}>
          <div ref={fifthContainerRef}>
            <GBotOne />
          </div>
        </div>
      </div>

      <div ref={sixthContainerOriginRef}>
        <div ref={sixthEntryRef}>
          <div ref={sixthContainerRef}>
            <GbotTwo />
          </div>
        </div>
      </div>

      <div ref={seventhContainerOriginRef}>
        <div ref={seventhEntryRef}>
          <div ref={seventhContainerRef}>
            <GbotThree />
          </div>
        </div>
      </div>

      <div ref={eighthContainerOriginRef}>
        <div ref={eighthEntryRef}>
          <div ref={eighthContainerRef}>
            <GbotFour />
          </div>
        </div>
      </div>

      <Experience />

      <Footer />
    </div>
  );
};

export default GenBot;
