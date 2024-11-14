const SuspenseFallback = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="suspense-loader">
        <div className="suspense-loader-bar"></div>
        <div className="suspense-loader-bar"></div>
        <div className="suspense-loader-bar"></div>
        <div className="suspense-loader-bar"></div>
      </div>
    </div>
  );
};

export default SuspenseFallback;
