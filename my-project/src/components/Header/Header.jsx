import React from "react";

const Header = ({ onFileUpload }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <h1 className="text-3xl font-bold">EV Dashboard</h1>
      {/* <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => onFileUpload(e.target.files[0])}
        className="mt-3 p-2 bg-white text-black rounded"
      /> */}
    </header>
  );
};

export default Header;
