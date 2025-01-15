import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Overview from "./components/Overview/Overview.jsx";
import Charts from "./components/Charts/index.jsx";
// import TableView from "./components/TableView/TableView";
import "./App.css";
import { fetchExcelData } from "./Utils/fetchExcelData";
import useDataFilter from "./Hooks/useDataFilter";

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
          <Routes>
            <Route path="/" element={<Overview data={filteredData} />} />
            <Route path="/charts" element={<Charts data={filteredData} />} />
            {/* <Route
                path="/table"
                element={<TableView data={filteredData} />}
              /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
