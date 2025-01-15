import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Modal } from "antd";
import "antd/dist/reset.css";

const Overview = React.memo(({ data }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Memoized total vehicles count
  const totalVehicles = useMemo(() => data.length, [data]);

  // Memoized data grouped by model
  const byModel = useMemo(() => {
    return data.reduce((acc, item) => {
      const key = `${item.Make} ${item.Model}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [data]);

  // Memoized data grouped by country
  const byCountry = useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item.Country] = (acc[item.Country] || 0) + 1;
      return acc;
    }, {});
  }, [data]);

  // Top 4 countries and models
  const topCountries = useMemo(() => {
    return Object.entries(byCountry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [byCountry]);

  const topModels = useMemo(() => {
    return Object.entries(byModel)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [byModel]);

  // Recent updates
  const recentGrowth = useMemo(
    () => "EV sales grew by 25% this quarter compared to last year.",
    []
  );
  const recentNews = useMemo(
    () =>
      "Breaking: Tesla Model Y becomes the best-selling EV worldwide in December 2024.",
    []
  );

  // Handlers
  const handleModelClick = useCallback((modelKey) => {
    setSelectedModel(modelKey);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedModel(null);
  }, []);

  // Render model details inside the modal
  const renderModelDetails = useCallback(
    (modelKey) => {
      const details = data.find(
        (item) => `${item.Make} ${item.Model}` === modelKey
      );
      return (
        <div className="p-4 h-full w-full">
          <h3 className="text-2xl font-bold mb-4">
            {details.Make} {details.Model} Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p>
              <strong>Make:</strong> {details.Make}
            </p>
            <p>
              <strong>Year:</strong> {details["Model Year"]}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {details["Electric Vehicle Type"]}
            </p>
            <p>
              <strong>Fuel Type:</strong> {details["Fuel Type"]}
            </p>
            <p>
              <strong>Electric Range:</strong> {details["Electric Range"]} miles
            </p>
            <p>
              <strong>Base MSRP:</strong> ${details["Base MSRP"]}
            </p>
            <p>
              <strong>Country:</strong> {details.Country}
            </p>
            <p>
              <strong>Utility Provider:</strong> {details["Electric Utility"]}
            </p>
            <p>
              <strong>Census Tract:</strong> {details["2020 Census Tract"]}
            </p>
          </div>
          <img
            src="https://crdms.images.consumerreports.org/c_lfill,w_720,q_auto,f_auto/prod/cars/cr/car-versions/2594-2013-tesla-models-base"
            alt={details.Model}
            className="mt-2 w-1/2 h-1/2 object-cover rounded-lg"
          />
        </div>
      );
    },
    [data]
  );

  return (
    <div className="space-y-8 px-4 sm:px-6 md:px-8 lg:p-12 flex flex-col items-center ">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Total Vehicles</h3>
          <p className="text-4xl mt-3 font-extrabold">{totalVehicles}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Top Country</h3>
          <p className="text-4xl mt-3 font-extrabold">
            {topCountries[0] ? topCountries[0][0] : "N/A"}
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Best Seller</h3>
          <p className="text-2xl mt-2 font-semibold">
            {topModels[0] ? topModels[0][0] : "N/A"}
          </p>
        </div>
      </motion.div>

      {/* Top Models */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold mb-6">Top 4 Vehicle Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topModels.map(([modelKey, count]) => (
            <motion.div
              key={modelKey}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-bold mb-2">{modelKey}</h3>
              <p className="text-lg">Total: {count}</p>
              <span
                className="text-blue-400 cursor-pointer "
                onClick={() => handleModelClick(modelKey)}
              >
                View details
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Countries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold mb-6">Top 4 Countries by Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCountries.map(([country, count]) => (
            <motion.div
              key={country}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-bold mb-2">{country}</h3>
              <p className="text-lg">Vehicles Sold: {count}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal for Model Details */}
      <Modal
        title="Vehicle Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width="100%"
        height="50%"
        className="absolute top-10"
      >
        {selectedModel && renderModelDetails(selectedModel)}
      </Modal>

      {/* Recent Updates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Updates</h2>
        <div className="space-y-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Growth</h3>
            <p className="text-base mt-2">{recentGrowth}</p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">News</h3>
            <p className="text-base mt-2">{recentNews}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default Overview;
