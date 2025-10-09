import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import FindPartner from "./components/Findpartner";
import Viewprofile from "./components/Viewprofile";
import About from "./components/About";
import Editprofile from "./components/Editprofile";
import Match from "./components/Match";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Landing" element={<Landing />} />
      <Route path="/Profile" element={<Profile/>} />
       <Route path="/findpartner" element={<FindPartner/>} />
        <Route path="/Viewprofile" element={<Viewprofile/>} />
            <Route path="/Match" element={<Match/>} />
         
        <Route path="/About" element={<About />} />
        {/* <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />}  */}
         <Route path="/Editprofile" element={<Editprofile/>} />
    </Routes>
  );
}

export default App;
