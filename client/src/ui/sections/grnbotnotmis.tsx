import { useEffect, useState } from "react";

const Grnbotnotmis = () => {
  const totalImages = 238;
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    const preloadedImages = Array.from({ length: totalImages }, (_, i) => {
      const paddedIndex = String(i + 1).padStart(4, "0");
      return `/gbot/${paddedIndex}.webp`;
    });
    setImages(preloadedImages);
  }, []);

  // Smooth animation loop
  useEffect(() => {
    let animationFrame: number;
    const updateFrame = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      animationFrame = requestAnimationFrame(updateFrame);
    };

    animationFrame = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animationFrame);
  }, [totalImages]);

  return (
    <div className="bg-lightbg h-[85vh] relative z-10 flex justify-center items-center">
      <p className="absolute top-0 left-[4%] text-2xl font-black text-[#2B2B2B] uppercase tracking-wide">
        Introducing
      </p>

      <img
        src="/img/gbot-text.png"
        alt="G Bot Text"
        className="absolute top-[25%] p-5"
      />

      {images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt={`G Frame ${currentIndex + 1}`}
          className="absolute max-w-[1200px]"
        />
      )}
    </div>
  );
};

export default Grnbotnotmis;
