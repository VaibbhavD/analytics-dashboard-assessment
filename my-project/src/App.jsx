import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import { fetchExcelData } from "./Utils/fetchExcelData";
import useDataFilter from "./Hooks/useDataFilter";
import Loader from "./components/Loader/Loader";

// Lazy load components
const Overview = lazy(() => import("./components/Overview/Overview"));
const Charts = lazy(() => import("./components/Charts/index"));
const TableView = lazy(() => import("./components/Table/TableView"));
const MapContainer = lazy(() => import("./components/Map/MapContainer"));

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
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Header */}
        <Header onMenuClick={handleMenuClick} />

        {/* Main Content */}
        <div className="flex-grow overflow-auto p-4 mt-4">
          {/* Suspense for lazy-loaded components */}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Overview data={filteredData} />} />
              <Route path="/charts" element={<Charts data={filteredData} />} />
              <Route
                path="/Map"
                element={<MapContainer data={filteredData} />}
              />
              <Route
                path="/table"
                element={<TableView data={filteredData} />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
