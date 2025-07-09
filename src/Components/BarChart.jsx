import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function IncomeCharts() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenus",
        data: [1200, 1900, 3000, 2500, 2200, 2700],
        backgroundColor: "#3B82F6",
        borderRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
