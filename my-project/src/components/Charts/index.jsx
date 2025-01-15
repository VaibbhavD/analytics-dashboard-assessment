import React from "react";
import SalesByCountryChart from "./SaleByCountry";
import SalesByMakeAndModelChart from "./SaleByMake";
import SalesPercentageByMakePieChart from "./SaleMakePercentage";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 h-full w-full gap-6 p-4 md:p-10">
      <div className="h-full w-full ">
        <LineChart data={data} />
      </div>
      <div className="h-full w-full">
        <BarChart data={data} />
      </div>
      <div className="h-[600px] flex justify-center">
        <PieChart data={data} />
      </div>
      <div className="h-full w-full">
        <SalesByCountryChart data={data} />
      </div>
      <div className="h-full w-full">
        <SalesByMakeAndModelChart data={data} />
      </div>
      <div className="h-[600px] flex justify-center">
        <SalesPercentageByMakePieChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
