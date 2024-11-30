import React, { useState } from "react";
import { useSelector } from "react-redux";

const UpcomingEvents = () => {
  const { events } = useSelector((state) => state.event);

  // State to manage the number of events displayed
  const [showAll, setShowAll] = useState(false);

  // Filter upcoming events
  const upcoming = events.filter((event) => new Date(event.startDate) > new Date());

  // Show only the first 3 events if not showing all
  const eventsToDisplay = showAll ? upcoming : upcoming.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="bg-white rounded shadow-lg p-4">
      <h3 className="text-lg font-bold mb-2 uppercase">Upcoming Events</h3>
      
      {upcoming.length === 0 ? (
        <div className="text-gray-600">No upcoming events available.</div>
      ) : (
        <>
          {eventsToDisplay.map((event) => (
            <div key={event.id} className="border-b py-2">
              <span
                className="block font-semibold uppercase"
                style={{ color: event.color || "#000" }} // Use event color for category
              >
                {event.category}
              </span>
              <span className="block">{event.title}</span>
              <span className="text-gray-500">
                {new Date(event.startDate).toLocaleString()}
              </span>
            </div>
          ))}
          {/* Show More/Less Buttons */}
          <div className="mt-2">
            {!showAll && upcoming.length > 3 && (
              <button
                onClick={handleShowMore}
                className="text-blue-600 hover:underline mr-4"
              >
                Show More
              </button>
            )}
            {showAll && (
              <button
                onClick={handleShowLess}
                className="text-red-600 hover:underline"
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
