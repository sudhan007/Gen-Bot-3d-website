// @ts-nocheck

import { smoothScroll } from "@/lib/utils";
import { useIntersection, useInViewport } from "@mantine/hooks";
import { useFBX } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatedText } from "../components/AnimatedText";
import { FlyGenBotSection } from "./fourth";
import { GBotOne } from "./gbot-one";
import { GbotThree } from "./gbot-three";
import { GbotTwo } from "./gbot-two";

const GenBotModel = ({
  startRobotMove,
  robotScaleValue,
  genbotFinalMoveActivate,
  setGenbotFinalMoveActivate,
}) => {
  const fbx = useFBX("Genbot.fbx");
  const ref = useRef(null);

  const startPos = useMemo(() => new THREE.Vector3(0, 0, -25), []);
  const targetPos = useMemo(() => new THREE.Vector3(153, 0, -200), []);
  const finalPos = useMemo(() => new THREE.Vector3(0, 0, -23), []);

  const scaleFactor = useMemo(() => 1, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const { position, scale, rotation } = ref.current;
      const camera = state.camera;

      const shrinkingFactor = 1.0 - delta * 8;
      const expandingFactor = 1.0 + delta * 8;
      const minScaleValue = 0.0000001;

      if (
        !position.equals(targetPos) &&
        startRobotMove &&
        !genbotFinalMoveActivate
      ) {
        position.lerp(targetPos, delta);
        const newScaleValue = Math.max(
          scale.x * shrinkingFactor,
          minScaleValue
        );
        scale.setScalar(newScaleValue * scaleFactor);
      } else if (!position.equals(startPos) && !genbotFinalMoveActivate) {
        position.lerp(startPos, delta * 6);
        scale.setScalar(robotScaleValue * scaleFactor);
      } else if (genbotFinalMoveActivate) {
        position.lerp(finalPos, delta * 6);
        scale.setScalar(robotScaleValue * scaleFactor);
      }
    }
  });

  return (
    <primitive
      ref={ref}
      object={fbx}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
    />
  );
};

const initialGenBotSize = 0;
const maxGenBotSize = 0.000101;

