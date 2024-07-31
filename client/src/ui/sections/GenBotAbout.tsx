import { useFBX } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

const GenBot = () => {
  const fbx = useFBX("Genbot.fbx");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      state.camera.lookAt(ref.current.position);
    }
  });

  return (
    <primitive
      ref={ref}
      object={fbx}
      scale={[0.00002, 0.00002, 0.00002]}
      // position={[0, 0, 0]}
    />
  );
};

export const GenBotAbout = () => {
  const containerRef: any = useRef<HTMLDivElement>(null);
  const [text] = useState(
    "Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions."
  );

  const [backgroundImages] = useState<string[]>([
    "/img/1.png",
    "/img/2.png",
    "/img/3.png",
    "/img/4.png",
    "/img/5.png",
  ]);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [-1, text.length + 70]
  );

  const bagroundSectionProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, backgroundImages.length]
  );

  const [glowIndex, setGlowIndex] = useState(-1);
  const [bagroundIndex, setBagroundIndex] = useState(0);

  useMotionValueEvent(textProgress, "change", (latest) => {
    setGlowIndex(Math.floor(latest));
  });

  useMotionValueEvent(bagroundSectionProgress, "change", (latest) => {
    setBagroundIndex(Math.floor(latest));
  });

  return (
    <div className="font-base h-[500vh] bg-white relative" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full flex">
        <div className="bg-white w-1/2 h-screen  flex flex-col justify-start items-start gap-4">
          <div className="mx-[10%]">
            <img
              src="/img/bot3d.svg"
              alt="GenBot 3D model"
              className="w-[200px] mt-[30%]"
            />
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

        <div className="w-1/2 z-[300] h-full relative bg-white">
          <motion.div
            className="sticky top-50 left-0 w-full h-full  bg-red-50"
            animate={{
              background: `url(${backgroundImages[bagroundIndex]}) no-repeat center center`,
            }}
            transition={{ duration: 0.6 }}
          >
            <Canvas
              gl={{ antialias: false }}
              camera={{ position: [0, 1, 16], fov: 25, near: 1, far: 20 }}
              style={{
                zIndex: 100,
              }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <directionalLight position={[-2, 5, 2]} intensity={1} />
              <Suspense fallback={null}>
                <GenBot />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
