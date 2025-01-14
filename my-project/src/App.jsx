// App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import { fetchExcelData } from "./Utils/fetchExcelData";
import useDataFilter from "./Hooks/useDataFilter";
import Overview from "./components/Overview.jsx/Overview";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [evData, setEvData] = useState([]);
  const [filters, setFilters] = useState({});
  const filteredData = useDataFilter(evData, filters);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchExcelData(`/DataSet.csv`);
      setEvData(data);
    };
    loadData();
  }, []);

  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header onMenuClick={handleMenuClick} />
        <div className="flex-grow overflow-auto p-4">
          <Overview data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default App;
