import React, { useState } from "react";
import Calendar from "./Calendar";
import AddEventPopup from "./AddEventPopup";
import UpcomingEvents from "./UpcomingEvents";
import CategoryFilter from "./CategoryFilter";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    toast.success("Popup opened for event creation!");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const { events } = useSelector((state) => state.event);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredEvents(events); // Show all events if no category is selected
    } else {
      const filtered = events.filter((event) =>
        selectedCategories.includes(event.category)
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div>
      
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Event Management</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Upcoming Events Section */}
          <div className="lg:col-span-1p-5 rounded ">
            <button
              onClick={handleOpenPopup}
              className="bg-blue-500 w-full text-white px-4 py-2 text-xl font-semibold rounded shadow-md hover:bg-blue-600"
            >
              Add Event
            </button>
            {/* <h2 className="text-xl font-semibold mt-5 text-gray-700 mb-4">
          Upcoming Events
        </h2> */}
            <div className="mt-5">
              <UpcomingEvents />
            </div>
            {/* Category Filter Section */}
            <div className="mt-6 bg-white p-5 rounded shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Filter by Category
              </h2>
              <CategoryFilter onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Calendar Section */}
          <div className="lg:col-span-3 bg-white p-5  rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Calendar
            </h2>
            <Calendar onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* AddEventPopup Modal */}
        {isPopupOpen && <AddEventPopup onClose={handleClosePopup} />}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
