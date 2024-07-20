import React from "react";
import { tailspin } from "ldrs";

tailspin.register();
const Loader = () => {
  return (
    <div>
      <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
    </div>
  );
};

export default Loader;
