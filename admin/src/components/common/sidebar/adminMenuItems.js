import { assets } from "../../../assets/assets";

export const adminMenuItems = [
  { to: "/admin", icon: assets.home_icon, text: "Dashboard" },
  { to: "/admin/all-appointments", icon: assets.appointment_icon, text: "Appointments" },
  { to: "/admin/add-doctor", icon: assets.add_icon, text: "Add Doctor" },
  { to: "/admin/doctors", icon: assets.people_icon, text: "Doctors List" }
];
