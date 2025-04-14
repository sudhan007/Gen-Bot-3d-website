import { useEffect, useRef, useState } from "react";

const Grnbotnotmis = () => {
  const totalImages = 315;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>();
  const framesPerSecond = 29;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const preloadedImages = Array.from(
      { length: totalImages },
      (_, i) => `/gbot/compressed/${String(i + 1).padStart(4, "0")}.webp`
    );
    setImages(preloadedImages);
  }, [totalImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, 1000 / framesPerSecond);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, totalImages]);

  return (
    <div
      ref={containerRef}
      className="bg-lightbg h-[45vh] relative z-10 flex justify-center items-center"
    >
      <p className="absolute top-0 left-[4%] text-2xl font-black text-[#2B2B2B] uppercase tracking-wide">
        Introducing
      </p>

      <img
        src="/img/gbot-text.png"
        alt="G Bot Text"
        className="absolute top-[25%] p-5"
      />

      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={`G Frame ${index + 1}`}
          className="absolute"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 20 : 10,
          }}
        />
      ))}
    </div>
  );
};

export default Grnbotnotmis;
