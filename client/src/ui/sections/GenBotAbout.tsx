import { motion } from "framer-motion";

const TypedText = ({ text }: any) => {
  const characters = text.split("");
  return (
    <motion.p
      className="mt-[10px] text-3xl leading-relaxed font-normal"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {characters.map((char: any, index: any) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, color: "rgba(0,0,0,0.2)" }}
          animate={{ opacity: 1, color: "rgba(0,0,0,1)" }}
          transition={{ duration: 0.1, delay: index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const GenBotAbout = () => {
  return (
    <div className="font-base h-screen relative bg-lightbg">
      <div className="w-[90%] mx-auto flex">
        <div className="bg-white w-[50%] h-screen z-[300] flex flex-col justify-start items-start gap-4">
          <div className="mx-[10%]">
            <img src="/img/bot3d.svg" className="w-[200px] mt-[30%]" />

            <motion.h4
              className="font-medium text-7xl mt-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Your Safety Partner
            </motion.h4>

            <TypedText text="Meet Genbot, the semi humanoid robotic innovation with state-of-the-art features designed to excel in industrial and toxic environments, Genbot ensures human safety by working side by side, eliminating the need for humans to expose themselves to hazardous conditions." />
          </div>
        </div>
        <div className="bg-darkbg w-[50%] h-screen"></div>
      </div>
    </div>
  );
};

export default GenBotAbout;
