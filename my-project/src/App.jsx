import React, { useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      </div>
    </div>
  );
}

export default App;
