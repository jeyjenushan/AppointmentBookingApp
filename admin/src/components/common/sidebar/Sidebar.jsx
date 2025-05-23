import React, { useContext } from "react";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../../../context/DoctorContext";
import { AdminContext } from "../../../context/AdminContext";
import { adminMenuItems } from "./adminMenuItems";
import { doctorMenuItems } from "./doctorMenuItems";
const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  // Common styles for NavLinks
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors duration-200 ${
      isActive
        ? "bg-[#F2F3FF] border-r-4 border-primary font-medium"
        : "hover:bg-gray-50"
    }`;

  // Only show one menu based on which token exists
  const menuItems = aToken ? adminMenuItems : dToken ? doctorMenuItems : [];

  return (
    <div className="min-h-screen bg-white border-r w-full md:w-auto sticky top-0">
      {menuItems.length > 0 && (
        <ul className="text-[#515151] mt-5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} className={navLinkStyles}>
                <img className="min-w-5 w-5" src={item.icon} alt={item.text} />
                <p className="hidden md:block">{item.text}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
