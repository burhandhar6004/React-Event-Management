import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventsSlice"

const store = configureStore({
    reducer : {
        event : eventReducer
    }
})

export default store