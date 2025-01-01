import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DoughnutChart from "./graphs/DoughnutChart"; // Importar o componente DoughnutChart
import Dashboard from "./dashboard_page/Dashboard";
import Compliances from "./compliances_page/Compliances";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu hambúrguer (aberto/fechado)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="page-container">
        {" "}
        {/* Container principal para o layout flex */}
        {/* Cabeçalho */}
        <header className="header">
          <h1 className="logo">TechBilling</h1>
          {/* Menu hambúrguer para dispositivos móveis */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <ul>
              {/* Links de navegação */}
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/compliances" className="link">
                  Compliances
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* Definição das rotas */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="hero-container">
                {/* Texto principal da página Home */}
                <p className="hero-text">
                  TechBilling
                  <br />
                  Metrics
                  <br />
                  at a<br />
                  Click Away
                </p>
                <div className="doughnutchart-container-large">
                  <DoughnutChart />
                </div>
              </div>
            }
          />
          {/* Outras rotas da página */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compliances" element={<Compliances />} />
        </Routes>
        {/* Rodapé */}
        <footer className="footer">
          <div className="info">
            <p>Morada: Avenida das Estrelas, nº 42, Porto Alegre, 1234-567 </p>
            <p>NIF: 123 456 789</p>
            <p>Capital Social: 20.000,00 EUR</p>
            <p>Telefone: +123 456 789</p>
            <br></br>
          </div>
          <p>
            &copy; {new Date().getFullYear()} TechBilling. Every rights
            reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
