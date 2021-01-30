import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <FadeLoader color="#02a39b" width={15} radius={10} margin={22} />
    </div>
  );
};

export default Loader;
