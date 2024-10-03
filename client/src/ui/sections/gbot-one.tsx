export const GBotOne = () => {
  return (
    <section className="relative bg-white text-black font-base min-h-screen flex justify-center items-center overflow-hidden z-[100]">
      {/* First Image (Behind the second one) */}
      <img
        src="/img/gbot-text.svg"
        alt="G Bot Text"
        className="absolute z-[1]" // This image will stay behind
      />

      {/* Second Image (Centered on top of the first image) */}
      <img
        src="/img/gbot-intro.png"
        alt="G Facing straight"
        className="absolute z-[2]" // This image stays on top of the first one
      />
    </section>
  );
};
