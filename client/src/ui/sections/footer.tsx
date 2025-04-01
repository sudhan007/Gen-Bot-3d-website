import { useEffect, useState } from "react";

export const Footer = () => {
  const links = [
    [
      {
        name: "Home",
        url: "",
      },
      {
        name: "Medical & Mobility",
        url: "https://www.genroboticsmedical.com/",
      },
      {
        name: "Robotics & AI",
        url: "",
      },
      {
        name: "Newsroom",
        url: "",
      },
      {
        name: "Careers",
        url: "",
      },
      {
        name: "Contact",
        url: "",
      },
    ],
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 800 ? (
        <section
          className="text-black font-base relative "
          style={{
            backgroundColor: "rgba(66, 71, 65, 1)",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <div className="mx-[5%]">
            <div className=" py-[5%]">
              <div className="flex justify-between">
                <div className="flex gap-12 items-center mt-4">
                  <p className="text-white text-[26px] md:text-[26px] font-normal mb-2 text-nowrap cursor-pointer">
                    Clean Tech
                  </p>

                  <p className="text-white text-[26px] md:text-[26px] font-normal mb-2 text-nowrap cursor-pointer">
                    Medical and Mobility
                  </p>

                  <p className="text-white text-[26px] md:text-[26px] font-normal mb-2 text-nowrap cursor-pointer">
                    Genrobotics
                  </p>
                </div>

                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>

                <div>
                  <div style={{ display: "flex" }}>
                    <a
                      href="https://www.linkedin.com/company/genrobotics/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/li.svg"
                        alt="GenBot 3D model"
                        className="w-[200px] cursor-pointer"
                      />
                    </a>

                    <a
                      href="https://www.facebook.com/genrobotics.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/face.svg"
                        alt="GenBot 3D model"
                        className="w-[200px] cursor-pointer"
                      />
                    </a>

                    <a
                      href="https://twitter.com/genrobotic/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/tw.svg"
                        alt="GenBot 3D model"
                        className="w-[200px] cursor-pointer"
                      />
                    </a>

                    <a
                      href="https://www.instagram.com/genroboticinnovations/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/insta.svg"
                        alt="GenBot 3D model"
                        className="w-[200px] cursor-pointer"
                      />
                    </a>

                    <a
                      href="https://www.youtube.com/@genroboticinnovations5113"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/you.svg"
                        alt="GenBot 3D model"
                        className="w-[200px] cursor-pointer"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr
              style={{
                border: "none",
                height: 2,
                backgroundColor: "rgba(255, 255, 255, 0.46)",
              }}
            />

            <div className="py-[2%]">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    © 2023 Genrobotics - All rights reserved
                  </p>
                </div>
                <div style={{ display: "flex", gap: 30 }}>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Privacy Policy
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Terms & Conditions
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    CSR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          className="text-black font-base relative "
          style={{
            backgroundColor: "rgba(66, 71, 65, 1)",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <div className="mx-[5%]">
            <div className=" py-[5%]">
              <div className="">
                <div className="grid grid-cols-2">
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 21,
                      fontWeight: "400",
                    }}
                    className="mb-6"
                  >
                    Clean Tech
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 21,
                      fontWeight: "400",
                    }}
                    className="mb-6"
                  >
                    Medical and Mobility
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 21,

                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Genrobotics
                  </p>
                </div>

                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <div className="flex">
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      Medical & Mobility
                    </p>
                  </div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Newsroom
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Contact
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Genrobotics
                  </p> */}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", marginTop: 5 }}>
                  <a
                    href="https://www.linkedin.com/company/genrobotics/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/li.svg"
                      alt="GenBot 3D model"
                      className="w-[200px] cursor-pointer"
                    />
                  </a>

                  <a
                    href="https://www.facebook.com/genrobotics.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/face.svg"
                      alt="GenBot 3D model"
                      className="w-[200px] cursor-pointer"
                    />
                  </a>

                  <a
                    href="https://twitter.com/genrobotic/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/tw.svg"
                      alt="GenBot 3D model"
                      className="w-[200px] cursor-pointer"
                    />
                  </a>

                  <a
                    href="https://www.instagram.com/genroboticinnovations/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/insta.svg"
                      alt="GenBot 3D model"
                      className="w-[200px] cursor-pointer"
                    />
                  </a>

                  <a
                    href="https://www.youtube.com/@genroboticinnovations5113"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/you.svg"
                      alt="GenBot 3D model"
                      className="w-[200px] cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* <hr
              style={{
                border: "none",
                height: 2,
                backgroundColor: "rgba(255, 255, 255, 0.46)",
              }}
            /> */}

            <div className="py-[2%]">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 30 }}>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Privacy Policy
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Terms & Conditions
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    CSR
                  </p>
                </div>
              </div>

              <div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop: 20,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  © 2023 Genrobotics - All rights reserved
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
