
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Findpartner.css";

const FindPartner = () => {
  const navigate = useNavigate();

  return (
    <div className="findpartner-page">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Eternal Knots</h1>
        </div>
      </nav>

      <div className="overlay">
        <div className="findpartner-box">
          <h2>Find Your Match</h2>
          <p>Select your preferred method</p>
          <div className="findpartner-buttons">
            <button
              className="btn"
              onClick={() => navigate("/find-through-profile")}
            >
              Find Through Profile
            </button>
            <button
              className="btn"
              onClick={() => navigate("/find-by-rashi")}
            >
              Find by Adding Rashi & Nakshatra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPartner;
