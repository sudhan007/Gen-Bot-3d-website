// @ts-nocheck

import { smoothScroll } from "@/lib/utils";
import {
  useIntersection,
  useInViewport,
  useViewportSize,
} from "@mantine/hooks";
import { useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { AnimatedText } from "../components/AnimatedText";
import { Experience } from "./experiance copy";
import { Footer } from "./footer";
import { FlyGenBotSection } from "./fourth";
import { GBotOne } from "./gbot-one";
import { GbotThree } from "./gbot-three";
import { GbotTwo } from "./gbot-two";

const GenBotModel = ({
  startRobotMove,
  robotScaleValue,
  genbotFinalMoveActivate,
  setGenbotFinalMoveActivate,
  inFirstSection,
  sectionProgress,
  onModelLoad,
}) => {
  const fbx = useLoader(FBXLoader, "Genbot.fbx");
  // const fbx = useFBX("Genbot.fbx");
  const { progress } = useProgress();

  const ref = useRef(null);

  useEffect(() => {
    console.log(progress);
    if (progress === 100) {
      // setTimeout(() => {
      onModelLoad();
      // }, 2000);
    }
  }, [progress]);

  const startPos = useMemo(() => new THREE.Vector3(0, 0, -25), []);
  const targetPos = useMemo(() => new THREE.Vector3(0, 0, -25), []);
  const finalPos = useMemo(() => new THREE.Vector3(0, 6, -23), []);

  const finalGenbotRotation = new THREE.Euler(3, 0, 0);

  const scaleFactor = useMemo(() => 1, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const { position, scale, rotation } = ref.current;
      const camera = state.camera;

      const shrinkingFactor = 1.0 - delta * 8;
      const expandingFactor = 1.0 + delta * 8;
      const minScaleValue = 0.0000001;

      if (!genbotFinalMoveActivate) {
        position.lerp(startPos, delta * 6);
        rotation.set(0, 0, 0);
        scale.setScalar(robotScaleValue * scaleFactor);
        camera.position.set(0, 0, 8);
      } else if (genbotFinalMoveActivate) {
        position.lerp(finalPos, delta * 6);
        rotation.set(0, 0.8, 0);
        camera.position.set(0, 7, 8);
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
const maxGenBotSize = 0.000144;

type Props = {
  onModelLoad: any;
};

export const GenBot = ({ onModelLoad }: Props) => {
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

  const textScale = useTransform(sectionProgress, [0, 1], [1, 0.1]);
  const textOpacity = useTransform(sectionProgress, [0, 0.6], [1, 0]);

  const robotScale = useTransform(
    sectionProgress,
    [0, 1],
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
      const scrollPosition = (200 / 300) * containerHeight;

      smoothScroll(
        secondContainerRef.current.offsetTop + scrollPosition - 100,
        600,
        () => {
          setCurrentSection("section2");
        }
      );
    }
  }, [inViewport]);

  useEffect(() => {
    if (fourthInViewPort && currentSection === "section4") {
      smoothScroll(
        thirdContainerOriginRef.current.offsetTop - 3000,
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
    if (entry?.isIntersecting) {
      smoothScroll(thirdContainerOriginRef.current.offsetTop + 2, 600, () => {
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

  const { width: vwidth } = useViewportSize();

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
          camera={{
            manual: false,
          }}
        >
          {/* <ambientLight intensity={1} /> */}
          {genbotFinalMoveActivate && (
            <directionalLight position={[0, 30, 300]} intensity={3} />
          )}
          <directionalLight
            position={[0, 0, 10]}
            rotateOnAxis={([0, 1, 0], 90)}
            intensity={1}
            scale={10}
          />

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
                onModelLoad={onModelLoad}
              />
            </mesh>
          </Suspense>
        </Canvas>
      </section>

      {/* thirdViewPortRef */}
      <div ref={secondContainerRef}>
        <section
          className="bg-lightbg text-white font-base h-[250vh] flex justify-center"
          ref={thirdViewPortRef}
        >
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
        </section>
      </div>

      <div ref={fourthEntryRef} className="z-[100]">
        <section ref={thirdContainerOriginRef}>
          <div
            className="font-base h-[400vh] bg-white sticky  z-[1000] top-0"
            ref={thirdContainerRef}
          >
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
                    <AnimatedText text={text} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-screen bg-lightbg overflow-hidden sticky top-0 hidden md:block z-[10000]">
                <div className="h-full object-cover sticky top-0 py-[60px] pr-[10%] rounded-r-3xl shadow-xl">
                  {" "}
                  {/* added shadow-lg */}
                  <video
                    ref={videoRef}
                    src="/input-encoded.mp4"
                    muted
                    loop
                    autoPlay={false}
                    preload="auto"
                    className="object-cover h-full rounded-r-2xl shadow-lg"
                  />
                </div>
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

      <Experience />

      <Footer />
    </div>
  );
};
