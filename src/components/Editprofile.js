
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/editprofile.css";

export default function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    personal: {},
    address: {},
    family: {},
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Option arrays (same as your Profile.js)
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

  // Helper to find name (optional, if you want)
  // const getOptionName = (options, id) => {
  //   const item = options.find((opt) => opt.id === Number(id));
  //   return item ? item.name : "";
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("User not authenticated. Please login.");
        navigate("/Login");
        return;
      }

      try {
        const [resPersonal, resAddress, resFamily] = await Promise.all([
          axios.get("http://localhost:6002/api/user-profiles/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:6002/api/addresses/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:6002/api/family-details/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProfile({
          personal: resPersonal.data || {},
          address: resAddress.data || {},
          family: resFamily.data || {},
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input change for nested objects
  const handleChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Convert boolean-like string to bool for checkbox/radio inputs if needed
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("User not authenticated. Please login.");
      navigate("/Login");
      setSaving(false);
      return;
    }

    try {
      // Update personal profile
      await axios.put(
        "http://localhost:6002/api/user-profiles/me",
        profile.personal,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update address
      await axios.put(
        "http://localhost:6002/api/addresses/me",
        profile.address,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update family details
      await axios.put(
        "http://localhost:6002/api/family-details/me",
        profile.family,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully!");
      navigate("/Profile"); // Redirect to view profile page or wherever
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="edit-profile-wrapper">Loading...</div>;

  return (
    <div className="edit-profile-wrapper">
      {/* <h2>Edit Profile</h2> */}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        {/* Personal Section */}
        <fieldset className="edit-profile-personal">
          <legend>Personal Details</legend>

          <label>
            Age:
            <input
              type="number"
              value={profile.personal.age || ""}
              onChange={(e) =>
                handleChange("personal", "age", e.target.value)
              }
              min={0}
              required
            />
          </label>

          <label>
            Height (cm):
            <input
              type="number"
              value={profile.personal.height || ""}
              onChange={(e) =>
                handleChange("personal", "height", e.target.value)
              }
              min={0}
              required
            />
          </label>

          <label>
            Weight (kg):
            <input
              type="number"
              value={profile.personal.weight || ""}
              onChange={(e) =>
                handleChange("personal", "weight", e.target.value)
              }
              min={0}
              required
            />
          </label>

          <label>
            Salary Package:
            <input
              type="text"
              value={profile.personal.salaryPackage || ""}
              onChange={(e) =>
                handleChange("personal", "salaryPackage", e.target.value)
              }
            />
          </label>

          <label>
            Education:
            <input
              type="text"
              value={profile.personal.education || ""}
              onChange={(e) =>
                handleChange("personal", "education", e.target.value)
              }
            />
          </label>

          <label>
            Occupation:
            <input
              type="text"
              value={profile.personal.occupation || ""}
              onChange={(e) =>
                handleChange("personal", "occupation", e.target.value)
              }
            />
          </label>

          <label>
            Job Location:
            <input
              type="text"
              value={profile.personal.jobLocation || ""}
              onChange={(e) =>
                handleChange("personal", "jobLocation", e.target.value)
              }
            />
          </label>

          <label>
            Gender:
            <select
              value={
                profile.personal.gender === true || profile.personal.gender === "True"
                  ? "Female"
                  : "Male"
              }
              onChange={(e) =>
                handleChange(
                  "personal",
                  "gender",
                  e.target.value === "Female" ? true : false
                )
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            Marital Status:
            <input
              type="text"
              value={profile.personal.maritalStatus || ""}
              onChange={(e) =>
                handleChange("personal", "maritalStatus", e.target.value)
              }
            />
          </label>

          <label>
            Mangalik:
            <input
              type="text"
              checked={profile.personal.mangalik || false}
              onChange={(e) =>
                handleChange("personal", "mangalik", e.target.checked)
              }
            />
          </label>

          <label>
            Disability:
            <input
              type="text"
              checked={profile.personal.disability || false}
              onChange={(e) =>
                handleChange("personal", "disability", e.target.checked)
              }
            />
          </label>

          {profile.personal.disability && (
            <label>
              Disability Type:
              <input
                type="text"
                value={profile.personal.disabilityType || ""}
                onChange={(e) =>
                  handleChange("personal", "disabilityType", e.target.value)
                }
              />
            </label>
          )}

          <label>
            Blood Group:
            <input
              type="text"
              value={profile.personal.bloodGroup || ""}
              onChange={(e) =>
                handleChange("personal", "bloodGroup", e.target.value)
              }
            />
          </label>

          <label>
            Religion:
            <select
              value={profile.personal.religionId || ""}
              onChange={(e) =>
                handleChange("personal", "religionId", e.target.value)
              }
            >
              <option value="">Select Religion</option>
              {religionOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Caste:
            <select
              value={profile.personal.casteId || ""}
              onChange={(e) =>
                handleChange("personal", "casteId", e.target.value)
              }
            >
              <option value="">Select Caste</option>
              {casteOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Gotra:
            <select
              value={profile.personal.gotraId || ""}
              onChange={(e) =>
                handleChange("personal", "gotraId", e.target.value)
              }
            >
              <option value="">Select Gotra</option>
              {gotraOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rashi:
            <select
              value={profile.personal.rashiId || ""}
              onChange={(e) =>
                handleChange("personal", "rashiId", e.target.value)
              }
            >
              <option value="">Select Rashi</option>
              {rashiOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Paada:
            <input
              type="text"
              value={profile.personal.paada || ""}
              onChange={(e) =>
                handleChange("personal", "paada", e.target.value)
              }
            />
          </label>

          <label>
            Nakshatra:
            <select
              value={profile.personal.nakshatraId || ""}
              onChange={(e) =>
                handleChange("personal", "nakshatraId", e.target.value)
              }
            >
              <option value="">Select Nakshatra</option>
              {nakshatraOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        {/* Address Section */}
        <fieldset className="edit-profile-address">
          <legend>Address Details</legend>

          <label>
            City:
            <input
              type="text"
              value={profile.address.city || ""}
              onChange={(e) =>
                handleChange("address", "city", e.target.value)
              }
            />
          </label>

          <label>
            State:
            <input
              type="text"
              value={profile.address.state || ""}
              onChange={(e) =>
                handleChange("address", "state", e.target.value)
              }
            />
          </label>

          <label>
            Postal Code:
            <input
              type="text"
              value={profile.address.postalCode || ""}
              onChange={(e) =>
                handleChange("address", "postalCode", e.target.value)
              }
            />
          </label>

          <label>
            Country:
            <input
              type="text"
              value={profile.address.country || ""}
              onChange={(e) =>
                handleChange("address", "country", e.target.value)
              }
            />
          </label>
        </fieldset>

        {/* Family Section */}
        <fieldset className="edit-profile-family">
          <legend>Family Details</legend>

          <label>
            Father's Name:
            <input
              type="text"
              value={profile.family.fatherName || ""}
              onChange={(e) =>
                handleChange("family", "fatherName", e.target.value)
              }
            />
          </label>

          <label>
            Mother's Name:
            <input
              type="text"
              value={profile.family.motherName || ""}
              onChange={(e) =>
                handleChange("family", "motherName", e.target.value)
              }
            />
          </label>

          <label>
            Siblings Count:
            <input
              type="number"
              value={profile.family.siblingsCount || ""}
              onChange={(e) =>
                handleChange("family", "siblingsCount", e.target.value)
              }
              min={0}
            />
          </label>

          <label>
            Annual Income:
            <input
              type="text"
              value={profile.family.annualIncome || ""}
              onChange={(e) =>
                handleChange("family", "annualIncome", e.target.value)
              }
            />
          </label>
        </fieldset>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
