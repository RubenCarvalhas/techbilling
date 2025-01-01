import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DoughnutChart from "./graphs/DoughnutChart";
import Dashboard from "./dashboard_page/Dashboard";
import Compliances from "./compliances_page/Compliances";

const Home = () => {
  React.useEffect(() => {
    document.title = "Homepage";
  }, []);

  return (
    <div className="hero-container">
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
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="page-container">
        <header className="header">
          <h1 className="logo">TechBilling</h1>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <ul>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compliances" element={<Compliances />} />
        </Routes>
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
