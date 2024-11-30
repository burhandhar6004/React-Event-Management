import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "./eventsSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify

const AddEventPopup = ({ onClose }) => {
  const [category, setCategory] = useState(""); 
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#000000");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (category && startDate && startTime && endDate && endTime) {
      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;
      const newEvent = {
        id: Date.now(),
        category,
        title: description,
        startDate: startDateTime,
        endDate: endDateTime,
        color,
      };

      dispatch(addEvent(newEvent));
      toast.success("Event added successfully!"); // Success toast
      onClose();
    } else {
      toast.error("Please fill in all required fields."); // Error toast
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast Container */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Event</h2>

          {/* Category selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="">Select a category</option>
              <option value="meeting">Meeting</option>
              <option value="conference">Conference</option>
              <option value="birthday">Birthday</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          />

          {/* Date and Time Inputs */}
          <div className="flex gap-2 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Color Picker */}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 mb-4"
          />

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
          >
            Add Event
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded w-full"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEventPopup;
