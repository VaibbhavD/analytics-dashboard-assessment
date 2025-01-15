import React from "react";
import Logo from "../../assets/logo.png";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-blue-600 text-white px-4 py-2 shadow-lg flex items-center justify-between fixed top-0 gap-2 left-0 w-full z-50">
      <div className="flex gap-2">
        {" "}
        <img src={Logo} width="70px" height="fit" loading="lazy" />
        <h1 className="text-3xl font-bold pt-4">Dashboard</h1>
      </div>
      <button onClick={onMenuClick} className="text-white text-3xl md:hidden">
        &#9776;
      </button>
    </header>
  );
};

export default Header;
