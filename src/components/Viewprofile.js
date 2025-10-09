import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Viewprofile.css"; // Ensure correct path

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    personal: {},
    address: {},
    family: {},
  });

  // Option Arrays
  const religionOptions = [
    { id: 1, name: "Christianity" },
    { id: 2, name: "Judaism" },
    { id: 3, name: "Islam" },
    { id: 4, name: "Buddhism" },
    { id: 5, name: "Zoroastrian" },
    { id: 6, name: "Hindu" },
    { id: 7, name: "Sikh" },
    { id: 8, name: "Shinto" },
    { id: 9, name: "Baha’i" },
    { id: 10, name: "Taoism" },
    { id: 11, name: "Jain" },
    { id: 12, name: "Confucianism" },
    { id: 13, name: "Syncretic" },
    { id: 14, name: "Religions" },
    { id: 15, name: "Animist" },
    { id: 16, name: "Non-Religious" },
    { id: 17, name: "Others" },
  ];

  const casteOptions = [
    { id: 1, name: "Brahmin" },
    { id: 2, name: "Kshatriya" },
    { id: 3, name: "Vaishya" },
    { id: 4, name: "Shudra" },
    { id: 5, name: "Dalit" },
    { id: 6, name: "Adivasi" },
    { id: 7, name: "Kayastha" },
    { id: 8, name: "Rajput" },
    { id: 9, name: "Yadav" },
    { id: 10, name: "Kurmi" },
    { id: 11, name: "Jat" },
    { id: 12, name: "Gupta" },
    { id: 13, name: "Nair" },
    { id: 14, name: "Maratha" },
    { id: 15, name: "Koli" },
    { id: 16, name: "Baniya" },
    { id: 17, name: "Lingayat" },
    { id: 18, name: "Vokkaliga" },
    { id: 19, name: "Reddy" },
    { id: 20, name: "Kamma" },
  ];

  const rashiOptions = [
    { id: 1, name: "Mesha" },
    { id: 2, name: "Vrishabha" },
    { id: 3, name: "Mithuna" },
    { id: 4, name: "Karka" },
    { id: 5, name: "Simha" },
    { id: 6, name: "Kanya" },
    { id: 7, name: "Tula" },
    { id: 8, name: "Vrischika" },
    { id: 9, name: "Dhanu" },
    { id: 10, name: "Makara" },
    { id: 11, name: "Kumbha" },
    { id: 12, name: "Meena" },
  ];

  const nakshatraOptions = [
    { id: 1, name: "Ashwini" },
    { id: 2, name: "Bharani" },
    { id: 3, name: "Krittika" },
    { id: 4, name: "Rohini" },
    { id: 5, name: "Mrigashira" },
    { id: 6, name: "Ardra" },
    { id: 7, name: "Punarvasu" },
    { id: 8, name: "Pushya" },
    { id: 9, name: "Ashlesha" },
    { id: 10, name: "Magha" },
    { id: 11, name: "Purva Phalguni" },
    { id: 12, name: "Uttara Phalguni" },
    { id: 13, name: "Hasta" },
    { id: 14, name: "Chitra" },
    { id: 15, name: "Swati" },
    { id: 16, name: "Vishakha" },
    { id: 17, name: "Anuradha" },
    { id: 18, name: "Jyeshtha" },
    { id: 19, name: "Mula" },
    { id: 20, name: "Purva Ashadha" },
    { id: 21, name: "Uttara Ashadha" },
    { id: 22, name: "Shravana" },
    { id: 23, name: "Dhanishta" },
    { id: 24, name: "Shatabhisha" },
    { id: 25, name: "Purva Bhadrapada" },
    { id: 26, name: "Uttara Bhadrapada" },
    { id: 27, name: "Revati" },
  ];

  const gotraOptions = [
    { id: 1, name: "Atri" },
    { id: 2, name: "Bharadwaj" },
    { id: 3, name: "Gautam" },
    { id: 4, name: "Jamadagni" },
    { id: 5, name: "Kashyap" },
    { id: 6, name: "Vashishtha" },
    { id: 7, name: "Vishwamitra" },
  ];

  // Helper function to get name by ID
  const getOptionName = (options, id) => {
    const item = options.find((opt) => opt.id === Number(id));
    return item ? item.name : "Not specified";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("User is not authenticated. Please login again.");
        navigate("/Login");
        return;
      }

      try {
        const [resPersonal, resAddress, resFamily] = await Promise.all([
          axios.get("http://localhost:6002/api/user-profiles/me", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:6002/api/addresses/me", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:6002/api/family-details/me", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setProfile({
          personal: resPersonal.data,
          address: resAddress.data,
          family: resFamily.data,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile. Please try again later.");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-page">
      <div className="overlay">
        <div className="register-container" style={{ display: "flex" }}>
          <div className="left-panel" style={{ width: "100%" }}>
            <div className="card-row-horizontal" style={{ display: "flex", gap: "20px", justifyContent: "space-between", flexWrap: "wrap" }}>
              {/* Personal Card */}
              <div className="card">
                <div className="card-header"><h3>Personal</h3></div>
                <div className="form-panel">
                  <p><strong>Age:</strong> {profile.personal.age}</p>
                  <p><strong>Height:</strong> {profile.personal.height} cm</p>
                  <p><strong>Weight:</strong> {profile.personal.weight} kg</p>
                  <p><strong>Salary Package:</strong> {profile.personal.salaryPackage}</p>
                  <p><strong>Education:</strong> {profile.personal.education}</p>
                  <p><strong>Occupation:</strong> {profile.personal.occupation}</p>
                  <p><strong>Job Location:</strong> {profile.personal.jobLocation}</p>
                  <p><strong>Gender:</strong> {profile.personal.gender === true || profile.personal.gender === "True" ? "Female" : "Male"}</p>
                  <p><strong>Marital Status:</strong> {profile.personal.maritalStatus}</p>
                  <p><strong>Mangalik:</strong> {profile.personal.mangalik? "Yes" : "No"}</p>
                  <p><strong>Disability:</strong> {profile.personal.disability ? "Yes" : "No"}</p>
                  {profile.personal.disability && <p><strong>Disability Type:</strong> {profile.personal.disabilityType}</p>}
                  <p><strong>Blood Group:</strong> {profile.personal.bloodGroup}</p>
                  <p><strong>Religion:</strong> {getOptionName(religionOptions, profile.personal.religionId)}</p>
                  <p><strong>Caste:</strong> {getOptionName(casteOptions, profile.personal.casteId)}</p>
                  <p><strong>Gotra:</strong> {getOptionName(gotraOptions, profile.personal.gotraId)}</p>
                  <p><strong>Rashi:</strong> {getOptionName(rashiOptions, profile.personal.rashiId)}</p>
                  <p><strong>Paada:</strong> {profile.personal.paada}</p>
                  <p><strong>Nakshatra:</strong> {getOptionName(nakshatraOptions, profile.personal.nakshatraId)}</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="card">
                <div className="card-header"><h3>Address</h3></div>
                <div className="form-panel">
                  <p><strong>City:</strong> {profile.address.city}</p>
                  <p><strong>State:</strong> {profile.address.state}</p>
                  <p><strong>Postal Code:</strong> {profile.address.postalCode}</p>
                  <p><strong>Country:</strong> {profile.address.country}</p>
                </div>
              </div>

              {/* Family Card */}
              <div className="card">
                <div className="card-header"><h3>Family</h3></div>
                <div className="form-panel">
                  <p><strong>Father's Name:</strong> {profile.family.fatherName}</p>
                  <p><strong>Mother's Name:</strong> {profile.family.motherName}</p>
                  <p><strong>Siblings Count:</strong> {profile.family.siblingsCount}</p>
                  <p><strong>Annual Income:</strong> {profile.family.annualIncome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
