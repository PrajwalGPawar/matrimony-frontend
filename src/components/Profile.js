



  import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState(null);

  const [personal, setPersonal] = useState({
    age: "", height: "", weight: "", salaryPackage: "", education: "", jobLocation: "",
    occupation: "", gender: "", maritalStatus: "", mangalik: "", disability: "",
    disabilityType: "", bloodGroup: "", religion: "", caste: "", rashiId: "",
    paada: "", nakshatraId: "", gotraId: "",
  });

  const [address, setAddress] = useState({
    city: "", state: "", postalCode: "", country: "",
  });

  const [family, setFamily] = useState({
    fatherName: "", motherName: "", siblingsCount: "", annualIncome: "",
  });

  // (dropdown options unchanged...)
    // Dropdown options (unchanged)
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

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleFamilyChange = (e) => {
    const { name, value } = e.target;
    setFamily((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("User is not authenticated. Please login again.");
      navigate("/Login");
      return;
    }

    const requiredPersonalFields = [
      "age", "height", "weight", "salaryPackage", "education", "occupation", "jobLocation", "gender", "maritalStatus",
      "mangalik", "disability", "bloodGroup", "religion", "caste", "gotraId", "paada", "rashiId", "nakshatraId"
    ];

    const requiredAddressFields = ["city", "state", "postalCode", "country"];
    const requiredFamilyFields = ["fatherName", "motherName", "siblingsCount", "annualIncome"];

    for (const field of requiredPersonalFields) {
      if (!personal[field]) {
        alert(`Please fill in the ${field} field in Personal section.`);
        return;
      }
    }

    if (personal.disability === "Yes" && !personal.disabilityType) {
      alert("Please specify the Disability Type.");
      return;
    }

    for (const field of requiredAddressFields) {
      if (!address[field]) {
        alert(`Please fill in the ${field} field in Address section.`);
        return;
      }
    }

    for (const field of requiredFamilyFields) {
      if (!family[field]) {
        alert(`Please fill in the ${field} field in Family section.`);
        return;
      }
    }

    const personalData = {
      age: Number(personal.age),
      height: Number(personal.height),
      weight: Number(personal.weight),
      salaryPackage: Number(personal.salaryPackage),
      education: personal.education,
      occupation: personal.occupation,
      jobLocation: personal.jobLocation,
      gender: personal.gender,
      maritalStatus: personal.maritalStatus,
      mangalik: personal.mangalik === "Yes",
      disability: personal.disability === "Yes",
      disabilityType: personal.disability === "Yes" ? personal.disabilityType : null,
      bloodGroup: personal.bloodGroup,
      religion: personal.religion,
      caste: personal.caste,
      gotraId: Number(personal.gotraId),
      paada: Number(personal.paada),
      rashiId: Number(personal.rashiId),
      nakshatraId: Number(personal.nakshatraId),
    };

    const familyData = {
      fatherName: family.fatherName,
      motherName: family.motherName,
      siblingsCount: Number(family.siblingsCount),
      annualIncome: Number(family.annualIncome),
    };

    const addressData = {
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    };

    try {
      setActiveCard(null);
      await Promise.all([
        axios.post("http://localhost:6002/api/user-profiles/me", personalData, { headers: { Authorization: `Bearer ${token}` } }),
        axios.post("http://localhost:6002/api/family-details/me", familyData, { headers: { Authorization: `Bearer ${token}` } }),
        axios.post("http://localhost:6002/api/addresses/me", addressData, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      alert("Profile submitted successfully.");
      navigate("/findpartner");
    } catch (error) {
      console.error("Error submitting profile data:", error);
      alert("Failed to submit profile. Please check your data or try again later.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-overlay">
        <div className="profile-container">
          <div className="profile-left-panel">
            <div className="profile-card-row">

              {/* Personal Card */}
              <div className={`profile-card ${activeCard === "personal" ? "active" : ""}`}>
                <div className="profile-card-header" onClick={() => setActiveCard(activeCard === "personal" ? null : "personal")}>
                  Personal
                 </div>

                {activeCard === "personal" && (
                  <div className="form-panel" style={{ marginTop: "10px" }}>
                    <label>Age</label>
                    <input type="number" name="age" value={personal.age} onChange={handlePersonalChange} />

                    <label>Height (cm)</label>
                    <input type="number" name="height" value={personal.height} onChange={handlePersonalChange} />

                    <label>Weight (kg)</label>
                    <input type="number" name="weight" value={personal.weight} onChange={handlePersonalChange} />

                    <label>Salary Package </label>
                    <input type="number" name="salaryPackage" value={personal.salaryPackage} onChange={handlePersonalChange} />

                    <label>Education</label>
                    <input type="text" name="education" value={personal.education} onChange={handlePersonalChange} />

                    <label>Occupation</label>
                    <input type="text" name="occupation" value={personal.occupation} onChange={handlePersonalChange} />
                     
                      <label>Job Location</label>
                    <input type="text" name="jobLocation" value={personal.jobLocation} onChange={handlePersonalChange} />

                    <label>Gender</label>
                    <select name="gender" value={personal.gender} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="False">Male</option>
                      <option value="True">Female</option>
                    </select>

                    <label>Marital Status</label>
                    <select name="maritalStatus" value={personal.maritalStatus} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>

                    <label>Mangalik</label>
                    <select name="mangalik" value={personal.mangalik} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label>Disability</label>
                    <select name="disability" value={personal.disability} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    {personal.disability === "Yes" && (
                      <>
                        <label>Disability Type</label>
                        <input
                          type="text"
                          name="disabilityType"
                          value={personal.disabilityType}
                          onChange={handlePersonalChange}
                        />
                      </>
                    )}

                    <label>Blood Group</label>
                    <input type="text" name="bloodGroup" value={personal.bloodGroup} onChange={handlePersonalChange} />

                    <label>Religion</label>
                    <select name="religionId" value={personal.religion} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {religionOptions.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    <label>Caste</label>
                    <select name="casteId" value={personal.caste} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {casteOptions.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    <label>Gotra</label>
                    <select name="gotraId" value={personal.gotraId} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {gotraOptions.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>

                    <label>Rashi</label>
                    <select name="rashiId" value={personal.rashiId} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {rashiOptions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                     
                     
                    <label>Paada</label>
                    <select name="paada" value={personal.paada} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                       <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label>Nakshatra</label>
                    <select name="nakshatraId" value={personal.nakshatraId} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {nakshatraOptions.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Address Card */}
              <div className={`profile-card ${activeCard === "address" ? "active" : ""}`}>
                <div className="profile-card-header" onClick={() => setActiveCard(activeCard === "address" ? null : "address")}>
                  Address
                </div>
                {activeCard === "address" && (
                  <div className="profile-form">
                    <label>City</label>
                    <input type="text" name="city" value={address.city} onChange={handleAddressChange} />
                    <label>State</label>
                    <input type="text" name="state" value={address.state} onChange={handleAddressChange} />
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
                    <label>Country</label>
                    <input type="text" name="country" value={address.country} onChange={handleAddressChange} />
                  </div>
                )}
              </div>

              {/* Family Card */}
              <div className={`profile-card ${activeCard === "family" ? "active" : ""}`}>
                <div className="profile-card-header" onClick={() => setActiveCard(activeCard === "family" ? null : "family")}>
                  Family
                </div>
                {activeCard === "family" && (
                  <div className="profile-form">
                    <label>Father's Name</label>
                    <input type="text" name="fatherName" value={family.fatherName} onChange={handleFamilyChange} />
                    <label>Mother's Name</label>
                    <input type="text" name="motherName" value={family.motherName} onChange={handleFamilyChange} />
                    <label>Siblings Count</label>
                    <input type="number" name="siblingsCount" value={family.siblingsCount} onChange={handleFamilyChange} />
                    <label>Annual Income</label>
                    <input type="number" name="annualIncome" value={family.annualIncome} onChange={handleFamilyChange} />
                  </div>
                )}
              </div>
            </div>

            <div className="profile-submit-container">
              <button className="profile-btn" onClick={handleSubmit}>
                Submit All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