export const GenBot = () => {
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

  const { scrollYProgress } = useScroll({
    target: secondContainerRef,
  });
  const sectionProgress = useTransform(scrollYProgress, [0.05, 1], [0, 1]);

  const visibility = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 1, 1],
    [0, 0, 1, 1, 0]
  );

  const textScale = useTransform(sectionProgress, [0, 1], [1.2, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.6], [1, 0]);

  const robotScale = useTransform(
    sectionProgress,
    [0, 0.8],
    [initialGenBotSize, maxGenBotSize]
  );

  const robotRotation = useTransform(
    sectionProgress,
    [0, 0.8],
    [0, Math.PI * 2]
  );

  // Third Section Imports

  const { entry, ref: thirdContainerRef } = useIntersection();
  const { inViewport, ref: thirdViewPortRef } = useInViewport();

  const { entry: flybotEntry, ref: fourthContainerRef } = useIntersection();

  const { inViewport: fourthInViewPort, ref: fourthEntryRef } = useInViewport();

  // fifth

  const { entry: fifthEntry, ref: fifthContainerRef } = useIntersection({
    threshold: 0.1,
  });

  const { inViewport: fifthInViewPort, ref: fifthEntryRef } = useInViewport();

  // sixth

  const { entry: sixthEntry, ref: sixthContainerRef } = useIntersection({
    threshold: 0.1,
  });

  const { inViewport: sixthInViewPort, ref: sixthEntryRef } = useInViewport();

  //seventh

  const { entry: seventhEntry, ref: seventhContainerRef } = useIntersection({
    threshold: 0.1,
  });

  const { inViewport: seventhInViewPort, ref: seventhEntryRef } =
    useInViewport();

  const [currentSection, setCurrentSection] = useState("section3");

  const { scrollYProgress: sectionThreeScrollYProgress } = useScroll({
    target: thirdContainerOriginRef,
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
      const containerHeight = secondContainerRef.current.offsetHeight - 100;
      const scrollPosition = (300 / 400) * containerHeight;

      smoothScroll(
        secondContainerRef.current.offsetTop + scrollPosition,
        600,
        () => {
          setCurrentSection("section2");
        }
      );
    }
  }, [inViewport]);

  useEffect(() => {
    if (fourthInViewPort && currentSection === "section4") {
      const containerHeight =
        thirdContainerOriginRef.current.offsetHeight - 100;
      const scrollPosition = (300 / 400) * containerHeight;
      smoothScroll(
        thirdContainerOriginRef.current.offsetTop + scrollPosition + 20,
        600,
        () => {
          setCurrentSection("section3");
        }
      );
    }
  }, [fourthInViewPort]);

  useEffect(() => {
    if (fifthInViewPort && currentSection === "section5") {
      const containerHeight =
        fourthContainerOriginRef.current.offsetHeight - 100;
      const scrollPosition = (300 / 400) * containerHeight;
      smoothScroll(
        fourthContainerOriginRef.current.offsetTop + scrollPosition,
        600,
        () => {
          setCurrentSection("section4");
        }
      );
    }
  }, [fifthInViewPort]);

  useEffect(() => {
    if (sixthInViewPort && currentSection === "section6") {
      const containerHeight =
        fifthContainerOriginRef.current.offsetHeight - 100;
      const scrollPosition = (300 / 400) * containerHeight;
      smoothScroll(
        fifthContainerOriginRef.current.offsetTop + scrollPosition,
        600,
        () => {
          setCurrentSection("section5");
        }
      );
    }
  }, [sixthInViewPort]);

  useEffect(() => {
    if (entry?.isIntersecting && currentSection == "section2") {
      smoothScroll(thirdContainerOriginRef.current.offsetTop + 10, 600, () => {
        setCurrentSection("section3");
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
      smoothScroll(fourthContainerOriginRef.current.offsetTop + 10, 600, () => {
        setCurrentSection("section4");
      });
      setCurrentSection("section4");
    }
  }, [flybotEntry]);

  useEffect(() => {
    if (fifthEntry?.isIntersecting) {
      smoothScroll(fifthContainerOriginRef.current.offsetTop + 10, 600, () => {
        setCurrentSection("section5");
      });

      setCurrentSection("section5");
    }
  }, [fifthEntry]);

  useEffect(() => {
    if (sixthEntry?.isIntersecting) {
      smoothScroll(sixthContainerOriginRef.current.offsetTop + 10, 600, () => {
        setCurrentSection("section6");
      });
    }
  }, [sixthEntry]);

  useEffect(() => {
    if (seventhEntry?.isIntersecting) {
      smoothScroll(
        seventhContainerOriginRef.current.offsetTop + 10,
        600,
        () => {
          setCurrentSection("section7");
        }
      );
    }
  }, [seventhEntry]);

  useMotionValueEvent(robotScale, "change", (latest) => {
    setRobotScaleValue(latest);
  });

  useMotionValueEvent(robotRotation, "change", (latest) => {
    setRobotRotationValue(latest);
  });

  useMotionValueEvent(videoProgress, "change", (latest) => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const progress = videoProgress.get();
      videoRef.current.currentTime = progress;
    }
  });

  const [flybotActivate, setFlybotActivate] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [botVisible, setBotVisible] = useState(true);

  return (
    <div>
      <section className="min-w-[100vw]">
        <Canvas
          className="mt-[10%] h-screen"
          gl={{
            antialias: true,
            logarithmicDepthBuffer: true,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
            overflow: "visible",
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 300]} intensity={0.3} />
          <Suspense fallback={null}>
            <mesh>
              <GenBotModel
                startRobotMove={startRobotMove}
                // startRobotRotate={startRobotRotate}
                robotScaleValue={robotScaleValue}
                genbotFinalMoveActivate={genbotFinalMoveActivate}
                setGenbotFinalMoveActivate={setGenbotFinalMoveActivate}
                inFirstSection={entry && entry.isIntersecting}
                sectionProgress={textProgress}
              />
            </mesh>
          </Suspense>
        </Canvas>
      </section>

      {/* thirdViewPortRef */}
      <div ref={secondContainerRef}>
        <section
          className="bg-lightbg text-white font-base h-[400vh] flex justify-center"
          ref={thirdViewPortRef}
        >
          <motion.img
            src="/img/genbot-text.svg"
            className="fixed top-[15%] transform"
            style={{
              scale: textScale,
              opacity: textOpacity,
              zIndex: 10,
              display: visibility,
            }}
          />
        </section>
      </div>

      <div ref={fourthEntryRef}>
        <section ref={thirdContainerOriginRef}>
          <div className="font-base h-[400vh] bg-white" ref={thirdContainerRef}>
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
              <div className="bg-white w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0">
                <div className="mx-[10%]">
                  <img
                    src="/img/bot3d.svg"
                    alt="GenBot 3D model"
                    className="w-[320px] mt-[30%] md:w-[260px] sm:w-[200px]"
                  />
                  <h4 className="font-medium text-7xl mt-[20px] md:text-5xl sm:text-3xl">
                    Your Safety Partner
                  </h4>
                  <AnimatedText text={text} />
                </div>
              </div>
              {/* Right Side Video */}
              <div className="w-full md:w-1/2 h-screen bg-transparent overflow-hidden sticky top-0">
                <video
                  ref={videoRef}
                  src="/input-encoded.mp4"
                  muted
                  autoPlay={false}
                  className="w-full h-full object-cover absolute z-20"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div ref={fourthContainerOriginRef}>
        <div ref={fourthContainerRef}>
          <FlyGenBotSection isVisible={flybotActivate} />
        </div>
      </div>

      <div ref={fifthContainerOriginRef}>
        <div ref={fifthContainerRef}>
          <GBotOne />
        </div>
      </div>

      <div ref={sixthContainerOriginRef}>
        <div ref={sixthContainerRef}>
          <GbotTwo />
        </div>
      </div>

      <div ref={seventhContainerOriginRef}>
        <div ref={seventhContainerRef}>
          <GbotThree />
        </div>
      </div>
    </div>
  );
};
