import React from "react";
// import header from "../assets/header.png";
import Search from "./Search";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="w-full p-2 md:p-5 bg-[#93a163] grid justify-items-center shadow-[0_1px_0px_rgba(17,17,26,0.1)]">
        <Search />
      </div>
    </>
  );
};

export default Header;
