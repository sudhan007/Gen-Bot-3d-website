import { AnimatedText } from "../../components/AnimatedText";

export const GbotTwo = () => {
  const text2 =
    "Get acquainted with G bot. A humanoid robot empowered by AI, redefining collaboration with humans. Designed to work seamlessly alongside humans, G bot is more than just a robotic assistant: it's the future of technological partnership.";

  return (
    <div className="font-base h-[100vh] bg-lightbg relative z-[101]">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
          <div className="ml-[5%] px-[10%] h-full z-[10000]">
            <img
              src="/img/bot3d.svg"
              alt="GenBot 3D model"
              className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4"
            />
            <h4 className="font-medium mb-8 text-3xl mt-[20px] md:text-5xl sm:text-3xl text-[#2B2B2B]">
              Your Safety Partner
            </h4>
            <div className="w-[95%]">
              <AnimatedText text={text2} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex justify-center items-center relative">
          <img src="/img/gbot-text2.png" className="w-[600px] z-[1]" alt="" />

          <img
            src="/img/gbot-rightface.png"
            className="w-[300px] absolute top-0 left-0 z-[2] h-full"
            style={{
              transform: "translate(-50%, -50%) scaleX(-1)", // Add scaleX(-1) to flip it horizontally
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
