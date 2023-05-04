import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
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
import Footer from "./components/Footer";
import InstructorSubjectView from "./components/InstructorClassPageView";
import ContactUsPage from "./components/AdminContactUsPage";
import ContactUs from "./components/ContactUs";
import InstructorGradebook from "./components/InstructorGradebook";
import StudentSubjectGrades from "./components/StudentSubjectGrade";
import AdminHeader from "./components/AdminHeader";

const App = () => {
  const isAdminRoute = window.location.pathname.includes("/admin");
  const shouldShowHeader = !isAdminRoute;

  return (
    <BrowserRouter>
      <GlobalStyles />
      {shouldShowHeader && <Navbar />}
      {!shouldShowHeader && <AdminHeader />}
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/dashboard/:email" element={<Dashboard />} />
        <Route path="/registration" element={<SignUpForm />} />
        <Route path="/setprofile/:email" element={<SetProfile />} />
        <Route
          path="/subjectpage/:subject/:cohortId/:email"
          element={<SubjectPage />}
        />
        <Route
          path="/createmodule/:subject/:cohortId"
          element={<CreateModule />}
        />
        <Route
          path="/displaymodules/:subject/:cohortId"
          element={<DisplayModules />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/:admin/dashboard/:email" element={<AdminDashboard />} />
        <Route
          path="/admin/userconfirmation/:email"
          element={<UserConfirmation />}
        />
        <Route path="/admin/createcohort/:email" element={<CreateCohort />} />
        <Route
          path="/subjectpage/:subject/:cohortId/:email/:role"
          element={<InstructorSubjectView />}
        />
        <Route path="/contactus" element={<ContactUs />} />

        <Route path="/admin/:email/contactus" element={<ContactUsPage />} />
        <Route
          path="/:subject/:cohortId/gradebook/:role"
          element={<InstructorGradebook />}
        />
        <Route
          path="/:subject/:cohortId/:email/grades"
          element={<StudentSubjectGrades />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
