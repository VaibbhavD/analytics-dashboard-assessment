import React, { Suspense } from "react";
import Loader from "../../components/Loader/Loader.jsx";

const SalesByCountryChart = React.lazy(() => import("./SaleByCountry"));
const SalesByMakeAndModelChart = React.lazy(() => import("./SaleByMake"));
const SalesPercentageByMakePieChart = React.lazy(() =>
  import("./SaleMakePercentage")
);
const LineChart = React.lazy(() => import("./LineChart"));
const BarChart = React.lazy(() => import("./BarChart"));
const PieChart = React.lazy(() => import("./PieChart"));

const Dashboard = React.memo(({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:p-10 h-full">
      <Suspense fallback={<Loader />}>
        {/* Line Chart */}
        <div className="col-span-1 h-full w-full">
          <LineChart data={data} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* Bar Chart */}
        <div className="h-full w-full">
          <BarChart data={data} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* Pie Chart */}
        <div className="h-[400px] w-full flex justify-center">
          <PieChart data={data} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* Sales by Country */}
        <div className="h-full w-full">
          <SalesByCountryChart data={data} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* Sales by Make and Model */}
        <div className="h-full w-full">
          <SalesByMakeAndModelChart data={data} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* Sales Percentage by Make */}
        <div className="h-[400px] w-full flex justify-center">
          <SalesPercentageByMakePieChart data={data} />
        </div>
      </Suspense>
    </div>
  );
});

export default Dashboard;
