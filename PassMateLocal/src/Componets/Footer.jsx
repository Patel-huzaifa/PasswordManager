import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-700 flex flex-col justify-center items-center ">
      <div>
        <span className="logo font-bold align-center text-2xl">
          <span className="font-bold text-green-500">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-500">MATE/&gt;</span>
        </span>
      </div>
      <div className="text-white">
        Created with
        <img className="inline w-7" src="icons/heart.png" alt="Heart" /> by
        CodeWithHuzii
      </div>
    </div>
  );
};

export default Footer;
