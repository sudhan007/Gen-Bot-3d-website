import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

type Props = {
  loading: boolean;
};

export const Navbar = ({ loading }: Props) => {
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        anime({
          targets: "nav",
          opacity: [0, 1],
          delay: 500,
          easing: "easeOutExpo",
          duration: 1000,
        });
      }, 200);
    }
  }, [loading]);

  return (
    <div
      className="bg-black shadow-sm absolute top-0 left-0 right-0  p-4 bg-transparent navbar"
      style={{
        zIndex: 100000,
      }}
    >
      <nav className="w-[90%] mx-auto flex items-center justify-between py-1 opacity-0">
        <div className="flex items-center gap-3 w-full justify-between md:w-auto">
          <div className="block md:hidden">
            <div>
              <img src={"/icons/logo.svg"} className="w-56" alt="NavLogo" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="inline-block cursor-pointer rounded-full border-[1.5px] border-white p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3em"
                height="2.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>
            </div>
          </div>
          <span className="text-white font-bold hidden md:block">Menu</span>
        </div>
        <div className="hidden md:block">
          <div>
            <img src={"/icons/logo.svg"} className="" alt="NavLogo" />
          </div>
        </div>
        <div className="hidden md:block">
          <a
            className="group relative inline-block text-sm font-medium text-white"
            href="#"
          >
            <span className="absolute inset-0 border rounded-sm border-current"></span>
            <span className="block border rounded-sm border-current bg-transparent px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              Talk to Us
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};
