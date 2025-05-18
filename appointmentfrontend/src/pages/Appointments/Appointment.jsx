import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../hooks/Appointment/useAppointment";
import { AppContext } from "../../context/AppContext";
import RelatedDoctors from "../../components/Appointments/RelatedDoctors";
import DoctorDetails from "../../components/Appointments/DoctorDetails";
import BookingSlots from "../../components/Appointments/BookingSlots";
import { toast } from "react-toastify";
const Appointment = () => {
  const navigate = useNavigate();
  const { token, bookAppointment, currencySymbol } = useContext(AppContext);
  const {
    docInfo,
    slots,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    prepareBookingData,
    loading,
    docId,
  } = useAppointment();

  const handleBookAppointment = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const bookingData = prepareBookingData();
      await bookAppointment(bookingData);
      toast.success("Appointment booked successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (!docInfo) {
    return (
      <div className="text-center py-8">Loading doctor information...</div>
    );
  }

  return (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <DoctorDetails docInfo={docInfo} currencySymbol={currencySymbol} />

      {/* Booking slots */}
      <BookingSlots
        slots={slots}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        handleBookAppointment={handleBookAppointment}
        loading={loading}
      />

      {/* Listing Related Doctors */}
      <RelatedDoctors specialization={docInfo.specialization} docId={docId} />
    </div>
  );
};

export default Appointment;
