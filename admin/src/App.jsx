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

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return dToken || aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {aToken ? (
            <>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route
                path="/doctor-list/:doctorId/availability"
                element={<DoctorAvailabilityManager />}
              />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            </>
          ) : (
            <Route path="/adminLogin" element={<AdminLogin />} />
          )}

          {/* Doctor Routes */}
          {dToken ? (
            <>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
            </>
          ) : (
            <Route path="/doctorLogin" element={<Login />} />
          )}
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/doctorLogin" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
