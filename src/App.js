import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import FindPartner from "./components/Findpartner";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Landing" element={<Landing />} />
      <Route path="/Profile" element={<Profile/>} />
       <Route path="/findpartner" element={<FindPartner/>} />
    </Routes>
  );
}

export default App;
