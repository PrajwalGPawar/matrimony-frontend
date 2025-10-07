
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState(null);

  const [personal, setPersonal] = useState({
    age: "",
    height: "",
    weight: "",
    salaryPackage: "",
    education: "",
    occupation: "",
    gender: "",
    maritalStatus: "",
    mangalik: "", // store as string "Yes"/"No" for select, convert on submit
    disability: "",
    disabilityType: "",
    bloodGroup: "",
    religion: "",
    caste: "",
    rashiId: "",
    nakshatraId: "",
    gotraId: "",
  });

  const [address, setAddress] = useState({
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [family, setFamily] = useState({
    fatherName: "",
    motherName: "",
    siblingsCount: "",
    annualIncome: "",
  });
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

  // Personal form change handler
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({ ...prev, [name]: value }));
  };

  // Address form change handler
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Family form change handler
  const handleFamilyChange = (e) => {
    const { name, value } = e.target;
    setFamily((prev) => ({ ...prev, [name]: value }));
  };

  // Submit combined data
  const handleSubmit = async () => {
    const payload = {
      ...personal,
      ...address,
      ...family,
      // Convert mangalik and disability strings to boolean or null
      mangalik: personal.mangalik === "Yes" ? true : personal.mangalik === "No" ? false : null,
      disability: personal.disability === "Yes" ? true : personal.disability === "No" ? false : null,
      disabilityType: personal.disability === "Yes" ? personal.disabilityType : null,
      rashiId: personal.rashiId ? Number(personal.rashiId) : null,
      nakshatraId: personal.nakshatraId ? Number(personal.nakshatraId) : null,
      gotraId: personal.gotraId ? Number(personal.gotraId) : null,
      siblingsCount: family.siblingsCount ? Number(family.siblingsCount) : null,
      annualIncome: family.annualIncome ? Number(family.annualIncome) : null,
      age: personal.age ? Number(personal.age) : null,
      height: personal.height ? Number(personal.height) : null,
      weight: personal.weight ? Number(personal.weight) : null,
      salaryPackage: personal.salaryPackage ? Number(personal.salaryPackage) : null,
    };

  try {
      setActiveCard(null); 
    console.log("Payload to submit:", payload);

    const res = await axios.post(
      "http://localhost:9091/api/users/registerDetails",
      payload
    );
    if (res.status === 200 || res.status === 201) {
      alert("Profile submitted successfully");
     
      navigate("/home");
    } else {
      alert("Unexpected response from server");
    }
  } catch (err) {
    console.error(err);
    alert("Submission failed. Check console for details.");
  }
};

  return (
    <div className="profile-page">
      <div className="overlay">
        <div className="register-container" style={{ display: "flex" }}>
          <div className="left-panel" style={{ width: "100%" }}>
            <div
              className="card-row-horizontal"
              style={{ display: "flex", gap: "20px", justifyContent: "space-between", flexWrap: "wrap" }}
            >
              {/* Personal Card */}
              <div className={`card ${activeCard === "personal" ? "active" : ""}`}>
                <div
                  onClick={() => setActiveCard(activeCard === "personal" ? null : "personal")}
                  // style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "8px" }}

                  style={{ 
  display: "flex", 
  gap: "20px", 
  justifyContent: "space-between", 
  flexWrap: "wrap",
  border: "2px solid white",  // add this for white border with thickness 2px
  padding: "10px",            // optional, adds some inner space
  borderRadius: "8px"         // optional, rounded corners for better look
}}

                >
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

                    <label>Salary Package (LPA)</label>
                    <input type="number" name="salaryPackage" value={personal.salaryPackage} onChange={handlePersonalChange} />

                    <label>Education</label>
                    <input type="text" name="education" value={personal.education} onChange={handlePersonalChange} />

                    <label>Occupation</label>
                    <input type="text" name="occupation" value={personal.occupation} onChange={handlePersonalChange} />

                    <label>Gender</label>
                    <select name="gender" value={personal.gender} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
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
                    <select name="religion" value={personal.religion} onChange={handlePersonalChange}>
                      <option value="">Select</option>
                      {religionOptions.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    <label>Caste</label>
                    <select name="caste" value={personal.caste} onChange={handlePersonalChange}>
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
              <div className={`card ${activeCard === "address" ? "active" : ""}`}>
                <div
                  onClick={() => setActiveCard(activeCard === "address" ? null : "address")}
                  // style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "8px" }}
                  style={{ 
  display: "flex", 
  gap: "20px", 
  justifyContent: "space-between", 
  flexWrap: "wrap",
  border: "2px solid white",  // add this for white border with thickness 2px
  padding: "10px",            // optional, adds some inner space
  borderRadius: "8px"         // optional, rounded corners for better look
}}

                >
                  Address
                </div>

                {activeCard === "address" && (
                  <div className="form-panel" style={{ marginTop: "10px" }}>
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
              <div className={`card ${activeCard === "family" ? "active" : ""}`}>
                <div
                  onClick={() => setActiveCard(activeCard === "family" ? null : "family")}
                 style={{ 
  display: "flex", 
  gap: "20px", 
  justifyContent: "space-between", 
  flexWrap: "wrap",
  border: "2px solid white",  // add this for white border with thickness 2px
  padding: "10px",            // optional, adds some inner space
  borderRadius: "8px"         // optional, rounded corners for better look
}}

                >
                  Family
                </div>

                {activeCard === "family" && (
                  <div className="form-panel" style={{ marginTop: "10px" }}>
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

            <br />

            {/* Submit Button */}
            <div className="submit-container" style={{ textAlign: "center" }}>
              <button className="btn" onClick={handleSubmit} type="button" style={{ padding: "10px 20px", fontSize: "16px" }}>
                Submit All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
