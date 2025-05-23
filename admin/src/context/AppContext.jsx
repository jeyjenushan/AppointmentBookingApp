import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "./DoctorContext";
import { AdminContext } from "./AdminContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken, setDoctorId } = useContext(DoctorContext);
  const { setAToken, setAdminId } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Function to calculate the age eg. ( 20_01_2000 => 24 )
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

// Admin Login
const login = async (formDataToSend, remember) => {
  setLoading(true);
  try {
    const { data } = await axios.post(
      backendUrl + "/api/login",
      formDataToSend
    );
    
    if (data.statusCode !== 200) {
      throw new Error(data.message || "Login failed");
    }

    const role = data.role;

    // Validate role
    if (role !== "ADMIN") {
      toast.error("Only admin users can login through this portal");
      return;
    }

    // Handle remember me functionality
    if (remember) {
      localStorage.setItem("rememberedEmail", formDataToSend.email);
      localStorage.setItem("rememberedPassword", formDataToSend.password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    // Set auth state
    setAToken(data.token);
    setAdminId(data.userDto.adminId);
    localStorage.setItem("aToken", data.token);
    
    // Redirect
    navigate("/admin");
    toast.success("Login successful!");

  } catch (err) {
    console.error("Login error:", err);
    const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

// Doctor Login
const doctorLogin = async (formDataToSend, remember) => {
  setLoading(true);
  try {
    const { data } = await axios.post(
      backendUrl + "/api/login",
      formDataToSend
    );
    
    if (data.statusCode !== 200) {
      throw new Error(data.message || "Login failed");
    }

    const role = data.role;

    // Validate role
    if (role !== "DOCTOR") {
      toast.error("Only doctors can login through this portal");
      return;
    }

    // Handle remember me functionality
    if (remember) {
      localStorage.setItem("rememberedEmail", formDataToSend.email);
      localStorage.setItem("rememberedPassword", formDataToSend.password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    // Set auth state
    setDToken(data.token);
    setDoctorId(data.userDto.doctorId);
    localStorage.setItem("dToken", data.token);
    
    // Redirect
    navigate("/doctor");
    toast.success("Login successful!");

  } catch (err) {
    console.error("Login error:", err);
    const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const sendOtp = async (email) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/forgotpassword/send-otp`,
        {},
        {
          params: { email },
        }
      );
      if (data.statusCode == 200) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message || "Failed to send otp your email"); // Display error if doctorDtos is missing
        return false;
      }
    } catch (error) {
      // Log error for debugging and show error message to the user
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while sending email to the user"
      );
      return false;
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/forgotpassword/verify-otp`,
        {},
        {
          params: { email, otp },
        }
      );
      if (data.statusCode == 200) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message || "Wrong OTP provided"); // Display error if doctorDtos is missing
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred verify  otp"
      );
      return false;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/forgotpassword/reset-password`,
        {},
        {
          params: { email, newPassword, otp },
        }
      );
      if (data.statusCode == 200) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message || "Wrong OTP provided");
        return false;
        // Display error if doctorDtos is missing
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error resetting password");
      return false;
    }
  };

  const value = {
    backendUrl,
    currency,
    slotDateFormat,
    calculateAge,
    login,
    loading,
    sendOtp,
    verifyOtp,
    resetPassword,
    doctorLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
