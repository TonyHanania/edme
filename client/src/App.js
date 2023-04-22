import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/Registration";
import SetProfile from "./components/SetProfile";
import SubjectPage from "./components/SubjectPage";
import AdminLogin from "./components/AdminLogin";

import CreateModule from "./components/CreateModule";
import DisplayModules from "./components/DisplayModules";
import AdminDashboard from "./components/AdminDashBoard";
import UserConfirmation from "./components/AdminUserConfirmation";
import CreateCohort from "./components/AdminCohortManagement";

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
        <Route path="/setprofile/:email" element={<SetProfile />} />
        <Route path="/subjectpage/:subject" element={<SubjectPage />} />
        <Route path="/createmodule" element={<CreateModule />} />
        <Route path="/displaymodules" element={<DisplayModules />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/userconfirmation" element={<UserConfirmation />} />
        <Route path="/admin/createcohort" element={<CreateCohort />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
