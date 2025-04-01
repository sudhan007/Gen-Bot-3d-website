import { useEffect, useState } from "react";

export const Footer = () => {

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
              <div className="grid grid-cols-[20%_20%_20%_40%] gap-4">
                <div className="flex flex-col">

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Clean Tech
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Medical and Mobility
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
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


                  {/* <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Bandicoot
                  </p>
                  <div className="flex">
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 24,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      Bandicoot Mini
                    </p>
                    <div
                      style={{
                        width: 57,
                        height: 24,
                        backgroundColor: "rgba(221, 199, 88, 1)",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 5,
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(66, 71, 65, 1)",
                          fontSize: 10,
                          fontWeight: "500",
                          marginTop: 2,
                        }}
                      >
                        NEW
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Mobility Plus
                  </p> */}
                  {/* <div className="flex">
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 24,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      G-Beetle
                    </p>
                    <div
                      style={{
                        width: 57,
                        height: 24,
                        backgroundColor: "rgba(255, 172, 5, 1)",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 5,
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(66, 71, 65, 1)",
                          fontSize: 10,
                          fontWeight: "400",
                          marginTop: 2,
                        }}
                      >
                        BETA
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 24,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      Wilboar
                    </p>
                    <div
                      style={{
                        width: 57,
                        height: 24,
                        backgroundColor: "rgba(255, 172, 5, 1)",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 5,
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(66, 71, 65, 1)",
                          fontSize: 10,
                          fontWeight: "400",
                          marginTop: 2,
                        }}
                      >
                        BETA
                      </p>
                    </div>
                  </div> */}
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
                        fontSize: 24,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      G-Crow
                    </p>
                    <div
                      style={{
                        width: 57,
                        height: 24,
                        backgroundColor: "rgba(221, 199, 88, 1)",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 5,
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(66, 71, 65, 1)",
                          fontSize: 10,
                          fontWeight: "500",
                          marginTop: 2,
                        }}
                      >
                        NEW
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    G-Mammoth
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Genbot Series
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    G bot Series
                  </p>


                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Clean Tech
                  </p>


                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Medical and Mobility
                  </p>


                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Genrobotics
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Clean Tech
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Medical and Mobility
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 24,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Genrobotics
                  </p> */}

                </div>

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
              <div className="grid grid-cols-[50%_50%] gap-4">
                {/* <div className="flex flex-col">
                  {links[0].map((link) => {
                    return (
                      <p
                        key={link.name}
                        className="mb-2 text-[rgba(255, 255, 255, 1)] text-2xl font-normal text-white cursor-pointer hover:opacity-70"
                        onClick={() => {
                          if (!link.url) return;
                          window.open(link.url, "_blank");
                        }}
                      >
                        {link.name}
                      </p>
                    );
                  })}
                </div> */}

                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Home
                  </p>
                  <div className="flex">
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                      className="mb-2"
                    >
                      Robotics & AI
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
                    Careers
                  </p> */}


                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Clean Tech
                  </p>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                    className="mb-2"
                  >
                    Medical and Mobility
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
