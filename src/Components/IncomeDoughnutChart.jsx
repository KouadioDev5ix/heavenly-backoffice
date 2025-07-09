import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

// Enregistrement des composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomeDoughnutChart() {
  const data = {
    labels: ["Services", "Produits", "Abonnements"],
    datasets: [
      {
        label: "Revenus",
        data: [3500, 2000, 1500],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label} : ${tooltipItem.raw} FCFA`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px", margin: "auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
