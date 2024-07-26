import { FlyGenBotCard } from "../components/FlyGenBotCard";

export const FlyGenBotSection = () => {
  return (
    <section className="bg-white text-black font-base h-screen relative flex justify-center items-center">
      <div className="relative">
        <img
          src="/img/genbot-img.png"
          className="w-[800px]"
          alt="Fly Genbot"
          style={{
            zIndex: 1,
            transform: "scaleX(-1)",
          }}
        />
      </div>

      <div className="absolute bg-white z-0 top-10 left-1/2">
        <FlyGenBotCard
          heading="Hazardous environment compatibility"
          subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
        />
      </div>

      {/* <div className="absolute bg-white z-0 top-10 right-1/3">
        <FlyGenBotCard
          heading="Hazardous environment compatibility"
          subHeading="Designed to excel in toxic and hazardous settings, Genbot ensures human safety."
        />
      </div> */}
    </section>
  );
};
