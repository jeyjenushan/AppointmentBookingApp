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

import Dashboard from "./pages/Admin/Dashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";

import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

import DoctorAvailabilityManager from "./pages/Admin/DoctorAvailabilityManager";
import AddDoctor from "./pages/Admin/AddDoctor";
import AdminLogin from "./pages/Login/AdminLogin";
import Welcome from "./pages/Welcome";
import AddDoctorForm from "./components/doctor/addDoctor/AddDoctorForm";

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  // Doctor Routes - All start with /doctor/
  if (dToken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor/appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Admin Routes - All start with /admin/
  if (aToken) {
    return (
      <div className="bg-[#F89FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/appointments" element={<AllAppointments />} />
            <Route path="/admin/doctors" element={<DoctorsList />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Public Routes
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login/doctor" element={<Login />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Redirect all other routes to doctor login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
