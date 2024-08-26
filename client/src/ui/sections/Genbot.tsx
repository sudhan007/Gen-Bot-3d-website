// @ts-nocheck

import { useIntersection } from "@mantine/hooks";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FlyGenBotSection } from "./FlyGenBotSection";

type Props = {
  scale: number[];
  startRobotMove: boolean;
  startRobotRotate: boolean;
};

const GenBotModel = ({
  scale = [0.00002, 0.000002, 0.00002],
  startRobotMove,
  startRobotRotate,
  robotScaleValue,
  genbotFinalMoveActivate,
  inFirstSection,
  sectionProgress,
}) => {
  // const fbx = useFBX("Genbot.fbx");
  const gltf = useLoader(GLTFLoader, "/genbot.glb");
  const ref = useRef(null);

  const startPos = new THREE.Vector3(-3.5, 0.9, 0);
  const targetPos = new THREE.Vector3(3.5, 0.1, 1);
  const finalPos = new THREE.Vector3(-3, 0.9, 0);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.scale.set(robotScaleValue, robotScaleValue, robotScaleValue);

      // if (startRobotMove) {
      //   ref.current.position.lerp(targetPos, delta * 2.5);
      // } else {
      //   ref.current.position.lerp(startPos, delta * 2.5);
      // }

      // if (startRobotMove && startRobotRotate) {
      //   const rotationSpeed = 1;
      //   ref.current.rotation.y = (sectionProgress.get() / 200) * Math.PI * 2;
      // } else {
      //   ref.current.rotation.y = 0;
      // }

      // if (genbotFinalMoveActivate) {
      //   ref.current.position.lerp(finalPos, delta * 2.5);
      //   ref.current.rotation.y = 0.5;
      //   ref.current.scale.set(
      //     robotScaleValue,
      //     robotScaleValue,
      //     robotScaleValue
      //   );
      // } else {
      //   ref.current.position.lerp(targetPos, delta * 2.5);
      //   ref.current.rotation.y = 0;
      //   ref.current.scale.set(
      //     robotScaleValue,
      //     robotScaleValue,
      //     robotScaleValue
      //   );
      // }
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
    [initialGenBotSize, 0.002]
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

  const [scrollDirection, setScrollDirection] = useState("down");
  const prevScrollY = useRef(0);

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  useMotionValueEvent(backgroundSectionProgress, "change", (latest) => {
    setBackgroundIndex(Math.floor(latest));
  });

  const smoothScroll = (end: number, duration = 700, callback?: () => void) => {
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
      setStartRobotMove(true);
      smoothScroll(thirdContainerOriginRef.current.offsetTop, 1000);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (backgroundIndex === backgroundImages.length - 1) {
      console.log("last section");
    }
  }, [backgroundIndex]);

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
            zIndex: 5,
          }}
        >
          <directionalLight castShadow position={[0, 10, 20]} intensity={5} />
          {/* <meshStandardMaterial /> */}
          <PerspectiveCamera makeDefault manual />
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
          className="w-[600px] fixed top-[15%] transform"
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
          style={{
            zIndex: 1,
          }}
        >
          <div className="sticky top-0 h-screen w-full flex">
            <div className="bg-white w-1/2 h-screen flex flex-col justify-start items-start gap-4">
              <div className="mx-[10%]">
                <img
                  src="/img/bot3d.svg"
                  alt="GenBot 3D model"
                  className="w-[320px] mt-[30%]"
                />
                {/* <div className="mt-[30%]">
                  <a
                    className="group relative inline-block text-sm font-medium text-black"
                    href="#"
                  >
                    <span className="absolute inset-0 border-b-[1px] border-r-[1px] rounded-sm border-current"></span>
                    <span className="block border rounded-sm border-current bg-transparent px-12 py-3 -translate-x-2 -translate-y-2  bg-yellow border-b-0 border-r-0">
                      GENBOT
                    </span>
                  </a>
                </div> */}

                <h4 className="font-medium text-7xl mt-[20px]">
                  Your Safety Partner
                </h4>

                <motion.p className="mt-[10px] text-3xl leading-relaxed font-normal">
                  {text.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0.01 }}
                      animate={{ opacity: index <= glowIndex ? 1 : 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            </div>
            <div className="w-1/2 h-full relative bg-transparent overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={backgroundIndex}
                  className="absolute inset-0 bg-cover bg-center"
                  initial={{ y: scrollDirection === "down" ? "100%" : "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: scrollDirection === "down" ? "-100%" : "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    backgroundImage: `url(
                      ${backgroundImages[backgroundIndex]}
                    )`,
                  }}
                />
              </AnimatePresence>
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
