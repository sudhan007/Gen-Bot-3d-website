import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Experience = () => {
  const totalImages = 250;
  const ref = useRef(null);
  const [images, setImages] = useState([]);

  const [latest, setLatest] = useState(true);

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 1; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/bottom/${paddedIndex}.webp`);
    }

    console.log(preloadedImages, "preloadedImages");
    setImages(preloadedImages);
    setCurrentIndex(0);
  }, []);

  // const { scrollYProgress } = useScroll({
  //   target: ref,
  // });

  // const sectionProgress = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [0, totalImages - 1]
  // );

  const [currentIndex, setCurrentIndex] = useState(0);

  // setTimeout(() => {
  //   const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
  //   setCurrentIndex(clampedIndex);
  // }, 100);

  // useMotionValueEvent(sectionProgress, "change", (latest) => {

  //   const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
  //   setCurrentIndex(clampedIndex);
  // });

  const handleEnterDiv = () => {
    console.log("User focused on the div!");
    // Call your function here
  };

  //  let hhh = () => {
  //   const interval = setInterval(() => {
  //     setLatest((prev) => {
  //       if (prev < totalImages) {
  //         return prev + 1;
  //       } else {
  //         clearInterval(interval); // Stop when it reaches 100
  //         return prev;
  //       }
  //     });
  //   }, 100); // 100ms interval

  //   return () => clearInterval(interval); // Cleanup on unmount
  //  }

  // useEffect(() => {
  //   const clampedIndex = Math.min(Math.floor(latest), totalImages - 1);
  //   console.log(clampedIndex, "clampedIndex");
  //   setCurrentIndex(clampedIndex);
  // }, [latest]);

  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          handleDivEnter(); // Call your function when div enters the screen
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const handleDivEnter = () => {
    console.log("Div entered the screen!");

    // Add your logic here

    if (latest === true) {
      setLatest(false);
      setTimeout(() => {
        setLatest(true);
        console.log("Hello World!");
      }, 8000);
      for (let i = 0; i < totalImages; i++) {
        setTimeout(() => {
          console.log(i, "i");
          setCurrentIndex(i);
        }, i * 24); // 1ms gap per iteration
      }
    }
  };

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
          <div
            className="  sticky z-[1000]  "
            ref={divRef}
            style={{ backgroundColor: "#424741", overflow: "hidden" }}
          >
            <div className="  px-[10%] ">
              <div
                className="mt-[80px]"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  className="threeone"
                  style={{
                    color: "#fff",
                    fontSize: 64,
                    fontWeight: "400",
                    fontFamily: "AktivGrotesk",
                  }}
                >
                  EXPERIENCE THE{" "}
                  <span style={{ color: "#FCD902" }}>FUTURE TODAY</span>
                </p>

                <div
                  style={{
                    background: "#FCD902",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 100,
                    paddingRight: 100,
                  }}
                >
                  <p
                    style={{ color: "#000", fontSize: "1.6rem" }}
                    className="threetwo"
                  >
                    what’s the hold
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p
                  className="fgbidcjk"
                  style={{
                    color: "#fff",
                    fontSize: 40,
                    fontWeight: "400",
                    lineHeight: "3rem",
                    fontFamily: "AktivGrotesk",
                  }}
                >
                  Explore the innovative solutions of Genbot and G Bot.
                  <br />
                  Embrace the future of technology and human-robot
                  <br />
                  interaction. Begin your journey to safer, more
                  <br />
                  efficient, and tech-driven possibilities today.
                </p>
              </div>
            </div>
            <div style={{ marginTop : -290 }} className="sticky top-0 flex justify-center items-center w-full h-screen">
              {/* Robot Images */}
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className={`absolute `}
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
        <section className="bg-white text-black font-base z-100">
          <div
            className="  sticky z-[1000]  "
            ref={divRef}
            style={{ backgroundColor: "#424741", overflow: "hidden" }}
          >
            <div className="  px-[5%] ">
              <div
                className="mt-[80px]"
                style={{
                  display: "flex", 
                  justifyContent: "center",
                }}
              >
                <p
                  className="threeone"
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "400",
                    fontFamily: "AktivGrotesk",
                    textAlign : 'center'
                  }}
                >
                  EXPERIENCE THE<br />
                  <span style={{ color: "#FCD902" }}>FUTURE TODAY</span>
                </p>

              
              </div>

              <div className="mt-3">
                <p
                  className="fgbidcjk"
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "400", 
                    fontFamily: "AktivGrotesk",
                    textAlign : 'center'
                  }}
                >
                  Explore the innovative solutions of Genbot and G Bot. 
                  Embrace the future of technology and human-robot 
                  interaction. Begin your journey to safer, more 
                  efficient, and tech-driven possibilities today.
                </p>
              </div>
 
              <div
                  style={{
                    background: "#FCD902",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", 
                    marginTop : 20 ,
                    padding : 10 ,
                    width : '50%',
                    margin : 'auto'
                  }}
                >
                  <p
                    style={{ color: "#000", fontSize: 15 }}
                    className="threetwo"
                  >
                    what’s the hold
                  </p>
                </div> 

             
            </div>
            <div className="sticky top-0 flex justify-center items-center  h-screen" style={{ height : '32vh' }}>
              {/* Robot Images */}
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`G Frame ${index + 1}`}
                  className={`absolute `}
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
      )}
    </>
  );
};
