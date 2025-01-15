import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data }) => {
  const eligibilityCounts = data.reduce(
    (acc, item) => {
      const eligibility =
        item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
      if (
        eligibility === "Clean Alternative Fuel Vehicle Eligible" ||
        eligibility ===
          "Eligibility unknown as battery range has not been researched"
      ) {
        acc.eligible += 1;
      } else {
        acc.notEligible += 1;
      }
      return acc;
    },
    { eligible: 0, notEligible: 0 }
  );

  const chartData = {
    labels: ["Eligible", "Not Eligible"],
    datasets: [
      {
        data: [eligibilityCounts.eligible, eligibilityCounts.notEligible],
        backgroundColor: ["#36A2EB", "#FF6384"],
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
        text: "CAFV Eligibility Distribution",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
