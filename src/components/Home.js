
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Eternal Knots</h1>
        </div>
        <div className="nav-right">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Help</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-left">
          <h2>Find Your Perfect Match</h2>
          
          <div className="hero-buttons">
            <button className="green-btn" onClick={() => navigate("/Login")}>Login</button>
            <button className="green-btn" onClick={() => navigate("/Register")}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
