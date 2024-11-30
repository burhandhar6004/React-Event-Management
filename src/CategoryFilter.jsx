import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "./eventsSlice";

const CategoryFilter = () => {
  const categories = ["Birthday", "Meeting", "Conference"];
  const dispatch = useDispatch();
  const { filter, events } = useSelector((state) => state.event);
  const [filteredCount, setFilteredCount] = useState(0);

  // Function to calculate filtered events count
  const calculateFilteredCount = (currentFilter) => {
    const filteredEvents = events.filter((event) =>
      currentFilter.length === 0 || currentFilter.includes(event.category)
    );
    setFilteredCount(filteredEvents.length);
  };

  const handleFilterChange = (category) => {
    const newFilter = filter.includes(category)
      ? filter.filter((item) => item !== category) // Remove category from filter
      : [...filter, category]; // Add category to filter

    dispatch(filterByCategory(newFilter)); // Update Redux store
    calculateFilteredCount(newFilter); // Recalculate filtered count immediately
  };

  useEffect(() => {
    // Recalculate count whenever events or filter change
    calculateFilteredCount(filter);
  }, [events, filter]);

  return (
    <div className="bg-white rounded shadow-lg p-4">
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      {categories.map((category) => {
        const capitalizedCategory =
          category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filter.includes(category)}
              onChange={() => handleFilterChange(category)}
              className="mr-2"
            />
            <label className="text-gray-700">{capitalizedCategory}</label>
          </div>
        );
      })}

      {/* Display total count of filtered events */}
      <div className="mt-4 text-blue-600 font-semibold">
        Total Matching Events: {filteredCount}
      </div>
    </div>
  );
};

export default CategoryFilter;
