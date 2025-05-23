import { Navigate, Route, Routes } from "react-router-dom";
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

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="p-4 w-full">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/doctorLogin" element={<Login />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                aToken ? <Dashboard /> : <Navigate to="/adminLogin" replace />
              }
            />
            <Route
              path="/admin/all-appointments"
              element={
                aToken ? (
                  <AllAppointments />
                ) : (
                  <Navigate to="/adminLogin" replace />
                )
              }
            />
            <Route
              path="/admin/doctor"
              element={
                aToken ? <DoctorsList /> : <Navigate to="/adminLogin" replace />
              }
            />
            <Route
              path="/admin/add-doctor"
              element={
                aToken ? <AddDoctor /> : <Navigate to="/adminLogin" replace />
              }
            />
            <Route
              path="/admin/doctor/:doctorId/availability"
              element={
                aToken ? (
                  <DoctorAvailabilityManager />
                ) : (
                  <Navigate to="/adminLogin" replace />
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
                  <Navigate to="/doctorLogin" replace />
                )
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                dToken ? (
                  <DoctorAppointments />
                ) : (
                  <Navigate to="/doctorLogin" replace />
                )
              }
            />
            <Route
              path="/doctor/profile"
              element={
                dToken ? (
                  <DoctorProfile />
                ) : (
                  <Navigate to="/doctorLogin" replace />
                )
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
