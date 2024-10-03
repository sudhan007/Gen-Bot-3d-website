// @ts-nocheck

import useMediaLoader from "@/hooks/useMediaLoader";
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
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatedText } from "../components/AnimatedText";
import { Experience } from "./experiance";
import { Footer } from "./footer";
import { FlyGenBotSection } from "./fourth";
import { GBotOne } from "./gbot-one";

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

  const { entry: flybotEntry, ref: fourceContainerRef } = useIntersection();
  const { entry: afterFourthSection, ref: afterFourthSectionRef } =
    useIntersection();

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

  const [text2] = useState(
    "Get acquainted with G bot. A humanoid robot empowered by AI, redefining collaboration with humans. Designed to work seamlessly alongside humans, G bot is more than just a robotic assistant: it's the future of technological partnership."
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
    if (entry?.isIntersecting) {
      smoothScroll(thirdContainerOriginRef.current.offsetTop + 2, 600, () => {
        setCurrentSection("section3");
      });
      setCurrentSection("section3");
      setStartRobotMove(true);
    } else {
      setStartRobotMove(false);
      setStartRobotRotate(false);
    }
  }, [entry]);

  useEffect(() => {
    if (flybotEntry?.isIntersecting) {
      setGenbotFinalMoveActivate(true);
      setStartRobotRotate(false);

      smoothScroll(fourthContainerOriginRef.current.offsetTop);
    } else {
      setGenbotFinalMoveActivate(false);
      setStartRobotRotate(true);
    }
  }, [flybotEntry]);

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

  const videoRef = useRef<HTMLVideoElement>(null);

  const [botVisible, setBotVisible] = useState(true);

  useMediaLoader([videoRef]);

  return (
    <React.Fragment>
      {botVisible && (
        <section>
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
              width: "100vw",
              height: "100vh",
              zIndex: 2,
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
      )}
      {/* thirdViewPortRef */}
      <div ref={secondContainerRef}>
        <section
          className="bg-lightbg text-white font-base h-[400vh] flex justify-center w-screen"
          ref={thirdViewPortRef}
        >
          <motion.img
            src="/img/genbot-text.svg"
            className="w-[600px] fixed top-[15%] transform md:w-[600px] sm:w-[400px] xs:w-[300px]"
            style={{
              scale: textScale,
              opacity: textOpacity,
              zIndex: 10,
              display: visibility,
            }}
          />
        </section>
      </div>

      <section ref={thirdContainerOriginRef}>
        <div className="font-base h-[400vh] bg-white" ref={thirdContainerRef}>
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
            {/* Left Side Content */}
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

      <div>
        <FlyGenBotSection isVisible={genbotFinalMoveActivate} />
      </div>

      <GBotOne />

      <section ref={afterFourthSectionRef}>
        <div className="font-base h-[100vh] bg-white relative">
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
            <div className="bg-white w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4">
              <div className="mx-[10%]">
                <img
                  src="/img/gbot3d.svg"
                  alt="GenBot 3D model"
                  className="w-[320px] mt-[30%] md:w-[260px] sm:w-[200px]"
                />

                <h4 className="font-medium text-7xl mt-[20px] md:text-5xl sm:text-3xl">
                  The Future Of Human-Robot Interaction
                </h4>

                <AnimatedText text={text2} />
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full flex justify-center items-center relative">
              <img
                src="/img/gbot-text2.svg"
                className="w-[600px] z-[1]"
                alt=""
              />

              <img
                src="/img/gbot-sidec.png"
                className="w-[300px] absolute top-0 left-0 z-[2] h-full"
                style={{
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="font-base h-[100vh] bg-white relative">
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
            <div className="bg-white w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4">
              <div className="mx-[10%]">
                <img
                  src="/img/gbot-rightface.png"
                  className="w-[600px] z-[1]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Experience />

      <Footer />
    </React.Fragment>
  );
};
