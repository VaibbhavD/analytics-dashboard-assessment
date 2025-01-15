import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* <div className="hidden md:block md:relative md:w-1/5 bg-blue-700 text-white p-5 h-full">
        <ul className="space-y-4">
          <li className="cursor-pointer p-2 rounded hover:bg-white hover:text-black">
            Overview
          </li>
          <li className="cursor-pointer p-2 rounded hover:bg-white hover:text-black">
            Trends
          </li>
          <li className="cursor-pointer p-2 rounded hover:bg-white hover:text-black">
            Location Insights
          </li>
          <li className="cursor-pointer p-2 rounded hover:bg-white hover:text-black">
            Table View
          </li>
        </ul>
      </div> */}

      <motion.div
        className={`fixed top-12 left-0 h-screen w-2/3  bg-blue-700 text-white p-5 z-50 md:relative md:w-1/5 ${
          isOpen ? "block" : "hidden md:block"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-4 text-white text-2xl md:hidden"
        >
          &times;
        </button>
        <ul className="space-y-4 pt-8">
          <Link to={"/"} onClick={onClose} className="pt-2">
            <motion.li
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="cursor-pointer p-2 rounded"
            >
              Overview
            </motion.li>
          </Link>
          <Link to={"/charts"} className="pt-2" onClick={onClose}>
            <motion.li
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="cursor-pointer p-2 rounded"
            >
              Trends
            </motion.li>
          </Link>
          <Link to={"/Map"} className="pt-2" onClick={onClose}>
            <motion.li
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="cursor-pointer p-2 rounded"
            >
              {" "}
              Location Insights
            </motion.li>
          </Link>
          <Link to={"/table"} className="pt-2" onClick={onClose}>
            <motion.li
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="cursor-pointer p-2 rounded"
            >
              {" "}
              Table View
            </motion.li>
          </Link>
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
