import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Match.css";
import loginbg from "../assets/loginbg.jpg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Match() {
  const [mainProfile, setMainProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in");
      navigate("/Login");
      return;
    }

    // Fetch fname from users/me
    const fetchFname = fetch("http://localhost:6002/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user fname");
        return res.json();
      })
      .then((data) => data.fname) // extract fname only
      .catch((error) => {
        console.error("Error fetching user fname:", error);
        return null;
      });

    // Fetch other profile info from user-profiles/me
    const fetchProfileDetails = fetch("http://localhost:6002/api/user-profiles/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile details");
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching user profile details:", error);
        return null;
      });

    // When both fetches complete, combine data
    Promise.all([fetchFname, fetchProfileDetails]).then(([fname, profileDetails]) => {
      if (profileDetails) {
        setMainProfile({ ...profileDetails, fname: fname || "N/A" });
      } else if (fname) {
        setMainProfile({ fname });
      }
    });

    // Fetch matched profiles as before
    fetch("http://localhost:6003/api/match/find-me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch matched profiles");
        return res.json();
      })
      .then((data) => {
        const parsedMatches = data
          .map((item) => {
            const key = Object.keys(item)[0];
            const inside = key.match(/\((.*)\)/)?.[1];
            if (!inside) return null;
            const pairs = inside.split(/,(?![^(]*\))/).map((s) => s.trim());
            const obj = {};
            pairs.forEach((pair) => {
              const [k, v] = pair.split("=").map((s) => s.trim());
              let value = v;
              if (v === "true") value = true;
              else if (v === "false") value = false;
              else if (!isNaN(v)) value = Number(v);
              else if (v === "null") value = null;
              obj[k] = value;
            });
            obj.matchScore = Object.values(item)[0];
            return obj;
          })
          .filter(Boolean);

        setMatches(parsedMatches);
      })
      .catch((error) => console.error("Error fetching matched profiles:", error));
  }, [navigate]);

  const handleDownloadPDF = () => {
    if (!matches.length) {
      alert("No matched profiles available to download.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(18);
    doc.text("Matched Profiles Summary", 40, 40);

    const headers = [
      "First Name",
      "Last Name",
      "Age",
      "Marital Status",
      "Height\nWeight",
      "Salary Package\nOccupation\nJob Location",
      "Education",
      "Mangalik\nDisability",
      "Rashi\nNakshatra",
      "Gotra\nPaada",
      "Religion\nCaste",
      "City\nState\nCountry",
      "Annual Income",
      "Match Score"
    ];

    const rows = matches.map(profile => [
      profile.fname || "N/A",
      profile.lname || "N/A",
      profile.age != null ? String(profile.age) : "N/A",
      profile.maritalStatus || "N/A",
      `${profile.height != null ? profile.height : "N/A"}\n${profile.weight != null ? profile.weight : "N/A"}`,
      `${profile.salaryPackage != null ? profile.salaryPackage : "N/A"}\n${profile.occupation || "N/A"}\n${profile.jobLocation || "N/A"}`,
      profile.education || "N/A",
      `${typeof profile.mangalik === "boolean" ? String(profile.mangalik) : "N/A"}\n${typeof profile.disability === "boolean" ? String(profile.disability) : "N/A"}`,
      `${profile.rashiName || "N/A"}\n${profile.nakshatraName || "N/A"}`,
      `${profile.gotraName || "N/A"}\n${profile.paada != null ? profile.paada : "N/A"}`,
      `${profile.religionName || "N/A"}\n${profile.casteName || "N/A"}`,
      `${profile.city || "N/A"}\n${profile.state || "N/A"}\n${profile.country || "N/A"}`,
      profile.annualIncome != null ? String(profile.annualIncome) : "N/A",
      profile.matchScore != null ? String(profile.matchScore) : "N/A",
    ]);

    autoTable(doc, {
      startY: 70,
      head: [headers],
      body: rows,
      styles: {
        fontSize: 8,
        cellPadding: 4,
        overflow: 'linebreak',
        cellWidth: 'wrap',
      },
      headStyles: {
        fillColor: [46, 139, 87],
        textColor: [255, 255, 255],
        halign: "center",
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 30 },
        3: { cellWidth: 60 },
        4: { cellWidth: 60 },
        5: { cellWidth: 100 },
        6: { cellWidth: 60 },
        7: { cellWidth: 50 },
        8: { cellWidth: 60 },
        9: { cellWidth: 50 },
        10: { cellWidth: 60 },
        11: { cellWidth: 90 },
        12: { cellWidth: 50 },
        13: { cellWidth: 50 },
      },
      margin: { left: 20, right: 40 },
      pageBreak: "auto",
    });

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    doc.save(`matched_profiles_${timestamp}.pdf`);
  };

  return (
    <div
      id="match-container"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div id="match-overlay"></div>

      <h2 id="match-title">Match Making Portal 💞</h2>

      <div id="match-grid">
        {/* Left Side: Main Profile */}
        <div id="match-profile-column-left">
          <h3>Your Profile</h3>
          {mainProfile ? (
            <div id="match-profile-card">
              <p><strong>Name:</strong> {mainProfile.fname || "N/A"}</p>
              <p><strong>Age:</strong> {mainProfile.age || "N/A"}</p>
              <p><strong>Occupation:</strong> {mainProfile.occupation || "N/A"}</p>
              <p><strong>Location:</strong> {mainProfile.jobLocation || "N/A"}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Right Side: Matches */}
        <div id="match-profile-column-right">
          <h3>Suggested Matches</h3>
          <div id="match-card-list">
            {matches.length ? (
              matches.map((match, index) => (
                <div
                  key={match.profileId || index}
                  className="match-card"
                  onClick={() => setSelectedProfile(match)}
                >
                  <p><strong>Name:</strong> {match.fname || "N/A"}</p>
                  <p><strong>Age:</strong> {match.age || "N/A"}</p>
                  <p><strong>Occupation:</strong> {match.occupation || "N/A"}</p>
                  <p><strong>Location:</strong> {match.jobLocation || "N/A"}</p>
                  <p><strong>Match Score:</strong> {match.matchScore != null ? match.matchScore : "N/A"}</p>
                </div>
              ))
            ) : (
              <p>No matches found.</p>
            )}
          </div>
        </div>
      </div>

      <div id="match-bottom-bar">
        <button id="match-download-btn" onClick={handleDownloadPDF}>
          📄 Download All Matched Profiles (PDF)
        </button>
      </div>

      {/* Modal */}
      {selectedProfile && (
        <div id="match-modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div
            id="match-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Full Profile Details</h3>
            <div id="match-profile-details">
              {Object.entries(selectedProfile).map(([key, value]) => (
                <p key={key}>
                  <strong>
                    {key.replace(/([A-Z])/g, " $1")
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                    :
                  </strong>{" "}
                  {value !== null && value !== undefined
                    ? String(value)
                    : "N/A"}
                </p>
              ))}
            </div>
            <button id="match-close-btn" onClick={() => setSelectedProfile(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
