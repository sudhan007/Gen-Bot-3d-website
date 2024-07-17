import navlogo from "../../public/logo.svg";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-5'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center '>
            <div className='inline-block cursor-pointer rounded-full border border-gray-300  p-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='2.3em'
                height='2.3em'
                viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='#FFFFFF'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={0.5}
                  d='M4 8h16M4 16h16'></path>
              </svg>
            </div>
          </div>
          <span>Menu</span>
        </div>
        <div>
          <div>
            <img src={navlogo} className='' alt='NavLogo' />
          </div>
        </div>
        <div>
          <a className='inline-block rounded border border-[#B5B5B5] px-12 py-3 text-sm font-medium text-[#B5B5B5] '>
            Talk to us
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
