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

// Importar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyActiveClientsGraph = () => {
  const chartData = {
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
    ],
    datasets: [
      {
        label: "Clients Canceled", // Titutlo
        data: [100, 120, 160, 100, 110, 90, 120, 160, 130, 140, 180, 160],
        backgroundColor: "rgb(204, 43, 43)", // Cor do gráfico
        borderColor: "rgb(212, 75, 51)", // Cor da legenda
        borderWidth: 1,
      },
      {
        label: "Active Clients",
        data: [80, 140, 100, 180, 120, 150, 190, 170, 110, 200, 160, 180],
        backgroundColor: "rgba(75, 126, 192, 0.98)", // Cor do gráfico
        borderColor: "rgba(75, 126, 192, 0.49)", // Cor da legenda
        borderWidth: 1,
      },
      {
        label: "Pending Clients",
        data: [60, 111, 92, 87, 100, 118, 100, 111, 91, 180, 110, 100],
        backgroundColor: "rgba(234, 238, 13, 0.98)", // Cor do gráfico
        borderColor: "rgb(196, 179, 28)", // Cor da legenda
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Active Clients",
        font: {
          size: 24, // Ajusto o tamanho da letra
          weight: "bold",
        },
        color: "#333", //  Mudo a cor do texto
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyActiveClientsGraph;
