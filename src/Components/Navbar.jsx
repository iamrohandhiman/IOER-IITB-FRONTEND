import React from "react";
import image from "../assets/logo.png";

export const Navbar = () => {
  return (
    <div className="backdrop-blur-lg bg-white/30 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left Side - Logo & Links */}
        <div className="flex items-center gap-6 font-sans text-gray-900">
          <img src={image} className="h-10" alt="Logo" />
          {["Safe Mark", "Docs", "Components", "Blocks", "Charts", "Themes", "Colors"].map((item, index) => (
            <div key={index} className="p-2 text-gray-700 hover:text-black transition-colors cursor-pointer">
              {item}
            </div>
          ))}
        </div>

        {/* Right Side - Search Input */}
        <div className="relative">
          <input
            type="text"
            className="bg-white/40 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500 outline-none"
            placeholder="Search HS codes"
          />
        </div>
      </div>
    </div>
  );
};
