export const MobileNavbar = () => {
  return (
    <div
      className="bg-black shadow-sm absolute top-0 left-0 right-0  p-4 bg-transparent"
      style={{
        zIndex: 100000,
      }}
    >
      <nav className="container mx-auto flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center ">
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
          <span className="text-white font-bold">Menu</span>
        </div>
        <div>
          <div>
            <img src={"/icons/logo.svg"} className="" alt="NavLogo" />
          </div>
        </div>
        <div>
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
