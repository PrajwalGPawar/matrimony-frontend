
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
      console.log(formData)
      const response = await axios.post('http://localhost:9091/api/users/login', formData);

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/Landing');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Invalid username or password');
      } else {
        alert('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
    
      

      <div className="overlay">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
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
