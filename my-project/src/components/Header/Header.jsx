import React from "react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-3xl font-bold">EV Dashboard</h1>
      <button onClick={onMenuClick} className="text-white text-3xl md:hidden">
        &#9776;
      </button>
    </header>
  );
};

export default Header;
