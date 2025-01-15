import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SalesPercentageByMakePieChart = ({ data }) => {
  const makes = [...new Set(data.map((item) => item.Make))];
  const totalSales = data.length;

  const chartData = {
    labels: makes,
    datasets: [
      {
        data: makes.map((make) =>
          (
            (data.filter((item) => item.Make === make).length / totalSales) *
            100
          ).toFixed(2)
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Percentage of Sales by Make",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default SalesPercentageByMakePieChart;
