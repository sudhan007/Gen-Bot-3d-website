// @ts-nocheck

import { useIntersection } from "@mantine/hooks";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatedText } from "../components/AnimatedText";
import { FlyGenBotSection } from "./FlyGenBotSection";

type Props = {
  scale: number[];
  startRobotMove: boolean;
  startRobotRotate: boolean;
};

const GenBotModel = ({
  scale = [0.00004, 0.000002, 0.00002], // Adjusted X-axis scale
  startRobotMove,
  startRobotRotate,
  robotScaleValue,
  genbotFinalMoveActivate,
  inFirstSection,
  sectionProgress,
}) => {
  const gltf = useLoader(GLTFLoader, "/models/genbot.gltf");
  const ref = useRef(null);

  const startPos = new THREE.Vector3(0, 2, 0);
  const startingCameraPos = new THREE.Vector3(0, 2, 3.5);
  const startingCameraRot = new THREE.Euler(0, 0, 0);

  const targetPos = new THREE.Vector3(10, 2, -20);
  const finalPos = new THREE.Vector3(-16, 3, -10);

  useFrame((state, delta) => {
    if (ref.current) {
      const { position, rotation, scale } = ref.current;

      const camera = state.camera;
      camera.position.set(
        startingCameraPos.x,
        startingCameraPos.y,
        startingCameraPos.z
      );
      camera.rotation.set(
        startingCameraRot.x,
        startingCameraRot.y,
        startingCameraRot.z
      );

      const shrinkingFactor = 1.0 - delta * 5.5;
      const minScaleValue = 0.00000001;
      const maxScaleValue = 0.0015;

      if (!position.equals(targetPos) && startRobotMove) {
        position.lerp(targetPos, delta * 2.5);

        const newScaleValue = Math.max(
          scale.x * shrinkingFactor,
          minScaleValue
        );
        scale.set(newScaleValue, newScaleValue, newScaleValue);
      } else if (!position.equals(startPos)) {
        position.lerp(startPos, delta * 2.5);

        if (
          !scale.equals(
            new THREE.Vector3(robotScaleValue, robotScaleValue, robotScaleValue)
          )
        ) {
          scale.set(robotScaleValue, robotScaleValue, robotScaleValue);
        }
      }

      if (genbotFinalMoveActivate) {
        position.lerp(finalPos, delta * 1.5);

        const finalScaleValue = Math.max(scale.x / shrinkingFactor, 0.007);
        scale.set(finalScaleValue, finalScaleValue, finalScaleValue);

        if (position.distanceTo(finalPos) < 0.1) {
          scale.set(robotScaleValue, robotScaleValue, robotScaleValue);
        }
      }
    }
  });

  return <primitive ref={ref} object={gltf.scene} />;
};

const initialGenBotSize = 0;

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
    [initialGenBotSize, 0.0015]
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

  const [backgroundImages] = useState([
    "/img/1.png",
    "/img/2.png",
    "/img/3.png",
    "/img/4.png",
    "/img/5.png",
  ]);

  const textProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [-1, text.length + 140]
  );

  const backgroundSectionProgress = useTransform(
    sectionThreeScrollYProgress,
    [0, 1],
    [0, backgroundImages.length]
  );

  const robotoRotation = useTransform(
    sectionProgress2,
    [0, 1],
    [0, Math.PI * 2]
  );

  const [glowIndex, setGlowIndex] = useState(-1);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const smoothScroll = (
    end: number,
    duration = 1000,
    callback?: () => void
  ) => {
    const start = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, end - start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

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

  const videoRef = useRef(null);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const handleScroll = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const videoDuration = video.duration;

      if (!isNaN(videoDuration) && videoDuration > 0) {
        const scrollPercentage = Math.max(
          0,
          Math.min(1, scrollTop / (scrollHeight - windowHeight))
        );
        video.currentTime = scrollPercentage * videoDuration;

        // Clear existing timeout if there is any
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Play video while scrolling
        if (video.paused) {
          video.play();
        }

        // Set a timeout to pause the video if no scrolling occurs
        setScrollTimeout(
          setTimeout(() => {
            video.pause();
          }, 300)
        ); // Adjust delay as needed
      }
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener and timeout
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

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
          <ambientLight intensity={4} color="#ffffff" />
          <directionalLight
            position={[0, 0, 1]}
            intensity={3}
            color="#ffffff"
          />

          <directionalLight
            position={[-10, 0, 0]}
            intensity={1}
            color="#ffffff"
          />
          <Suspense fallback={null}>
            <mesh>
              <GenBotModel
                startRobotMove={startRobotMove}
                startRobotRotate={startRobotRotate}
                robotScaleValue={robotScaleValue}
                genbotFinalMoveActivate={genbotFinalMoveActivate}
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
                src="/genbot_transition.mp4"
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
