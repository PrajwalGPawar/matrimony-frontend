
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { Link } from "react-router-dom";

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
             <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/help">Help</Link></li>
      <li><Link to="/contact">Contact</Link></li>
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
