import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesByMakeAndModelChart = ({ data }) => {
  const makeAndModel = [
    ...new Set(data.map((item) => `${item.Make} ${item.Model}`)),
  ];

  const chartData = {
    labels: makeAndModel,
    datasets: [
      {
        label: "Total Sales",
        data: makeAndModel.map(
          (key) =>
            data.filter((item) => `${item.Make} ${item.Model}` === key).length
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
        text: "Total No Of Models Sells",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Make and Model",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Vehicles Sold",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesByMakeAndModelChart;
