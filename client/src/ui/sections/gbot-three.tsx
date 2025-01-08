import { AnimatedText } from "../components/AnimatedText";
import { useEffect, useRef, useState } from "react";

const GbotThree = () => {
  const text2 =
    "Get acquainted with G bot. A humanoid robot empowered by AI, redefining collaboration with humans. Designed to work seamlessly alongside humans, G bot is more than just a robotic assistant: it's the future of technological partnership.";

  const [images, setImages] = useState([]);

  const [latest, setLatest] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const preloadedImages: any = [];
    for (let i = 1; i <= totalImages; i++) {
      const paddedIndex = String(i).padStart(4, "0");
      preloadedImages.push(`/turn/${paddedIndex}.png`);
    }

    console.log(preloadedImages, "preloadedImages");
    setImages(preloadedImages);
    setCurrentIndex(0);
  }, []);

  const totalImages = 110;
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
    for (let i = 0; i < totalImages; i++) {
      setTimeout(() => {
        console.log(i, "i");
        setCurrentIndex(i);
      }, i * 24); // 1ms gap per iteration
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
        <div
          className="font-base h-[100vh] bg-lightbg relative z-[101]"
          ref={divRef}
        >
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
            <div className=" w-full md:w-1/2 h-screen flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] pl-[2%]">
              <div className="ml-[5%] px-[10%] h-full z-[10000]">
                <img
                  src="/img/gbot3d.svg"
                  alt="GenBot 3D model"
                  className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-4 twoimg"
                />
                <h4
                  style={{ fontSize: 64, fontWeight: "510" }}
                  className="twoone font-medium mb-8 text-3xl mt-[20px] md:text-5xl sm:text-3xl text-[#2B2B2B]"
                >
                  The Future Of Human-
                  <br />
                  Robot Interaction
                </h4>
                <div className="w-[95%]">
                  <AnimatedText text={text2} />
                </div>
              </div>
            </div>
            <div className="twothree w-full md:w-1/2 h-full flex justify-center items-center relative">
              <img
                src="/img/gbot-text2.png"
                className="w-[600px] z-[1]"
                alt=""
              />

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

              {/* <img
            src="/img/gbot-rightface.png"
            className="w-[300px] absolute top-0 left-0 z-[2] h-full"
            style={{
              transform: "translate(-50%, -50%) scaleX(-1)", // Add scaleX(-1) to flip it horizontally
              top: "50%",
              left: "50%",
            }}
            alt=""
          /> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="font-base h-[90vh] bg-lightbg relative z-[101]"
          ref={divRef}
        >
          <div className="sticky top-0  w-full  md:flex-row">
            <div className=" w-full md:w-1/2  flex flex-col justify-start items-start gap-4 sticky top-0 py-[60px] ">
              <div className=" px-[5%] h-full z-[10000]">
                <img
                  src="/img/gbot3d.svg"
                  alt="GenBot 3D model"
                  className="w-[110px] mt-[20%] md:w-[260px] sm:w-[200px] pb-2 twoimg"
                />
                <h4
                  style={{ fontSize: 28, fontWeight: "510" }}
                  className="twoone font-medium mb-4 text-3xl  md:text-5xl sm:text-3xl text-[#2B2B2B]"
                >
                  The Future Of Human-
                  <br />
                  Robot Interaction
                </h4>
                <div className="w-[95%]">
                  <AnimatedText text={text2} />
                </div>
              </div>
            </div>
            <div className="twothree w-full md:w-1/2 h-full flex justify-center items-center relative" 
            style={{ alignItems : 'end' , justifyContent : "end" , padding : 15 }}>
              <img
                src="/img/gbot-text2.png"
                className="w-[600px] z-[1]"
                alt=""
                style={{ width : '70%'  }}
              />

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
                    left : 100
                    // transition: "opacity 0.3s ease-in-out",
                  }}
                />
              ))}

              {/* <img
            src="/img/gbot-rightface.png"
            className="w-[300px] absolute top-0 left-0 z-[2] h-full"
            style={{
              transform: "translate(-50%, -50%) scaleX(-1)", // Add scaleX(-1) to flip it horizontally
              top: "50%",
              left: "50%",
            }}
            alt=""
          /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GbotThree;
