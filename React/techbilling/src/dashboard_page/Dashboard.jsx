import React from "react";
import "./Dashboard.css";
import MonthlyActiveClientsGraph from "../graphs/MonthlyActiveClientsGraph";
import InvoicesBarChart from "../graphs/InvoicesBarChart";
import DoughnutChart from "../graphs/DoughnutChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Gráfico de clientes ativos, cancelados e pendentes */}
      <div className="monthly-graph">
        <MonthlyActiveClientsGraph />
      </div>

      {/* Container para o gráfico de faturas*/}
      <div className="invoices-graph-container">
        {/* Gráfico de barras de faturas */}
        <div className="invoices-graph">
          <InvoicesBarChart />
        </div>

        {/* Gráfico de donut */}
        <div className="doughnut-graph">
          <DoughnutChart />
        </div>
      </div>

      {/* Espaço extra para ajustar o rodapé */}
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default Dashboard;
