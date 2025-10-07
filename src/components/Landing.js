import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    
    navigate("/");
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Eternal Knots</h1>
        </div>
        <div className="nav-right" style={{ position: "relative" }}>
          <FaUserCircle
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
            title="Profile"
          />

          {showDropdown && (
            <div className="profile-dropdown-form" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={() => {
                  navigate("/view-profile");
                  setShowDropdown(false);
                }}
              >
                View Profile
              </button>
              <button
                className="profile-btn"
                onClick={() => {
                  navigate("/edit-profile");
                  setShowDropdown(false);
                }}
              >
                Edit Profile
              </button>
              <button
                className="profile-btn logout-btn"
                onClick={() => {
                  handleLogout();
                  setShowDropdown(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="overlay">
        <div className="landing-box">
          <h2>Welcome to Matrimony Portal</h2>
          <p>Start your journey to find the perfect match</p>
          <div className="landing-buttons">
            <button className="btn" onClick={() => navigate("/profile")}>
              Add Profile Details
            </button>
            <button className="btn" onClick={() => navigate("/findpartner")}>
              Find Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
