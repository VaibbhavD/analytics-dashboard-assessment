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

const BarChart = ({ data }) => {
  const makes = [...new Set(data.map((item) => item.Make))];

  const chartData = {
    labels: makes,
    datasets: [
      {
        label: "Average Electric Range",
        data: makes.map((make) => {
          const filtered = data.filter((item) => item.Make === make);
          const totalRange = filtered.reduce(
            (sum, item) => sum + item["Electric Range"],
            0
          );
          return (totalRange / filtered.length).toFixed(2);
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
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
        text: "Average Electric Range by Make",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Vehicle Make",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Electric Range (miles)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
