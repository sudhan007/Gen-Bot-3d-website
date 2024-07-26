export const FlyGenBotSection = () => {
  return (
    <section className="bg-white text-black font-base h-screen relative flex justify-center items-center">
      <div className="relative">
        <img
          src="/img/3rd-section.png"
          className="w-[1200px]"
          alt="Fly Genbot"
          style={{
            zIndex: 1,
          }}
        />

        <img
          src="/img/overlay.svg"
          className="absolute top-0 left-0 w-[1300px]"
          alt="Fly Genbot"
          style={{
            zIndex: 2,
          }}
        />
      </div>
    </section>
  );
};
