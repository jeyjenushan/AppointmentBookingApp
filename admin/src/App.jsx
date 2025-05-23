import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
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

  // Hide navbar only if no token exists (not logged in)
  const shouldHideNavbar = dToken || aToken;

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />

      {shouldHideNavbar && <Navbar />}
      <div className="flex items-start">
        {shouldHideNavbar && <Sidebar />}
        <div className="p-4 w-full">
          <Routes>
            {/* Default route redirects to admin if admin token exists, or doctor if doctor token exists */}
            <Route
              path="/"
              element={
                aToken ? (
                  <Navigate to="/admin" replace />
                ) : dToken ? (
                  <Navigate to="/doctor" replace />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={aToken ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/admin/all-appointments"
              element={
                aToken ? <AllAppointments /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/admin/doctors"
              element={aToken ? <DoctorsList /> : <Navigate to="/" replace />}
            />
            <Route
              path="/admin/add-doctor"
              element={aToken ? <AddDoctor /> : <Navigate to="/" replace />}
            />
            <Route
              path="/admin/doctor/:doctorId/availability"
              element={
                aToken ? (
                  <DoctorAvailabilityManager />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor"
              element={
                dToken ? <DoctorDashboard /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                dToken ? <DoctorAppointments /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/doctor/profile"
              element={dToken ? <DoctorProfile /> : <Navigate to="/" replace />}
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
