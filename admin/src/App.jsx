import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";

// Import your page components here...

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  // Doctor Routes - Completely separate structure
  if (dToken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            {/* Redirect any unmatched doctor routes to dashboard */}
            <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Admin Routes - Completely separate structure
  if (aToken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            {/* Redirect any unmatched admin routes to dashboard */}
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Public Routes (when no token exists)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/doctorLogin" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/doctorLogin" />} />
      </Routes>
    </>
  );
};

export default App;
