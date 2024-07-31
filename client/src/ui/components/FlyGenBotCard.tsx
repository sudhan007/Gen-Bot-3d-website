type Props = {
  heading: string;
  subHeading: string;
};

export const FlyGenBotCard = ({ heading, subHeading }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-[400px] rounded-xl border bg-white"
      style={{
        boxShadow: "rgb(255 202 0) 0px 7px 0px",
      }}
    >
      <div className="w-full h-full flex flex-col p-5 bg-white rounded-xl">
        <h1 className="text-2xl font-medium capitalize mb-2 break-before-avoid">
          {heading}
        </h1>

        <p className="text-sm text-gray-400 leading-normal">{subHeading}</p>
      </div>
    </div>
  );
};
