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
          <Route
            path="/admin-dashboard"
            element={aToken ? <Dashboard /> : <Navigate to="/adminLogin" />}
          />
          <Route
            path="/doctor-dashboard"
            element={
              dToken ? <DoctorDashboard /> : <Navigate to="/doctorLogin" />
            }
          />
          <Route
            path="/all-appointments"
            element={
              aToken ? <AllAppointments /> : <Navigate to="/adminLogin" />
            }
          />
          <Route
            path="/doctor-list"
            element={aToken ? <DoctorsList /> : <Navigate to="/doctorLogin" />}
          />
          <Route
            path="/doctor-list/:doctorId/availability"
            element={
              aToken ? (
                <DoctorAvailabilityManager />
              ) : (
                <Navigate to="/adminLogin" />
              )
            }
          />
          <Route
            path="/add-doctor"
            element={aToken ? <AddDoctor /> : <Navigate to="/adminLogin" />}
          />

          <Route
            path="/doctor-appointments"
            element={
              dToken ? <DoctorAppointments /> : <Navigate to="/doctorLogin" />
            }
          />
          <Route
            path="/doctor-profile"
            element={
              dToken ? <DoctorProfile /> : <Navigate to="/doctorLogin" />
            }
          />
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
        <Route path="*" element={<Welcome />} />
      </Routes>
    </>
  );
};

export default App;
