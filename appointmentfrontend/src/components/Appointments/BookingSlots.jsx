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

  const filteredSlots = slots.filter((slot) => {
    // For today's date, filter times that are after now
    if (slot.date === now.format("YYYY-MM-DD")) {
      const availableTimes = slot.times.filter((time) => {
        const slotTime = dayjs(`${slot.date} ${time}`, "YYYY-MM-DD HH:mm");
        return slotTime.isAfter(now);
      });
      return availableTimes.length > 0;
    }
    // For other days, just check if there are any times
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

      {/* Time Selection */}
      {selectedDate && (
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {(() => {
            const selectedSlot = slots.find((s) => s.date === selectedDate);
            if (!selectedSlot) return null;

            const filteredTimes = selectedSlot.times.filter((time) => {
              const slotTime = dayjs(
                `${selectedDate} ${time}`,
                "YYYY-MM-DD HH:mm"
              );

              if (selectedDate === now.format("YYYY-MM-DD")) {
                return slotTime.isAfter(now);
              }
              return true;
            });

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
