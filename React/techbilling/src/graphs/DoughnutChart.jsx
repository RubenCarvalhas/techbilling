import React from "react";
import { Doughnut } from "react-chartjs-2"; // Importa o gráfico de rosca do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Regista os componentes necessários para o Chart.js
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Dados do gráfico
  const data = {
    labels: ["Coins", "Product", "IVAs", "Discounts"], // Labels para as secções do gráfico
    datasets: [
      {
        data: [65, 42, 31, 50], // Valores para cada secção do gráfico
        backgroundColor: ["#2C66A0", "#083A78", "#4B5C95", "#5C71B6"], // Cores das secções
        hoverBackgroundColor: ["#3B90E4", "#a8d0db", "#6880CE", "#7590E7"], // Cores ao passar o cursor (hover)
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true, // Torna o gráfico responsivo
    maintainAspectRatio: false, // Permite que o gráfico redimensione livremente
    aspectRatio: 1, // Mantém uma proporção de 1:1 (aspect ratio igual)
    plugins: {
      legend: {
        text: "Invoices across the year", // Texto para a legenda
        display: true, // Exibe a legenda
        position: "bottom", // Coloca a legenda na parte inferior
        labels: {
          font: {
            size: 14, // Tamanho da fonte da legenda
            weight: "bold", // Peso da fonte da legenda
          },
        },
      },
      tooltip: {
        enabled: true, // Ativa os tooltips (dicas) ao passar o cursor sobre o gráfico
      },
    },
  };

  // Retorna o componente do gráfico Doughnut
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart; // Exporta o componente para ser usado em outros locais
