const LoadingSpinner = () => {
  return (
    <div className="abosolute h-full w-full inset-0 flex items-center justify-center bg-primary-blue-transparent">
      <div
        style={{
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
        }}
        className="w-24 h-24 border-4 border-slate-900 border-double rounded-full animate-spin flex items-center justify-center"
      >
        <div
          style={{
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
          className="w-14 h-14 border-4 border-slate-900 border-double rounded-full animate-pulse flex justify-center items-center"
        >
          <div
            style={{
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
            className="w-6 h-6 border-4 border-slate-900 border-double rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
