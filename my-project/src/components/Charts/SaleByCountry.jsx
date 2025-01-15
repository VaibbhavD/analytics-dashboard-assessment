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

const SalesByCountryChart = ({ data }) => {
  const countries = [...new Set(data.map((item) => item.Country))];

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "Total Sales",
        data: countries.map(
          (country) => data.filter((item) => item.Country === country).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        text: "Sales by Country",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Countries",
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

export default SalesByCountryChart;
