import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/authSlice';
import eventReducer from '../redux/slices/eventSlics';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventReducer,
    },
});