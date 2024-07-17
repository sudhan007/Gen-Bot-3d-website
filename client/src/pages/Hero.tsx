import Navbar from "@/components/Navbar";

const Hero = () => {
  return (
    <>
      <div className='h-screen bg-black flex flex-col w-full'>
        <Navbar />
        <div className='flex-grow'></div>
        <div className='mb-20 container mx-auto'>
          <div className='text-8xl text-[#FFFFFF] font-atvik-regular uppercase'>
            <h1>Advancing</h1>
            <h1>Safety Through</h1>
            <h1 className='text-[#FCD902]'>Innovation</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
