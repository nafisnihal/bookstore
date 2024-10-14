import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen gap-x-2 flex justify-center items-center">
      <div className="w-5 h-5 bg-[#d991c2] animate-bounce rounded-full [animation-delay:.7s]"></div>
      <div className="w-5 h-5 bg-[#9869b8] animate-bounce rounded-full [animation-delay:.3s]"></div>
      <div className="w-5 h-5 bg-[#6756cc] animate-bounce rounded-full [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loader;
