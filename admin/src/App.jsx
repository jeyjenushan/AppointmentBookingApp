import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AdminLogin from "./pages/Login/AdminLogin";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorAvailabilityManager from "./pages/Admin/DoctorAvailabilityManager";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import { useContext } from "react";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const location = useLocation();

  const hideNavbarPaths = [
    "/admin-login",
    "/doctor-login",
    "/forgot-password",
    "/",
  ];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      {!shouldHideNavbar && <Navbar />}
      <div className="flex items-start">
        {!shouldHideNavbar && <Sidebar />}
        <div className="p-4 w-full">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/doctor-login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                aToken ? <Dashboard /> : <Navigate to="/admin-login" replace />
              }
            />
            <Route
              path="/admin/all-appointments"
              element={
                aToken ? (
                  <AllAppointments />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />
            <Route
              path="/admin/doctors"
              element={
                aToken ? (
                  <DoctorsList />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />
            <Route
              path="/admin/add-doctor"
              element={
                aToken ? <AddDoctor /> : <Navigate to="/admin-login" replace />
              }
            />
            <Route
              path="/admin/doctor/:doctorId/availability"
              element={
                aToken ? (
                  <DoctorAvailabilityManager />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor"
              element={
                dToken ? (
                  <DoctorDashboard />
                ) : (
                  <Navigate to="/doctor-login" replace />
                )
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                dToken ? (
                  <DoctorAppointments />
                ) : (
                  <Navigate to="/doctor-login" replace />
                )
              }
            />
            <Route
              path="/doctor/profile"
              element={
                dToken ? (
                  <DoctorProfile />
                ) : (
                  <Navigate to="/doctor-login" replace />
                )
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
