type Props = {
  heading: string;
  subHeading: string;
};

export const FlyGenBotCard = ({ heading, subHeading }: Props) => {
  return (
    <div
      className="fly-genbot-card flex flex-col items-center justify-center w-[80vw] max-w-[400px] min-h-[14vh] rounded-xl border bg-white"
      style={{
        boxShadow: "rgb(255 202 0) 0px 2px 0px",
      }}
    >
      <div className="w-full h-full flex flex-col p-5 bg-white rounded-xl">
        <h1 className="text-[3.5vw] sm:text-[2vh] font-medium uppercase mb-2 break-before-avoid text-center">
          {heading}
        </h1>
        <p className="text-[2.5vw] sm:text-[1.5vh] text-black leading-normal opacity-95 text-center">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
