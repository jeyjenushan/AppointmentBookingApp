import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookingSlots = ({
  slots,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  handleBookAppointment,
  loading,
  bookingSuccess,
}) => {
  const now = dayjs();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingSuccess) {
      const timer = setTimeout(() => {
        navigate("/my-appointments");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess, navigate]);

  const getFutureTimes = (slotTimes, date) =>
    slotTimes.filter((time) =>
      dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm").isAfter(dayjs())
    );

  const filteredSlots = slots.filter((slot) => {
    if (slot.date === now.format("YYYY-MM-DD")) {
      const availableTimes = getFutureTimes(slot.times, slot.date);
      return availableTimes.length > 0;
    }
    return slot.times.length > 0;
  });

  return (
    <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
      <p>Booking slots</p>
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
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
          ))
        ) : (
          <p className="text-sm font-light text-gray-400">
            No available booking slots
          </p>
        )}
      </div>

      {selectedDate && (
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {(() => {
            const selectedSlot = slots.find((s) => s.date === selectedDate);
            if (!selectedSlot) return null;

            const filteredTimes =
              selectedDate === now.format("YYYY-MM-DD")
                ? getFutureTimes(selectedSlot.times, selectedDate)
                : selectedSlot.times;

            return filteredTimes.map((time) => (
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
            ));
          })()}
        </div>
      )}

      <button
        onClick={handleBookAppointment}
        disabled={!selectedDate || !selectedTime || loading}
        className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 transition-opacity duration-300 ${
          !selectedDate || !selectedTime || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary-dark"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Booking...
          </span>
        ) : (
          "Book an appointment"
        )}
      </button>
    </div>
  );
};

export default BookingSlots;
