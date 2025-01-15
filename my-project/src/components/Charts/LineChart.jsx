import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  // Group data by 'Make' and calculate the average Electric Range for each Make
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item["Make"]]) {
      acc[item["Make"]] = { totalRange: 0, count: 0 };
    }
    acc[item["Make"]].totalRange += item["Electric Range"];
    acc[item["Make"]].count += 1;
    return acc;
  }, {});

  // Create labels and dataset from the grouped data
  const labels = Object.keys(groupedData);
  const dataset = labels.map(
    (make) => groupedData[make].totalRange / groupedData[make].count
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Average Electric Range by Make",
        data: dataset,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
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
          text: "Companies",
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

  return <Line data={chartData} options={options} className="w-1/2" />;
};

export default LineChart;
