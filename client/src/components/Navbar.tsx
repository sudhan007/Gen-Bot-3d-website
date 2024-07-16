import NavLogo from "/GenroboticsLogo_Final-02.svg";

const Navbar = () => {
  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-5'>
        <div className='flex items-center gap-3'>
          <a
            className='inline-block rounded-full border border-gray-600 bg-transparent p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'
            href='#'>
            <span className='sr-only'> Download </span>

            <svg
              className='size-5 rtl:rotate-180'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </a>
        </div>
        <div>
          <div>
            <img src={NavLogo} alt='NavLogo' />
          </div>
        </div>
        <div>button</div>
      </nav>
    </>
  );
};

export default Navbar;
