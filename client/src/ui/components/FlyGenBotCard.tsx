type Props = {
  heading: string;
  subHeading: string;
};

export const FlyGenBotCard = ({ heading, subHeading }: Props) => {
  return (
    <div
      className="fly-genbot-card flex flex-col items-center justify-center w-[400px] rounded-xl border bg-white "
      style={{
        boxShadow: "rgb(255 202 0) 0px 7px 0px",
      }}
    >
      <div className="w-full h-full flex flex-col p-5 bg-white rounded-xl">
        <h1 className="text-2xl font-medium uppercase mb-2 break-before-avoid">
          {heading}
        </h1>

        <p className="text-sm text-black  leading-normal opacity-95">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
