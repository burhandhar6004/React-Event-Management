import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing React Icons
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from "date-fns";

const Calendar = () => {
    
  const [view, setView] = useState("month"); // View options: day, week, month
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date for navigation
  const { events } = useSelector((state) => state.event);

  // Change calendar month or year
  const changeMonth = (direction) => {
    setCurrentDate(
      direction === "prev"
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1)
    );
  };

  // const changeYear = (direction) => {
  //   setCurrentDate(
  //     direction === "prev" ? subYears(currentDate, 1) : addYears(currentDate, 1)
  //   );
  // };

  // Generate the calendar days based on the selected view
  const generateCalendarDays = () => {
    switch (view) {
      case "day": {
        return [currentDate]; // Single day
      }
      case "week": {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        const end = endOfWeek(currentDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end }); // All days in the week
      }
      case "month": {
        const start = startOfWeek(startOfMonth(currentDate), {
          weekStartsOn: 1,
        });
        const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end }); // Full month view including leading/trailing days
      }
      default:
        return [];
    }
  };

  const daysInCalendar = generateCalendarDays();

  // Function to get events for a specific day
  const getEventsForDay = (day) =>
    events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      // Check if the event starts or ends on this day, or spans this day
      return (
        isSameDay(day, startDate) || // The event starts on this day
        isSameDay(day, endDate) || // The event ends on this day
        isWithinInterval(day, { start: startDate, end: endDate }) // The event spans this day
      );
    });

  return (
    <div className="h-screen p-4 bg-white rounded shadow-lg  flex flex-col">
  {/* Month/Year Selector */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center justify-between w-80">
      {/* Previous Month Button */}
      <button
        onClick={() => changeMonth("prev")}
        className="p-2 text-blue-500 transition  duration-300 transform hover:scale-105"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Month Display */}
      <span className="text-2xl font-semibold">
        {format(currentDate, "MMMM yyyy")}
      </span>

      {/* Next Month Button */}
      <button
        onClick={() => changeMonth("next")}
        className="p-2 text-blue-500 transition duration-300 transform hover:scale-105"
      >
        <FaArrowRight size={20} />
      </button>
    </div>

    {/* View Selector */}
    <div className="flex justify-between w-80">
      <button
        onClick={() => setView("day")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border transition duration-300 ease-in-out transform hover:scale-105 ${
          view === "day"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
        }`}
      >
        Day
      </button>
      <button
        onClick={() => setView("week")}
        className={`px-4 py-2 shadow-lg border rounded-lg text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
          view === "week"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
        }`}
      >
        Week
      </button>
      <button
        onClick={() => setView("month")}
        className={`px-4 py-2 rounded-lg shadow-lg border text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
          view === "month"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
        }`}
      >
        Month
      </button>
    </div>
  </div>

  {/* Calendar Grid */}
  <div
    className={`flex-1  grid mt-5 ${
      view === "day " ? " grid-cols-2" : "grid-cols-7"
    } gap-2 overflow-y-auto`}
  >
    {/* Weekday Headers */}
    {view !== "day" &&
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
        <div key={index} className="font-bold text-center text-gray-900 text-xl ">
          {day}
        </div>
      ))}

    {/* Calendar Days */}
    {daysInCalendar.map((day, index) => {
      const dayEvents = getEventsForDay(day); // Fetch events for this day
      const isToday = isSameDay(day, new Date());

      return (
        <div
          key={index}
          className={`p-2 border rounded ${
            isToday ? "bg-blue-100 border-blue-500" : ""
          }`}
        >
          <div className="text-sm font-bold  text-right">
            {format(day, "dd MMM")}
          </div>

          {/* Render events for the day */}
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="mt-1 text-xs rounded px-1 text-white font-bold"
              style={{ backgroundColor: event.color || "#000000" }} // Default color if event color is undefined
            >
              <span>
                {event.title} ({format(new Date(event.startDate), "HH:mm")} -{" "}
                {format(new Date(event.endDate), "HH:mm")})
              </span>
            </div>
          ))}
        </div>
      );
    })}
  </div>
</div>

  );
};

export default Calendar;
