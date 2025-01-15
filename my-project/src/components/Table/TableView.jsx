import React, { useState, useEffect, useMemo, Suspense } from "react";
import Loader from "../../components/Loader/Loader.jsx";

const TableView = React.memo(({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Simulate data fetching with a delay for loader demonstration
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate data fetching delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [data]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      ["Make", "Model", "Country"].some((key) =>
        item[key]?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => filteredData.slice(indexOfFirstItem, indexOfLastItem),
    [filteredData, indexOfFirstItem, indexOfLastItem]
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when search text changes
  }, [searchText]);

  const handleSearch = (event) => setSearchText(event.target.value);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 mt-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Vehicle Data
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Make, Model, or Country"
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-sm shadow-md rounded-lg">
        <table className="table-auto w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Make</th>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-left">Model Year</th>
              <th className="px-4 py-2 text-left">Vehicle Type</th>
              <th className="px-4 py-2 text-left">Fuel Type</th>
              <th className="px-4 py-2 text-left">Electric Range (miles)</th>
              <th className="px-4 py-2 text-left">Base MSRP ($)</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Utility Provider</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2">{item.Make}</td>
                  <td className="px-4 py-2">{item.Model}</td>
                  <td className="px-4 py-2">{item["Model Year"]}</td>
                  <td className="px-4 py-2">{item["Electric Vehicle Type"]}</td>
                  <td className="px-4 py-2">{item["Fuel Type"]}</td>
                  <td className="px-4 py-2">{item["Electric Range"]}</td>
                  <td className="px-4 py-2">{item["Base MSRP"]}</td>
                  <td className="px-4 py-2">{item.Country}</td>
                  <td className="px-4 py-2">{item["Electric Utility"]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex overflow-x-auto justify-center gap-2">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
});

export default TableView;
