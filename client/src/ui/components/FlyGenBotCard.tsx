type Props = {
  heading: string;
  subHeading: string;
};

export const FlyGenBotCard = ({ heading, subHeading }: Props) => {
  return (
    <div
      className="fly-genbot-card flex flex-col items-center opacity-0 justify-center w-full md:w-[70%] lg:w-[400px] rounded-xl border bg-white"
      style={{
        boxShadow: "#ffca00 0px 3px 0px, rgba(0, 0, 0, 0.1) 12px 18px 20px 4px",
      }}
    >
      <div className="w-full h-full flex flex-col p-3 md:p-5 bg-white rounded-xl text-[#2B2B2B]">
        <h1 className="text-lg font-normal mb-2 break-before-avoid capitalize">
          {heading}
        </h1>

        <p className="text-sm text-[#909090] leading-normal opacity-95">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
