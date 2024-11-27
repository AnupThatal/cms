import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import datalabels plugin

// Register ChartJS components and plugins
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ femaleCount, malecount, family_reside }) {
  // Prepare chart data
  const chartData = {
    labels: ["Female Count", "Male Count"],
    datasets: [
      {
        label: `Data Distribution (${family_reside || "N/A"})`, // Dynamic label with fallback
        data: [femaleCount, malecount], // Use the passed props
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Data Distribution (Pie Chart)",
      },
      datalabels: {
        color: "#fff", // Label text color
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value, context) => {
          return value; // Show the raw value (femaleCount/maleCount)
        },
      },
    },
  };

  return (
    <div style={{ width: "250px", height: "250px", margin: "auto" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
