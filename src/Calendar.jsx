import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing React Icons
import { BiMenu } from "react-icons/bi";
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
import { HiMenu, HiX } from "react-icons/hi"; // Import hamburger and close icons
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <div className="flex items-center justify-between w-80 sm:w-full md:w-96 lg:w-80 px-4 py-2">
          {/* Previous Month Button */}
          <button
            onClick={() => changeMonth("prev")}
            className="p-2 text-blue-500 transition duration-300 transform hover:scale-105"
          >
            <FaArrowLeft size={18} />
          </button>

          {/* Month Display */}
          <span className="text-sm sm:text-base md:text-2xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </span>

          {/* Next Month Button */}
          <button
            onClick={() => changeMonth("next")}
            className="p-2 text-blue-500 transition duration-300 transform hover:scale-105"
          >
            <FaArrowRight size={18} />
          </button>
        </div>

        {/* View Selector */}
        {/* <div className="flex justify-between w-80">
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
    </div> */}

        <div className="relative ">
          {/* Hamburger icon for mobile view */}
          <div className="flex items-center justify-end  ">
            <div className=" block md:hidden">
              <button
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                className="flex items-center justify-end p-2 text-gray-700 "
              >
                <span className="block w-20 h-5 pl-14 mb-1">
                  <BiMenu size={22} />
                </span>
              </button>
            </div>
          </div>

          {/* Dropdown menu when hamburger is open */}
          {isHamburgerOpen && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-lg z-10 md:hidden">
              <button
                onClick={() => setView("day")}
                className={`w-full px-4 py-2 text-left text-sm font-semibold ${
                  view === "day"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView("week")}
                className={`w-full px-4 py-2 text-left text-sm font-semibold ${
                  view === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`w-full px-4 py-2 text-left text-sm font-semibold ${
                  view === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Month
              </button>
            </div>
          )}

          {/* Button layout for screen widths above 500px */}
          <div className="hidden md:flex justify-between w-80">
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
      </div>

      {/* Calendar Grid */}
      <div
        className={`flex-1  grid mt-5 ${
          view === "day " ? " grid-cols-2" : "grid-cols-7"
        } gap-2 overflow-y-auto`}
      >
        {/* Weekday Headers */}
        {view !== "day" &&
          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <div
                key={index}
                className="font-bold text-center text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl"
              >
                {day}
              </div>
            )
          )}

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
              <div className="text-xs sm:text-sm md:text-base font-bold text-right">
                {format(day, "dd MMM")}
              </div>

              {/* Render events for the day */}
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="mt-1 text-[10px] sm:text-xs md:text-sm rounded px-1 text-white font-bold"
                  style={{ backgroundColor: event.color || "#000000" }} // Default color if event color is undefined
                >
                  <span>
                    {event.title} ({format(new Date(event.startDate), "HH:mm")}{" "}
                    - {format(new Date(event.endDate), "HH:mm")})
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
