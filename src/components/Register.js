
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    dob: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      isActive: true, // sent to backend but not shown in form
    };

    try {
      console.log(payload);
      const response = await axios.post('http://localhost:9091/api/users/register', payload);

      if (response.status === 200 || response.status === 201) {
        alert('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <div className="profile-button">
        <Link to="/Login" className="btn1">Back to Login</Link>
      </div>

      <div className="overlay">
        <div className="register-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
