import React from "react";
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    pendingAppointments,
    setPendingAppointments,

    cancelAppointment,
    completeAppointment,
    approveAppointment,
    rejectAppointment,
    getPendingAppointments,
  } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getPendingAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <div>Doctor</div>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {pendingAppointments &&
          pendingAppointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={`data:image/jpeg;base64,${item.patientImage}`}
                  className="w-8 rounded-full"
                  alt=""
                />{" "}
                <p>{item.patientName}</p>
              </div>
              <div>{item.doctorName}</div>

              <p>
                {slotDateFormat(item.slotDate)}, {item.time}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              <div className="flex gap-2">
                <img
                  onClick={() => approveAppointment(item.id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />

                <img
                  onClick={() => rejectAppointment(item.id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              </div>
            </div>
          ))}
        {pendingAppointments == null && (
          <div className="p-4 text-center text-gray-500">
            No pending appointments for approval
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
