import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    // { id: 1, title: "John's Birthday", category: "Birthday" },
    // { id: 2, title: "Team Meeting", category: "Meeting" },
    // { id: 3, title: "Tech Conference", category: "Conference" },
  ],
  filter: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Adding event to state:", action.payload);
        }
        const { id, category, title, startDate, endDate } = action.payload;
        if (id && category && title && startDate && endDate) {
          state.events.push(action.payload);
        } else {
          console.error("Invalid event payload:", action.payload);  // Logs the invalid payload
        }
      },
      filterByCategory: (state, action) => {
        if (Array.isArray(action.payload)) {
          state.filter = action.payload;
        } else {
          console.error("Invalid filter payload:", action.payload);  // Logs invalid filter payload
        }
      },
    },
});

export const { addEvent, filterByCategory } = eventsSlice.actions;

export const selectFilteredEvents = (state) => {
  const { events, filter } = state.event;
  if (filter.length === 0) return events;
  return events.filter((event) => filter.includes(event.category));
};

export default eventsSlice.reducer;
