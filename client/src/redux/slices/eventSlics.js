import API from "../../utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = "/event";

export const getAllEvents = createAsyncThunk(
    'event/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getAll`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch events");
        }
    }
);

export const getEventbyCity = createAsyncThunk(
    'event/getEventbyCity',
    async (city, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getEventbyCity?query=${city}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch events by city");
        }
    }
);

export const getEventbyState = createAsyncThunk(
    "events/getEventbyState",
    async (state, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getEventbyState?query=${state}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch events by state");
        }
    }
);

export const getEventbyCountry = createAsyncThunk(
    "events/getEventbyCountry",
    async (country, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getEventbyCountry?query=${country}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch events by country");
        }
    }
);

export const getEventbyName = createAsyncThunk(
    "events/getEventbyName",
    async (name, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getEventbyName?query=${name}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch events by name");
        }
    }
);

export const getEventbyId = createAsyncThunk(
    "events/getEventbyId",
    async (eventId, { rejectWithValue }) => {
        try {
            const res = await API.get(`${API_URL}/getEventbyId?query=${eventId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch event by ID");
        }
    }
);


const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        selectedEvent: {},
        loading: false,
        error: null,
    },
    reducers: {
        clearEvents: (state) => {
            state.events = [];
            state.selectedEvent = {};
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getAllEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        }).addCase(getAllEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        }).addCase(getEventbyCity.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getEventbyCity.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        }).addCase(getEventbyCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getEventbyState.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getEventbyState.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        }).addCase(getEventbyState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getEventbyCountry.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getEventbyCountry.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        }).addCase(getEventbyCountry.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getEventbyName.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getEventbyName.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        }).addCase(getEventbyName.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getEventbyId.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getEventbyId.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedEvent = action.payload;
        }).addCase(getEventbyId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearEvents } = eventSlice.actions;
export default eventSlice.reducer;