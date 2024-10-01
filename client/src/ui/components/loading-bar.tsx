import { useLoading } from "../../context/GlobalLoadingContext";

const LoadingBar = () => {
  const { loading } = useLoading();

  return loading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "blue",
      }}
    >
      {/* Add animation or progress logic if needed */}
    </div>
  ) : null;
};

export default LoadingBar;
