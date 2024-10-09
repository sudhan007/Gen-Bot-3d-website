import { AnimatedText } from "../components/AnimatedText";

export const GbotTwo = () => {
  const text2 =
    "Get acquainted with G bot. A humanoid robot empowered by AI, redefining collaboration with humans. Designed to work seamlessly alongside humans, G bot is more than just a robotic assistant: it's the future of technological partnership.";

  return (
    <div className="font-base h-[100vh] bg-white relative z-[100]">
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
          <img src="/img/gbot-text2.svg" className="w-[600px] z-[1]" alt="" />

          <img
            src="/img/gbot-sidec.png"
            className="w-[400px] absolute top-0 left-0 z-[2] h-full"
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
  );
};
