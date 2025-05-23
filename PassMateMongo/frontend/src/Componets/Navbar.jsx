import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-slate-700 text-white">
      <div className="mycontainer flex text-2xl items-center py-5  h-20 justify-between px-4">
        <span className="logo font-bold align-center text-2xl">
          <span className="font-bold text-green-500">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-500">MATE/&gt;</span>
        </span>

        <button className="text-white  flex items-center justify-center cursor-pointer p-2 w-15 h-15 rounded-2xl">
          <img
            className="w-10 p-1 pt-5 cursor-pointer invert"
            src="icons/github.svg"
            alt="github"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
