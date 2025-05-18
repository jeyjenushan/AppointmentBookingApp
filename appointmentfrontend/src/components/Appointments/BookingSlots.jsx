import React from "react";
import dayjs from "dayjs";

const BookingSlots = ({
  slots,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  handleBookAppointment,
  loading,
}) => {
  const now = dayjs();

  return (
    <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
      <p>Booking slots</p>
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {slots.length &&
          slots.map((slot) => (
            <div
              onClick={() => {
                setSelectedDate(slot.date);
                setSelectedTime(null);
              }}
              key={slot.date}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                selectedDate === slot.date
                  ? "bg-primary text-white"
                  : "border border-gray-200"
              }`}
            >
              <p>{slot.dayName}</p>
              <p>{slot.dayNumber}</p>
            </div>
          ))}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {slots
            .find((s) => s.date === selectedDate)
            ?.times.filter((time) => {
              // Convert time to dayjs object
              const slotTime = dayjs(
                `${selectedDate} ${time}`,
                "YYYY-MM-DD HH:mm"
              );

              // If today, only show upcoming time slots
              if (selectedDate === now.format("YYYY-MM-DD")) {
                return slotTime.isAfter(now);
              }

              // Otherwise, show all time slots
              return true;
            })
            .map((time) => (
              <p
                onClick={() => setSelectedTime(time)}
                key={time}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {time.toLowerCase()}
              </p>
            ))}
        </div>
      )}

      <button
        onClick={handleBookAppointment}
        disabled={!selectedDate || !selectedTime || loading}
        className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${
          !selectedDate || !selectedTime || loading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {loading ? "Booking..." : "Book an appointment"}
      </button>
    </div>
  );
};

export default BookingSlots;
