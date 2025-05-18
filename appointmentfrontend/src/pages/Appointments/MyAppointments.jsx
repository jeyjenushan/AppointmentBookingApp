import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const MyAppointments = () => {
  const {
    appointments,
    getUserAppointments,
    cancelAppointment,
    appointmentStripe,
    rescheduleAppointment,
    token,
    backendUrl,
  } = useContext(AppContext);
  const [payment, setPayment] = useState("");
  const [rescheduleData, setRescheduleData] = useState(null);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const slotDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      setLoadingSlots(true);
      setNewTime(""); // Reset time when date changes
      const { data } = await axios.get(
        `${backendUrl}/api/admin/doctors/${doctorId}/availability`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure we have the expected data structure
      if (!data.doctorDto || !data.doctorDto.availableSlots) {
        throw new Error("Invalid data structure received");
      }

      const slotsData = data.doctorDto.availableSlots;
      const formattedSlots = [];

      // Find slots for the selected date
      const slotsForDate = slotsData[date] || [];

      // Convert each time slot to display format
      slotsForDate.forEach((time) => {
        const [hours, minutes] = time.split(":");
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? "PM" : "AM";
        const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
        formattedSlots.push({
          display: `${displayHour}:${minutes} ${period}`,
          backend: time, // Keep original format for backend
        });
      });

      // Sort slots chronologically
      formattedSlots.sort((a, b) => {
        const timeA = a.backend;
        const timeB = b.backend;
        return timeA.localeCompare(timeB);
      });

      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleReschedule = (appointment) => {
    setRescheduleData(appointment);
    const initialDate = appointment.slotDate.split("T")[0];
    setNewDate(initialDate);
    setNewTime("");
    fetchAvailableSlots(appointment.doctorId, initialDate);
    setShowRescheduleForm(true);
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setNewDate(selectedDate);
    if (rescheduleData && selectedDate) {
      await fetchAvailableSlots(rescheduleData.doctorId, selectedDate);
    }
  };

  const submitReschedule = async () => {
    if (!rescheduleData || !newDate || !newTime) {
      alert("Please select both date and time");
      return;
    }

    try {
      // Find the backend time format from the available slots
      const selectedSlot = availableSlots.find(
        (slot) => slot.display === newTime
      );

      if (!selectedSlot) {
        throw new Error("Invalid time slot selected");
      }

      await rescheduleAppointment(rescheduleData.id, {
        newDate: newDate,
        newTime: selectedSlot.backend,
      });

      setShowRescheduleForm(false);
      setNewDate("");
      setNewTime("");
      await getUserAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error("Reschedule failed:", error);
      alert("Reschedule failed. Please try again.");
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      await appointmentStripe(appointmentId);
      setPayment(appointmentId);
      getUserAppointments();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token, getUserAppointments]);

  return (
    <div className="p-4">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My appointments
      </p>

      {showRescheduleForm && rescheduleData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Reschedule Appointment</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Date
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
                value={newDate}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Time
              </label>
              {loadingSlots ? (
                <p>Loading available time slots...</p>
              ) : availableSlots.length > 0 ? (
                <select
                  className="w-full p-2 border rounded"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                >
                  <option value="">Select a time slot</option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot.display}>
                      {slot.display}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No available slots for this date</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRescheduleForm(false)}
                className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitReschedule}
                disabled={!newDate || !newTime}
                className={`px-4 py-2 text-sm text-white rounded ${
                  !newDate || !newTime
                    ? "bg-gray-400"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your component remains the same */}
      <div className="mt-4">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You have no appointments yet.</p>
          </div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <div>
                <img
                  className="w-36 h-36 object-cover bg-[#EAEFFF]"
                  src={`data:image/png;base64,${item.image}`}
                  alt="Doctor"
                />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {item.doctorName}
                </p>
                <p>Age: {item.age}</p>
                <p className="text-[#464646] font-medium mt-1">Status:</p>
                <p
                  className={`font-medium ${
                    item.approvalStatus === "PENDING"
                      ? "text-yellow-600"
                      : item.approvalStatus === "APPROVED"
                      ? "text-blue-600"
                      : item.appointmentStatus === "COMPLETED"
                      ? "text-green-600"
                      : item.appointmentStatus === "CANCELLED"
                      ? "text-red-600"
                      : item.approvalStatus === "REJECTED"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {item.approvalStatus}
                  {item.approvalStatus === "PENDING" &&
                    " (Waiting for doctor approval)"}
                </p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>
                  <span className="ml-1">
                    {slotDateFormat(item.slotDate)}, {item.time}
                  </span>
                </p>
                {item.payment && (
                  <p className="mt-1">
                    <span className="text-sm text-[#3C3C3C] font-medium">
                      Payment Status:
                    </span>
                    <span className="ml-1 text-green-600">Paid</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                {item.approvalStatus === "PENDING" &&
                  !item.appointmentStatus == "CANCELLED" && (
                    <button
                      onClick={() => cancelAppointment(item.id)}
                      className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel Request
                    </button>
                  )}

                {item.approvalStatus === "APPROVED" &&
                  item.appointmentStatus === "SCHEDULED" && (
                    <>
                      {!item.payment ? (
                        <button
                          onClick={() => handlePayment(item.id)}
                          className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white"
                        >
                          Pay Online
                        </button>
                      ) : (
                        <button className="sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]">
                          Payment Completed
                        </button>
                      )}
                      <button
                        onClick={() => handleReschedule(item)}
                        className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-200"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => cancelAppointment(item.id)}
                        className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}

                {item.approvalStatus === "REJECTED" && (
                  <p className="text-red-500 text-sm font-medium">
                    Appointment rejected by admin
                  </p>
                )}

                {item.appointmentStatus === "COMPLETED" && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Appointment Completed
                  </button>
                )}

                {item.appointmentStatus === "CANCELLED" && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
