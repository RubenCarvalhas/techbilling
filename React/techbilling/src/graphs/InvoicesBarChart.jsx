import React from "react";
import { Bar } from "react-chartjs-2";
// Importa componentes necessários de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InvoicesBarChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Meses
    datasets: [
      {
        label: "",
        data: [111, 156, 162, 210, 172, 191, 200, 153, 214, 311, 121, 221], // Número de faturas
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#5B7B7A",
          "#3C887E",
          "#9CADCE",
          "#7EC4CF",
          "#222E50",
          "#96BDC6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
      title: {
        display: true,
        text: "Invoices across the year",
        font: {
          size: 24, // Define o tamanho da letra
          family: "'Arial', sans-serif", // Altera a fonte
          weight: "bold",
          lineHeight: 1.2, // Ajusta a altura da linha
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return <Bar data={data} options={options} />;
};

export default InvoicesBarChart;
