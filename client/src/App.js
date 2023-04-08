import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/Registration";
import SetProfile from "./components/SetProfile";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<SignUpForm />} />
        <Route path="/setprofile" element={<SetProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
