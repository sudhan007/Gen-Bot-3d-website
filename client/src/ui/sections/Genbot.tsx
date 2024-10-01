// @ts-nocheck

import useMediaLoader from "@/hooks/useMediaLoader";
import { smoothScroll } from "@/lib/utils";
import { useIntersection } from "@mantine/hooks";
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
import { FlyGenBotSection } from "./FlyGenBotSection";

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

  const [currentSection, setCurrentSection] = useState("section1");

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
  const { entry: flybotEntry, ref: fourceContainerRef } = useIntersection();

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
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setCurrentSection("section2");
    } else if (flybotEntry?.isIntersecting) {
      setCurrentSection("section3");
    } else {
      setCurrentSection("section1");
    }
  }, [entry, flybotEntry]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      smoothScroll(thirdContainerOriginRef.current.offsetTop, 600);
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

      smoothScroll(fourthContainerOriginRef.current.offsetTop, 1000, () => {
        setStartRobotMove(true);
      });
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

  useMediaLoader([videoRef]);

  return (
    <React.Fragment>
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
      <section
        className="bg-lightbg text-white font-base h-[400vh] flex justify-center"
        ref={secondContainerRef}
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

      <section ref={thirdContainerOriginRef}>
        <div
          className="font-base h-[400vh] bg-white relative"
          ref={thirdContainerRef}
        >
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
            <div className="bg-white w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4">
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
            <div className="w-full md:w-1/2 h-full relative bg-transparent overflow-hidden">
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

      <div ref={fourthContainerOriginRef}>
        <div ref={fourceContainerRef}>
          <FlyGenBotSection isVisible={genbotFinalMoveActivate} />
        </div>
      </div>
    </React.Fragment>
  );
};
