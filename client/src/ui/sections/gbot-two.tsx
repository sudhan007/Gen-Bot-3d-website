import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GbotTwo = () => {
  const totalImages = 100;
  const ref = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 1; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/gbot/${paddedIndex}.png`);
    }
    setImages(preloadedImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 24); // 24ms gap per iteration

    return () => clearInterval(interval); // Cleanup on unmount
  }, [totalImages]);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const sectionProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalImages - 1]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // useMotionValueEvent(sectionProgress, "change", (latest) => {
  //   const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
  //   setCurrentIndex(clampedIndex);
  // });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  return (
    <>
      {width > 800 ? (
        <section className="bg-white text-black font-base z-100">
          <div className="bg-white sticky z-[1000] h-[600vh]" ref={ref}>
            <div className="sticky top-0 flex justify-center items-center w-full h-screen">
              {/* G Bot Text */}
              <img
                src="/img/gbot-text.png"
                alt="G Bot Text"
                className="absolute z-10 img2 transform"
              />

              {/* Robot Images */}
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className={`absolute  max-w-[1900px] img h-[100vh]`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 20 : 10,
                    // transition: "opacity 0.3s ease-in-out",
                  }}
                />
              ))} 
            </div>
          </div>
        </section>
      ) : (
        <div
          style={{ position: "sticky", zIndex: 100000 , paddingTop: 100 , paddingBottom  : 100 }}
          className="bg-lightbg h-[75vh]"
          
        > 
          <img style={{ top : '45%' , padding :  20 }} className="absolute" src="/img/gbot-text.png" alt="G Bot Text" />
          <div className=" top-0 flex justify-center  w-full ">
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`G Frame ${index + 1}`} 
                className={`absolute  max-w-[1200px] img `}
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                  zIndex: index === currentIndex ? 20 : 10,
                  // transition: "opacity 0.3s ease-in-out",
                }}
              />
            ))}
          </div>
        </div>
        // <section className="bg-white text-black font-base z-100">
        //   <div className="bg-lightbg  z-[1000] " ref={ref}>
        //     <div className=" top-0 flex justify-center  w-full ">
        //       {/* G Bot Text */}
        //       <img
        //         src="/img/gbot-text.png"
        //         alt="G Bot Text"
        //         className=" z-10 img2 transform"
        //       />

        //       {/* Robot Images */}
        //       {images.map((imgSrc, index) => (
        //         <img
        //           key={index}
        //           src={imgSrc}
        //           alt={`G Frame ${index + 1}`}
        //           className={`  max-w-[1900px] img h-[100vh]`}
        //           style={{
        //             opacity: index === currentIndex ? 1 : 0,
        //             zIndex: index === currentIndex ? 20 : 10,
        //             // transition: "opacity 0.3s ease-in-out",
        //           }}
        //         />
        //       ))}
        //     </div>
        //   </div>
        // </section>
      )}
    </>
  );
};

export default GbotTwo;
