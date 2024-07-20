import React from "react";
import { tailspin } from "ldrs";

tailspin.register();
const Loader = () => {
  return (
    <div className="loading">
      <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
