
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
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

  try {
    const response = await axios.post('http://localhost:6002/auth/login', formData);

    if (response.status === 200) {
      const token = response.data.token;
      // console.log(token);

      // Set expiry time: now + 24 hours
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;

      // Store both token and expiry
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenExpiry', expiry.toString());

      alert('Login successful!');
      navigate('/Landing');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      alert('Invalid email or password');
    } else {
      alert('Server error. Please try again later.');
    }
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     console.log(formData)
  //     const response = await axios.post('http://localhost:6002/auth/login', formData);

  //     if (response.status === 200) {
  //       alert('Login successful!');
  //       navigate('/Landing');
  //     }
  //   } catch (error) {
  //     if (error.response?.status === 401) {
  //       alert('Invalid email or password');
  //     } else {
  //       alert('Server error. Please try again later.');
  //     }
  //   }
  // };

  return (
    <div className="login-page">
    
      

      <div className="overlay">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
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
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
